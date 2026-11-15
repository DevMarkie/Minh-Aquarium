/**
 * src/assets/js/modules/chatbot.js
 * AI Chatbot Widget client integration
 */

const CHAT_SESSION_STORAGE_KEY = "minhaq_chat_session_id";

export function initChatbotWidget() {
  if (document.getElementById("ma-chat-widget-root")) return;

  if (!document.getElementById("ma-chat-widget-style")) {
    const style = document.createElement("style");
    style.id = "ma-chat-widget-style";
    style.innerHTML = `
      .ma-chat-root { position: fixed; right: 18px; bottom: 18px; z-index: 100000; font-family: 'Outfit', Arial, sans-serif; }
      .ma-chat-toggle { min-width: 132px; height: 56px; border-radius: 999px; border: none; background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; box-shadow: 0 12px 30px rgba(2, 132, 199, 0.35); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 0 16px; }
      .ma-chat-toggle:hover { transform: translateY(-2px); box-shadow: 0 16px 34px rgba(2, 132, 199, 0.42); }
      .ma-chat-toggle-icon { width: 26px; height: 26px; border-radius: 50%; background: rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; line-height: 1; }
      .ma-chat-toggle-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.05; }
      .ma-chat-toggle-text strong { font-size: 14px; font-weight: 800; letter-spacing: 0; }
      .ma-chat-toggle-text span { font-size: 11px; opacity: 0.92; margin-top: 3px; }
      .ma-chat-panel { position: absolute; right: 0; bottom: 72px; width: min(380px, calc(100vw - 24px)); height: 520px; background: #fff; border-radius: 16px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.22); border: 1px solid #e2e8f0; display: none; overflow: hidden; }
      .ma-chat-panel.open { display: flex; flex-direction: column; }
      .ma-chat-header { padding: 14px 16px; color: #fff; background: linear-gradient(135deg, #0ea5e9, #0369a1); display: flex; justify-content: space-between; align-items: center; }
      .ma-chat-title { font-size: 16px; font-weight: 700; }
      .ma-chat-sub { font-size: 12px; opacity: 0.95; margin-top: 2px; }
      .ma-chat-close { border: none; background: transparent; color: #fff; cursor: pointer; font-size: 18px; }
      .ma-chat-body { flex: 1; overflow-y: auto; background: #f8fafc; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
      .ma-chat-message { max-width: 86%; font-size: 14px; line-height: 1.45; padding: 10px 12px; border-radius: 12px; white-space: pre-wrap; word-break: break-word; }
      .ma-chat-message.bot { align-self: flex-start; background: #fff; border: 1px solid #e2e8f0; color: #0f172a; }
      .ma-chat-message.user { align-self: flex-end; background: #0ea5e9; color: #fff; }
      .ma-chat-products-block { display: grid; gap: 8px; width: 100%; }
      .ma-chat-product-card { display: grid; grid-template-columns: 56px 1fr; gap: 10px; align-items: center; padding: 8px; background: #fff; border: 1px solid #dbeafe; border-radius: 12px; color: #0f172a; text-decoration: none; }
      .ma-chat-product-img { width: 56px; height: 56px; border-radius: 9px; background: #e0f2fe; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #0284c7; font-weight: 800; }
      .ma-chat-product-name { font-size: 13px; font-weight: 800; line-height: 1.25; }
      .ma-chat-product-meta { font-size: 12px; color: #475569; margin-top: 3px; }
      .ma-chat-product-price { font-size: 13px; color: #0284c7; font-weight: 800; margin-top: 4px; }
      .ma-chat-actions-block { display: flex; flex-wrap: wrap; gap: 8px; width: 100%; }
      .ma-chat-chip { border: 1px solid #bae6fd; background: #fff; color: #0369a1; border-radius: 999px; padding: 8px 10px; font-size: 12px; font-weight: 700; cursor: pointer; text-decoration: none; }
      .ma-chat-chip:hover { background: #e0f2fe; }
      .ma-chat-handoff { margin: 0 12px 10px; padding: 10px; border-radius: 10px; background: #fff7ed; border: 1px solid #fed7aa; display: none; }
      .ma-chat-handoff p { margin: 0 0 8px; font-size: 13px; color: #9a3412; }
      .ma-chat-handoff .row { display: flex; gap: 8px; flex-wrap: wrap; }
      .ma-chat-handoff a { text-decoration: none; font-size: 13px; font-weight: 600; padding: 8px 10px; border-radius: 8px; background: #f97316; color: #fff; }
      .ma-chat-compose { border-top: 1px solid #e2e8f0; background: #fff; padding: 10px; display: flex; gap: 8px; }
      .ma-chat-input { flex: 1; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 12px; font-size: 14px; outline: none; }
      .ma-chat-input:focus { border-color: #0ea5e9; }
      .ma-chat-send { border: none; border-radius: 10px; padding: 0 14px; background: #0f172a; color: #fff; font-weight: 700; cursor: pointer; }
      .ma-chat-send:disabled, .ma-chat-input:disabled { opacity: 0.65; cursor: not-allowed; }
      @media (max-width: 480px) {
        .ma-chat-root { right: 10px; bottom: 10px; }
        .ma-chat-toggle { min-width: 116px; height: 52px; padding: 0 12px; }
        .ma-chat-panel { right: -2px; bottom: 68px; width: calc(100vw - 20px); height: 70vh; }
      }
    `;
    document.head.appendChild(style);
  }

  const root = document.createElement("div");
  root.id = "ma-chat-widget-root";
  root.className = "ma-chat-root";
  root.innerHTML = `
    <button class="ma-chat-toggle" id="ma-chat-toggle" aria-label="Mở chatbot">
      <span class="ma-chat-toggle-icon">?</span>
      <span class="ma-chat-toggle-text">
        <strong>Chat tư vấn</strong>
        <span>Minh Aquarium</span>
      </span>
    </button>
    <div class="ma-chat-panel" id="ma-chat-panel">
      <div class="ma-chat-header">
        <div>
          <div class="ma-chat-title">Tư vấn Minh Aquarium</div>
          <div class="ma-chat-sub">Gợi ý sản phẩm, setup, chăm sóc bể</div>
        </div>
        <button class="ma-chat-close" id="ma-chat-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="ma-chat-body" id="ma-chat-body"></div>
      <div class="ma-chat-handoff" id="ma-chat-handoff">
        <p>Bot gợi ý bạn liên hệ nhân viên để hỗ trợ nhanh hơn:</p>
        <div class="row" id="ma-chat-handoff-row"></div>
      </div>
      <div class="ma-chat-compose">
        <input id="ma-chat-input" class="ma-chat-input" type="text" maxlength="500" placeholder="Nhập câu hỏi..." />
        <button id="ma-chat-send" class="ma-chat-send">Gửi</button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  const panel = document.getElementById("ma-chat-panel");
  const body = document.getElementById("ma-chat-body");
  const handoffBox = document.getElementById("ma-chat-handoff");
  const handoffRow = document.getElementById("ma-chat-handoff-row");
  const input = document.getElementById("ma-chat-input");
  const sendBtn = document.getElementById("ma-chat-send");
  const openBtn = document.getElementById("ma-chat-toggle");
  const closeBtn = document.getElementById("ma-chat-close");

  let sessionId = localStorage.getItem(CHAT_SESSION_STORAGE_KEY) || "";
  let loadedHistory = false;
  let sending = false;

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = `ma-chat-message ${role}`;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function setSendingState(isSending) {
    sending = isSending;
    input.disabled = isSending;
    sendBtn.disabled = isSending;
    sendBtn.textContent = isSending ? "..." : "Gửi";
  }

  function renderSuggestedProducts(products = []) {
    if (!Array.isArray(products) || products.length === 0) return;
    const block = document.createElement("div");
    block.className = "ma-chat-products-block";

    products.forEach((p) => {
      const card = document.createElement("a");
      card.className = "ma-chat-product-card";
      card.href = `products.html?q=${encodeURIComponent(p.name)}`;

      const price = Number(p.price || 0);
      const priceText = Number.isFinite(price) && price > 0
        ? `${price.toLocaleString("vi-VN")}đ`
        : "Liên hệ";

      card.innerHTML = `
        <div class="ma-chat-product-img">${(p.name || "MA")[0]}</div>
        <div>
          <div class="ma-chat-product-name">${p.name}</div>
          <div class="ma-chat-product-meta">${p.category || "Sản phẩm"}</div>
          <div class="ma-chat-product-price">${priceText}</div>
        </div>
      `;
      block.appendChild(card);
    });

    body.appendChild(block);
    body.scrollTop = body.scrollHeight;
  }

  function renderHandoff(handoff) {
    if (!handoff || !handoff.required) {
      handoffBox.style.display = "none";
      handoffRow.innerHTML = "";
      return;
    }

    handoffRow.innerHTML = "";
    if (handoff.phone) {
      const a = document.createElement("a");
      a.href = `tel:${handoff.phone}`;
      a.textContent = `Gọi ${handoff.phone}`;
      handoffRow.appendChild(a);
    }
    if (handoff.zaloLink) {
      const a = document.createElement("a");
      a.href = handoff.zaloLink;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Chat Zalo";
      handoffRow.appendChild(a);
    }
    handoffBox.style.display = handoffRow.children.length > 0 ? "block" : "none";
  }

  async function loadHistory() {
    if (!sessionId || loadedHistory) return;
    try {
      const res = await fetch(`/api/chatbot/history/${sessionId}`);
      const data = await res.json();
      if (!res.ok || !data.success) return;

      const messages = Array.isArray(data.messages) ? data.messages : [];
      if (messages.length > 0) {
        body.innerHTML = "";
        messages.forEach((msg) => {
          addMessage(msg.role === "user" ? "user" : "bot", msg.content);
        });
      }
      loadedHistory = true;
    } catch {
      // Offline or network error
    }
  }

  async function sendMessage() {
    if (sending) return;
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";
    setSendingState(true);

    const botLoading = addMessage("bot", "Đang xử lý câu hỏi...");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionId || undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Không thể kết nối với chatbot.");
      }

      if (data.sessionId) {
        sessionId = data.sessionId;
        localStorage.setItem(CHAT_SESSION_STORAGE_KEY, sessionId);
      }

      botLoading.textContent = data.reply || data.answer || "Cảm ơn bạn đã hỏi.";
      renderSuggestedProducts(data.suggestedProducts);
      renderHandoff(data.handoff);
    } catch (err) {
      botLoading.textContent = err.message || "Lỗi kết nối. Vui lòng thử lại sau.";
    } finally {
      setSendingState(false);
      input.focus();
    }
  }

  openBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) {
      loadHistory();
      if (body.children.length === 0) {
        addMessage(
          "bot",
          "Xin chào! Mình là trợ lý ảo Minh Aquarium. Bạn cần tư vấn về cá cảnh, cây thủy sinh, tép hay thiết bị lọc, đèn nào?"
        );
      }
      input.focus();
    }
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
  });

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}
