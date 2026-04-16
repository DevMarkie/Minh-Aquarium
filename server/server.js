// server.js - Express backend for Minh Aquarium
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const path = require("path");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());
const projectRoot = path.join(__dirname, "..");
const distPath = path.join(projectRoot, "dist");
const srcPath = path.join(projectRoot, "src");
const hasDist = fs.existsSync(distPath);
const staticRoot = hasDist ? distPath : srcPath;
const docsPath = path.join(projectRoot, "docs", "nd.text");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const CHAT_RATE_LIMIT_PER_MINUTE =
  parseInt(process.env.CHAT_RATE_LIMIT_PER_MINUTE || "12", 10) || 12;
const CHAT_RETENTION_DAYS =
  parseInt(process.env.CHAT_RETENTION_DAYS || "30", 10) || 30;
const STAFF_PHONE = process.env.STAFF_PHONE || "0123456789";
const STAFF_ZALO_LINK = process.env.STAFF_ZALO_LINK || "";

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const chatRateLimiter = new Map();

let businessContext = "";
if (fs.existsSync(docsPath)) {
  businessContext = fs.readFileSync(docsPath, "utf8");
}

app.use(express.static(staticRoot));

app.get("/", (req, res) => {
  const indexPath = hasDist
    ? path.join(distPath, "index.html")
    : path.join(srcPath, "index.html");
  res.sendFile(indexPath);
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "minh_aquarium",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper to run queries
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

function normalizeText(value) {
  return (value || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^\w\s&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  const history = chatRateLimiter.get(ip) || [];
  const recent = history.filter((ts) => ts >= oneMinuteAgo);

  if (recent.length >= CHAT_RATE_LIMIT_PER_MINUTE) {
    chatRateLimiter.set(ip, recent);
    return true;
  }

  recent.push(now);
  chatRateLimiter.set(ip, recent);
  return false;
}

function buildKeywordList(input) {
  const stopwords = new Set([
    "toi",
    "minh",
    "ban",
    "shop",
    "va",
    "la",
    "cho",
    "giup",
    "tu",
    "van",
    "co",
    "khong",
    "gia",
    "nao",
    "duoc",
    "voi",
    "nhung",
    "cua",
  ]);
  const tokens = normalizeText(input)
    .split(" ")
    .filter((token) => token.length >= 3 && !stopwords.has(token));
  return [...new Set(tokens)].slice(0, 6);
}

async function retrieveProductContext(userMessage) {
  const keywords = buildKeywordList(userMessage);
  if (keywords.length === 0) {
    return { products: [], blogPosts: [] };
  }

  const whereClause = keywords
    .map(
      () =>
        "(LOWER(p.name) LIKE ? OR LOWER(COALESCE(p.description, '')) LIKE ? OR LOWER(COALESCE(c.name, '')) LIKE ?)",
    )
    .join(" OR ");
  const params = [];
  keywords.forEach((kw) => {
    const like = `%${kw}%`;
    params.push(like, like, like);
  });

  const products = await query(
    `SELECT p.id, p.name, p.price, p.sale_price, p.stock_quantity, p.description,
            c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.is_active = TRUE AND (${whereClause})
     ORDER BY p.is_featured DESC, p.stock_quantity DESC
     LIMIT 6`,
    params,
  );

  let blogPosts = [];
  try {
    const blogWhere = keywords
      .map(() => "(LOWER(title) LIKE ? OR LOWER(content) LIKE ?)")
      .join(" OR ");
    const blogParams = [];
    keywords.forEach((kw) => {
      const like = `%${kw}%`;
      blogParams.push(like, like);
    });

    blogPosts = await query(
      `SELECT id, title
       FROM blog_posts
       WHERE is_published = TRUE AND (${blogWhere})
       ORDER BY published_at DESC, created_at DESC
       LIMIT 3`,
      blogParams,
    );
  } catch (_error) {
    blogPosts = [];
  }

  return { products, blogPosts };
}

async function retrieveProductContextSafe(userMessage) {
  try {
    return await retrieveProductContext(userMessage);
  } catch (_error) {
    return { products: [], blogPosts: [] };
  }
}

function encodeRoleContent(role, text) {
  const safeRole = role === "assistant" ? "ASSISTANT" : "USER";
  return `[${safeRole}] ${text}`;
}

function parseRoleContent(content) {
  const raw = (content || "").toString();
  if (raw.startsWith("[ASSISTANT] ")) {
    return { role: "assistant", content: raw.replace("[ASSISTANT] ", "") };
  }
  if (raw.startsWith("[USER] ")) {
    return { role: "user", content: raw.replace("[USER] ", "") };
  }
  return { role: "assistant", content: raw };
}

function shouldEscalateToStaff(userMessage, answerText) {
  const msg = normalizeText(userMessage);
  const answer = normalizeText(answerText);
  const userWantsStaff =
    msg.includes("nhan vien") ||
    msg.includes("nguoi that") ||
    msg.includes("hotline") ||
    msg.includes("goi lai") ||
    msg.includes("zalo");
  const lowConfidence =
    answer.includes("chua xac dinh") ||
    answer.includes("chua co thong tin") ||
    answer.includes("khong ro") ||
    answer.includes("khong tim thay");
  return userWantsStaff || lowConfidence;
}

async function ensureChatSession(sessionId) {
  const parsedSessionId = parseInt(sessionId, 10);
  if (parsedSessionId) {
    const rows = await query(
      "SELECT id FROM chat_sessions WHERE id = ? LIMIT 1",
      [parsedSessionId],
    );
    if (rows.length > 0) {
      return parsedSessionId;
    }
  }

  const result = await query(
    "INSERT INTO chat_sessions (user_id, staff_id, status) VALUES (NULL, NULL, 'open')",
    [],
  );
  return result.insertId;
}

async function getRecentSessionMessages(sessionId, limit = 8) {
  const rows = await query(
    `SELECT content, sent_at
     FROM chat_messages
     WHERE session_id = ?
     ORDER BY sent_at DESC, id DESC
     LIMIT ?`,
    [sessionId, limit],
  );
  return rows.reverse().map((row) => parseRoleContent(row.content));
}

function buildPrompt({ userMessage, history, products, blogPosts }) {
  const productLines = products.length
    ? products
        .map((p) => {
          const priceValue = Number(p.sale_price || p.price || 0);
          const priceText = Number.isFinite(priceValue)
            ? `${priceValue.toLocaleString("vi-VN")}đ`
            : "Liên hệ";
          return `- ${p.name} | Danh mục: ${p.category_name || "Khác"} | Giá: ${priceText} | Tồn: ${p.stock_quantity}`;
        })
        .join("\n")
    : "- Chưa có sản phẩm khớp trực tiếp.";

  const blogLines = blogPosts.length
    ? blogPosts.map((b) => `- ${b.title}`).join("\n")
    : "- Chưa có bài viết liên quan.";

  const historyLines = history.length
    ? history
        .map((h) => `${h.role === "user" ? "Khách" : "Bot"}: ${h.content}`)
        .join("\n")
    : "(Không có lịch sử)";

  return `Bạn là trợ lý tư vấn khách hàng cho Minh Aquarium.

Mục tiêu trả lời:
- Trả lời bằng tiếng Việt tự nhiên, rõ ràng, thân thiện.
- Ưu tiên tư vấn theo dữ liệu sản phẩm hiện có.
- Nếu thiếu dữ liệu, nói rõ là cần nhân viên hỗ trợ và gợi ý cách liên hệ.
- Không bịa thông tin tồn kho, giá, chính sách.

Thông tin cửa hàng:
${businessContext.slice(0, 2500)}

Sản phẩm liên quan:
${productLines}

Bài viết liên quan:
${blogLines}

Lịch sử gần đây:
${historyLines}

Câu hỏi mới của khách:
${userMessage}

Hãy trả lời ngắn gọn, thực tế. Nếu phù hợp, đề xuất 2-3 sản phẩm cụ thể từ danh sách trên.`;
}

async function cleanupOldChats() {
  try {
    await query(
      `DELETE FROM chat_messages
       WHERE sent_at < (NOW() - INTERVAL ${CHAT_RETENTION_DAYS} DAY)`,
      [],
    );
    await query(
      `DELETE cs
       FROM chat_sessions cs
       LEFT JOIN chat_messages cm ON cm.session_id = cs.id
       WHERE cm.id IS NULL
       AND cs.created_at < (NOW() - INTERVAL ${CHAT_RETENTION_DAYS} DAY)`,
      [],
    );
  } catch (error) {
    console.warn("Chat cleanup skipped:", error.message);
  }
}

// ---------- API ENDPOINTS ----------

// 1. Get all active products
app.get("/api/products", async (req, res) => {
  try {
    const products = await query(
      "SELECT * FROM products WHERE is_active = TRUE",
    );
    res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Simple user login (email + password hash comparison)
app.post("/api/login", async (req, res) => {
  const { email, passwordHash } = req.body; // client must send already‑hashed password
  if (!email || !passwordHash) {
    return res
      .status(400)
      .json({ success: false, error: "Missing email or passwordHash" });
  }
  try {
    const users = await query(
      "SELECT id, full_name, email, role FROM users WHERE email = ? AND password_hash = ?",
      [email, passwordHash],
    );
    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    res.json({ success: true, user: users[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get cart for a user (including product details)
app.get("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await query(
      `SELECT ci.id, ci.quantity, p.id AS product_id, p.name, p.price, p.image_url
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [userId],
    );
    res.json({ success: true, items: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Add / update an item in the cart
app.post("/api/cart/:userId/add", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ success: false, error: "productId and quantity required" });
  }
  try {
    // Ensure a cart exists for the user
    let carts = await query("SELECT id FROM carts WHERE user_id = ?", [userId]);
    let cartId;
    if (carts.length === 0) {
      const result = await query("INSERT INTO carts (user_id) VALUES (?)", [
        userId,
      ]);
      cartId = result.insertId;
    } else {
      cartId = carts[0].id;
    }
    // Upsert cart item
    const existing = await query(
      "SELECT id FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, productId],
    );
    if (existing.length > 0) {
      await query("UPDATE cart_items SET quantity = ? WHERE id = ?", [
        quantity,
        existing[0].id,
      ]);
    } else {
      await query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)",
        [cartId, productId, quantity],
      );
    }
    res.json({ success: true, message: "Cart updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Create an order (very simplified – assumes cart items are already validated)
app.post("/api/orders", async (req, res) => {
  const {
    userId,
    recipient_name,
    recipient_phone,
    shipping_address,
    payment_method,
    is_express_ship,
    note,
  } = req.body;
  if (
    !userId ||
    !recipient_name ||
    !recipient_phone ||
    !shipping_address ||
    !payment_method
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required order fields" });
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    // Get cart and calculate totals
    const cartRows = await connection.query(
      `SELECT ci.product_id, ci.quantity, p.price, p.name
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [userId],
    );
    if (cartRows[0].length === 0) {
      throw new Error("Cart is empty");
    }
    let subtotal = 0;
    cartRows[0].forEach((row) => {
      subtotal += row.price * row.quantity;
    });
    const shipping_fee = is_express_ship ? 20.0 : 0.0; // example flat fee
    const total_amount = subtotal + shipping_fee;
    const order_code = "ORD-" + Date.now();
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, order_code, subtotal, shipping_fee, total_amount, recipient_name, recipient_phone, shipping_address, payment_method, is_express_ship, payment_status, order_status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        userId,
        order_code,
        subtotal,
        shipping_fee,
        total_amount,
        recipient_name,
        recipient_phone,
        shipping_address,
        payment_method,
        is_express_ship,
        "pending",
        "pending",
      ],
    );
    const orderId = orderResult.insertId;
    // Insert order items
    const orderItemValues = cartRows[0].map((row) => [
      orderId,
      row.product_id,
      row.quantity,
      row.price,
      row.name,
    ]);
    await connection.query(
      `INSERT INTO order_items (order_id, product_id, quantity, unit_price, product_name) VALUES ?`,
      [orderItemValues],
    );
    // Clear cart
    await connection.query(
      "DELETE ci FROM cart_items ci JOIN carts c ON ci.cart_id = c.id WHERE c.user_id = ?",
      [userId],
    );
    await connection.commit();
    res.json({ success: true, order_id: orderId, order_code });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    connection.release();
  }
});

// 6. Chat assistant endpoint (Gemini + lightweight retrieval)
app.post("/api/chatbot", async (req, res) => {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: "Bạn gửi quá nhanh. Vui lòng thử lại sau 1 phút.",
    });
  }

  const { message, sessionId } = req.body || {};
  const userMessage = (message || "").toString().trim();

  if (!userMessage) {
    return res
      .status(400)
      .json({ success: false, error: "Nội dung chat không được để trống." });
  }

  if (userMessage.length > 500) {
    return res.status(400).json({
      success: false,
      error: "Tin nhắn tối đa 500 ký tự.",
    });
  }

  try {
    let actualSessionId = parseInt(sessionId, 10) || Date.now();
    let history = [];
    let context = { products: [], blogPosts: [] };
    let persistenceEnabled = true;

    try {
      actualSessionId = await ensureChatSession(sessionId);
      await query(
        "INSERT INTO chat_messages (session_id, sender_id, content, is_read) VALUES (?, NULL, ?, TRUE)",
        [actualSessionId, encodeRoleContent("user", userMessage)],
      );

      [history, context] = await Promise.all([
        getRecentSessionMessages(actualSessionId, 8),
        retrieveProductContextSafe(userMessage),
      ]);
    } catch (dbError) {
      persistenceEnabled = false;
      context = await retrieveProductContextSafe(userMessage);
      console.warn(
        "Chat persistence disabled:",
        dbError.code || dbError.message,
      );
    }

    let answer = "";
    if (!genAI) {
      if (context.products.length > 0) {
        const top = context.products.slice(0, 3);
        const lines = top
          .map((p) => {
            const price = Number(p.sale_price || p.price || 0);
            const priceText = Number.isFinite(price)
              ? `${price.toLocaleString("vi-VN")}đ`
              : "Liên hệ";
            return `- ${p.name} (${priceText})`;
          })
          .join("\n");
        answer = `Mình đang chạy chế độ tư vấn cơ bản. Bạn có thể tham khảo:\n${lines}\nBạn cần mình lọc theo ngân sách hoặc loại sản phẩm cụ thể không?`;
      } else {
        answer =
          "Mình chưa tìm thấy sản phẩm khớp ngay lúc này. Bạn mô tả rõ hơn nhu cầu (cá/tép/cây/thiết bị), hoặc gọi 0123456789 để nhân viên hỗ trợ nhanh.";
      }
    } else {
      try {
        const prompt = buildPrompt({
          userMessage,
          history,
          products: context.products,
          blogPosts: context.blogPosts,
        });

        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        const result = await model.generateContent(prompt);
        answer = result?.response?.text?.()?.trim() || "";
      } catch (aiError) {
        console.warn("Gemini unavailable, using fallback:", aiError.message);
        if (context.products.length > 0) {
          const top = context.products.slice(0, 3);
          const lines = top
            .map((p) => {
              const price = Number(p.sale_price || p.price || 0);
              const priceText = Number.isFinite(price)
                ? `${price.toLocaleString("vi-VN")}đ`
                : "Liên hệ";
              return `- ${p.name} (${priceText})`;
            })
            .join("\n");
          answer = `Hiện AI đang bận, nhưng bạn có thể tham khảo ngay:\n${lines}\nBạn muốn mình lọc theo ngân sách hoặc danh mục nào?`;
        } else {
          answer =
            "Hiện AI đang bận. Bạn mô tả thêm nhu cầu (cá/tép/cây/thiết bị), hoặc gọi 0123456789 để nhân viên hỗ trợ nhanh.";
        }
      }
    }

    if (!answer) {
      answer =
        "Mình chưa tạo được phản hồi phù hợp. Bạn có thể để lại số điện thoại để nhân viên hỗ trợ ngay.";
    }

    if (persistenceEnabled) {
      await query(
        "INSERT INTO chat_messages (session_id, sender_id, content, is_read) VALUES (?, NULL, ?, FALSE)",
        [actualSessionId, encodeRoleContent("assistant", answer)],
      );
    }

    const handoffRequired = shouldEscalateToStaff(userMessage, answer);
    res.json({
      success: true,
      sessionId: actualSessionId,
      answer,
      suggestedProducts: context.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.sale_price || p.price,
        category: p.category_name,
      })),
      handoff: {
        required: handoffRequired,
        phone: STAFF_PHONE,
        zaloLink: STAFF_ZALO_LINK,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Chatbot đang bận. Vui lòng thử lại sau hoặc liên hệ nhân viên.",
    });
  }
});

// 7. Chat history for a session
app.get("/api/chatbot/history/:sessionId", async (req, res) => {
  const sessionId = parseInt(req.params.sessionId, 10);
  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: "sessionId không hợp lệ.",
    });
  }

  try {
    const rows = await query(
      `SELECT id, content, sent_at
       FROM chat_messages
       WHERE session_id = ?
       ORDER BY sent_at ASC, id ASC
       LIMIT 50`,
      [sessionId],
    );

    res.json({
      success: true,
      messages: rows.map((row) => ({
        id: row.id,
        sentAt: row.sent_at,
        ...parseRoleContent(row.content),
      })),
    });
  } catch (err) {
    console.warn("History unavailable:", err.code || err.message);
    res.json({
      success: true,
      messages: [],
    });
  }
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log("🤖 Chat routes are enabled at /api/chatbot");
  cleanupOldChats();
  setInterval(cleanupOldChats, 12 * 60 * 60 * 1000);
});
