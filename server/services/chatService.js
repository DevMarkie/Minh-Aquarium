/**
 * server/services/chatService.js
 * Business logic for Gemini chatbot, session memory leak elimination, and context retrieval
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  GEMINI_API_KEY,
  GEMINI_MODEL,
  STAFF_PHONE,
  STAFF_ZALO_LINK,
  BUSINESS_CONTEXT,
} = require("../config/env");
const productService = require("./productService");
const { chatRepository } = require("../repositories");

class BoundedSessionStore {
  constructor(maxSessions = 1000, ttlMs = 24 * 60 * 60 * 1000) {
    this.maxSessions = maxSessions;
    this.ttlMs = ttlMs;
    this.sessions = new Map();

    this.cleanupTimer = setInterval(() => {
      this.purgeExpired();
    }, 60 * 60 * 1000); // Clean up hourly

    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  purgeExpired() {
    const now = Date.now();
    for (const [sessionId, data] of this.sessions.entries()) {
      if (now - data.lastAccessedAt > this.ttlMs) {
        this.sessions.delete(sessionId);
      }
    }
  }

  get(sessionId) {
    const entry = this.sessions.get(sessionId);
    if (!entry) return null;
    entry.lastAccessedAt = Date.now();
    return entry.messages;
  }

  set(sessionId, messages) {
    if (this.sessions.size >= this.maxSessions && !this.sessions.has(sessionId)) {
      const oldestKey = this.sessions.keys().next().value;
      if (oldestKey) this.sessions.delete(oldestKey);
    }
    this.sessions.set(sessionId, {
      messages,
      lastAccessedAt: Date.now(),
    });
  }

  has(sessionId) {
    return this.sessions.has(sessionId);
  }
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

class ChatService {
  constructor() {
    this.genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
    this.sessionStore = new BoundedSessionStore();
  }

  getRecentSessionMessages(sessionId, limit = 8) {
    const messages = this.sessionStore.get(sessionId) || [];
    return messages.slice(-limit).map((msg) => parseRoleContent(msg.content));
  }

  buildPrompt({ userMessage, history, products }) {
    const productLines = products.length
      ? products
          .map((p) => {
            const priceValue = Number(p.sale_price || p.price || 0);
            const priceText = Number.isFinite(priceValue)
              ? `${priceValue.toLocaleString("vi-VN")}đ`
              : "Liên hệ";
            return `- ${p.name} | Danh mục: ${p.catLabel || p.category_name || "Khác"} | Giá: ${priceText}`;
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
${(BUSINESS_CONTEXT || "").slice(0, 2500)}

Sản phẩm liên quan:
${productLines}

Lịch sử gần đây:
${historyLines}

Câu hỏi mới của khách:
${userMessage}

Hãy trả lời ngắn gọn, thực tế. Nếu phù hợp, đề xuất 2-3 sản phẩm cụ thể từ danh sách trên.`;
  }

  async processMessage(userMessage, sessionId) {
    const actualSessionId = sessionId || Date.now().toString();

    if (!this.sessionStore.has(actualSessionId)) {
      this.sessionStore.set(actualSessionId, []);
    }

    const messages = this.sessionStore.get(actualSessionId);

    // Save user message in memory
    messages.push({
      id: Date.now(),
      sent_at: new Date(),
      content: encodeRoleContent("user", userMessage),
    });

    // Save in DB repository asynchronously (fire-and-forget for speed)
    try {
      chatRepository
        .saveMessage(actualSessionId, 1, userMessage, "user")
        .catch(() => {});
    } catch {}

    const history = this.getRecentSessionMessages(actualSessionId, 8);
    const relevantProducts = await productService.findRelevantForChat(userMessage, 6);

    let answer = "";
    if (!this.genAI) {
      if (relevantProducts.length > 0) {
        const top = relevantProducts.slice(0, 3);
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
          "Mình chưa tìm thấy sản phẩm khớp ngay lúc này. Bạn mô tả rõ hơn nhu cầu (cá/tép/cây/thiết bị), hoặc gọi " +
          STAFF_PHONE +
          " để nhân viên hỗ trợ nhanh.";
      }
    } else {
      try {
        const prompt = this.buildPrompt({
          userMessage,
          history,
          products: relevantProducts,
        });

        const model = this.genAI.getGenerativeModel({ model: GEMINI_MODEL });
        const result = await model.generateContent(prompt);
        answer = result?.response?.text?.()?.trim() || "";
      } catch (aiError) {
        if (relevantProducts.length > 0) {
          const top = relevantProducts.slice(0, 3);
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
            "Hiện AI đang bận. Bạn mô tả thêm nhu cầu (cá/tép/cây/thiết bị), hoặc gọi " +
            STAFF_PHONE +
            " để nhân viên hỗ trợ nhanh.";
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
      content: encodeRoleContent("assistant", answer),
    });

    try {
      chatRepository
        .saveMessage(actualSessionId, 1, answer, "assistant")
        .catch(() => {});
    } catch {}

    const handoffRequired = shouldEscalateToStaff(userMessage, answer);

    return {
      success: true,
      sessionId: actualSessionId,
      reply: answer,
      answer,
      suggestedProducts: relevantProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.sale_price || p.price,
        category: p.catLabel || p.category_name,
      })),
      handoff: {
        required: handoffRequired,
        phone: STAFF_PHONE,
        zaloLink: STAFF_ZALO_LINK,
      },
    };
  }

  getHistory(sessionId) {
    const messages = this.sessionStore.get(sessionId) || [];
    return messages.map((row) => ({
      id: row.id,
      sentAt: row.sent_at,
      ...parseRoleContent(row.content),
    }));
  }
}

module.exports = new ChatService();
