// server.js - Express backend for Minh Aquarium (Stateless, No DB)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
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

// Load static products from frontend
let staticProducts = [];
async function loadProducts() {
  try {
    const productsPath = path.join(projectRoot, "frontend", "src", "data", "products.js");
    // Ensure we convert path for windows to a valid URL for dynamic import
    const fileUrl = 'file://' + productsPath.replace(/\\/g, '/');
    const { products } = await import(fileUrl);
    staticProducts = products || [];
    console.log(`Loaded ${staticProducts.length} products from frontend.`);
  } catch (error) {
    console.error("Failed to load products from frontend:", error);
  }
}
loadProducts();

// In-memory chat storage
// Map of sessionId (number/string) to array of message objects
const chatSessions = new Map(); 

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
    "toi", "minh", "ban", "shop", "va", "la", "cho", "giup", "tu", "van", "co", "khong", "gia", "nao", "duoc", "voi", "nhung", "cua",
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

  // Filter static products
  const matchedProducts = staticProducts.filter((p) => {
    const searchString = normalizeText(`${p.name} ${p.catLabel || p.cat || ''}`);
    return keywords.some(kw => searchString.includes(kw));
  });

  // Sort by featured first, then take top 6
  const sortedProducts = matchedProducts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  }).slice(0, 6);

  return { products: sortedProducts, blogPosts: [] };
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

function getRecentSessionMessages(sessionId, limit = 8) {
  const messages = chatSessions.get(sessionId) || [];
  // return last `limit` messages
  return messages.slice(-limit).map(msg => parseRoleContent(msg.content));
}

function buildPrompt({ userMessage, history, products, blogPosts }) {
  const productLines = products.length
    ? products
        .map((p) => {
          const priceValue = Number(p.sale_price || p.price || 0);
          const priceText = Number.isFinite(priceValue)
            ? `${priceValue.toLocaleString("vi-VN")}đ`
            : "Liên hệ";
          return `- ${p.name} | Danh mục: ${p.catLabel || "Khác"} | Giá: ${priceText}`;
        })
        .join("\n")
    : "- Chưa có sản phẩm khớp trực tiếp.";

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
- Không bịa thông tin giá hay chính sách.

Thông tin cửa hàng:
${businessContext.slice(0, 2500)}

Sản phẩm liên quan:
${productLines}

Lịch sử gần đây:
${historyLines}

Câu hỏi mới của khách:
${userMessage}

Hãy trả lời ngắn gọn, thực tế. Nếu phù hợp, đề xuất 2-3 sản phẩm cụ thể từ danh sách trên.`;
}

// ---------- API ENDPOINTS ----------

// 1. Get all active products (from static file)
app.get("/api/products", (req, res) => {
  res.json({ success: true, data: staticProducts });
});

// 2. Simple user login (Mocked to always succeed)
app.post("/api/login", (req, res) => {
  const { email, passwordHash } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: "Missing email" });
  }
  // Mock user response
  res.json({ success: true, user: { id: 1, full_name: "Mock User", email, role: "customer" } });
});

// 3. Get cart for a user (Mocked)
app.get("/api/cart/:userId", (req, res) => {
  res.json({ success: true, items: [] });
});

// 4. Add / update an item in the cart (Mocked)
app.post("/api/cart/:userId/add", (req, res) => {
  res.json({ success: true, message: "Cart updated (Mock)" });
});

// 5. Create an order (Mocked)
app.post("/api/orders", (req, res) => {
  const order_code = "ORD-" + Date.now();
  res.json({ success: true, order_id: 999, order_code });
});

// 6. Chat assistant endpoint (Gemini + lightweight retrieval)
app.post(["/api/chatbot", "/api/chat"], async (req, res) => {
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
    const actualSessionId = sessionId || Date.now().toString();
    
    // Ensure session exists in memory
    if (!chatSessions.has(actualSessionId)) {
      chatSessions.set(actualSessionId, []);
    }
    
    const messages = chatSessions.get(actualSessionId);
    
    // Save user message
    messages.push({
      id: Date.now(),
      sent_at: new Date(),
      content: encodeRoleContent("user", userMessage)
    });

    const history = getRecentSessionMessages(actualSessionId, 8);
    const context = await retrieveProductContext(userMessage);

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

    // Save assistant message
    messages.push({
      id: Date.now() + 1,
      sent_at: new Date(),
      content: encodeRoleContent("assistant", answer)
    });

    const handoffRequired = shouldEscalateToStaff(userMessage, answer);
    res.json({
      success: true,
      sessionId: actualSessionId,
      reply: answer,
      answer,
      suggestedProducts: context.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.sale_price || p.price,
        category: p.catLabel || p.cat,
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
app.get("/api/chatbot/history/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;
  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: "sessionId không hợp lệ.",
    });
  }

  const messages = chatSessions.get(sessionId) || [];
  res.json({
    success: true,
    messages: messages.map((row) => ({
      id: row.id,
      sentAt: row.sent_at,
      ...parseRoleContent(row.content),
    })),
  });
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log("🤖 Chat routes are enabled at /api/chatbot");
  console.log("⚠️  Running in stateless mode (No MySQL)");
});
