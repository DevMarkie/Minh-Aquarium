/**
 * src/assets/js/modules/cart.js
 * Shopping cart storage, modal UI, and checkout lifecycle
 */

import { normalizeText } from "./search.js";

export function loadCartFromStorage() {
  try {
    const rawCart = JSON.parse(localStorage.getItem("minhaq_cart")) || [];
    if (!Array.isArray(rawCart)) return [];

    return rawCart
      .map((item) => ({
        name: typeof item?.name === "string" ? item.name : "Sản phẩm",
        priceText: typeof item?.priceText === "string" ? item.priceText : "0đ",
        imgUrl: typeof item?.imgUrl === "string" ? item.imgUrl : "",
        quantity: Math.max(1, parseInt(item?.quantity, 10) || 1),
      }))
      .filter((item) => item.name.trim().length > 0);
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart) {
  localStorage.setItem("minhaq_cart", JSON.stringify(cart));
}

export let cart = loadCartFromStorage();

export function updateCartBadge() {
  const totalItems = cart.reduce(
    (sum, item) => sum + (parseInt(item.quantity, 10) || 0),
    0
  );
  const cartBtns = document.querySelectorAll(".cart-btn");
  cartBtns.forEach((btn) => {
    let badge = btn.querySelector(".cart-count-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-count-badge";
      badge.style.position = "absolute";
      badge.style.top = "-8px";
      badge.style.right = "-8px";
      badge.style.background = "var(--accent-red)";
      badge.style.color = "#fff";
      badge.style.borderRadius = "50%";
      badge.style.padding = "3px 6px";
      badge.style.fontSize = "12px";
      badge.style.fontWeight = "bold";
      btn.style.position = "relative";
      btn.appendChild(badge);
    }
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";

    badge.style.transform = "scale(1.5)";
    setTimeout(() => (badge.style.transform = "scale(1)"), 300);
  });
}

export function parsePrice(priceText) {
  return parseInt((priceText || "").replace(/[^0-9]/g, ""), 10) || 0;
}

export function extractImageUrlFromCard(card) {
  const imageEl = card.querySelector(".product-image.real-image");
  if (!imageEl) return "";

  const inlineBg = imageEl.style.backgroundImage;
  const computedBg = window.getComputedStyle(imageEl).backgroundImage;
  const bg = inlineBg && inlineBg !== "none" ? inlineBg : computedBg;
  const match = bg ? bg.match(/url\(["']?(.*?)["']?\)/) : null;
  return match && match[1] ? match[1] : "";
}

let cartModal = null;

export function showCartModal(name, callback) {
  if (!cartModal) {
    cartModal = document.createElement("div");
    cartModal.className = "custom-cart-modal-overlay";
    cartModal.innerHTML = `
      <div class="custom-cart-modal">
        <div class="modal-header">
          <h3 class="modal-title">Thêm vào giỏ hàng</h3>
          <button id="modal-btn-close" class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p class="modal-desc">Số lượng <strong id="modal-product-name" style="color:var(--primary-dark)"></strong>:</p>
        <div class="quantity-controls">
          <button id="modal-qty-minus"><i class="fa-solid fa-minus"></i></button>
          <input type="number" id="modal-qty-input" value="1" min="1">
          <button id="modal-qty-plus"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="modal-actions">
          <button id="modal-btn-cancel" class="btn btn-outline">Hủy</button>
          <button id="modal-btn-confirm" class="btn btn-cart-black">Xác nhận</button>
        </div>
      </div>
    `;
    document.body.appendChild(cartModal);

    const style = document.createElement("style");
    style.innerHTML = `
      .custom-cart-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 999999; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
      .custom-cart-modal-overlay.active { opacity: 1; pointer-events: auto; }
      .custom-cart-modal { background: #fff; padding: 25px; border-radius: 16px; width: 90%; max-width: 380px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.9) translateY(20px); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .custom-cart-modal-overlay.active .custom-cart-modal { transform: scale(1) translateY(0); }
      .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .modal-title { font-size: 18px; font-weight: 700; color: #0f172a; margin:0;}
      .modal-close { background: none; border: none; font-size: 18px; color: #94a3b8; cursor: pointer; transition: color 0.2s;}
      .modal-close:hover { color: #ef4444; }
      .modal-desc { font-size: 15px; color: #475569; margin-bottom: 25px; line-height: 1.4;}
      .quantity-controls { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 30px; }
      .quantity-controls button { width: 45px; height: 45px; border-radius: 50%; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 16px; color: #0f172a; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
      .quantity-controls button:hover { background: #e0f2fe; color: #0ea5e9; border-color: #bae6fd; }
      .quantity-controls input { width: 80px; height: 50px; text-align: center; font-size: 20px; font-weight: 700; border: 2px solid #e2e8f0; border-radius: 12px; color: #0f172a; outline: none; transition: border-color 0.2s;}
      .quantity-controls input:focus { border-color: #0ea5e9; }
      .quantity-controls input::-webkit-outer-spin-button, .quantity-controls input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      .modal-actions { display: flex; gap: 12px; }
      .modal-actions button { flex: 1; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.2s; border: none; }
      #modal-btn-cancel { background: #f1f5f9; color: #475569; }
      #modal-btn-cancel:hover { background: #e2e8f0; }
    `;
    document.head.appendChild(style);

    const input = document.getElementById("modal-qty-input");
    document.getElementById("modal-qty-minus").addEventListener("click", () => {
      let val = parseInt(input.value) || 1;
      if (val > 1) input.value = val - 1;
    });
    document.getElementById("modal-qty-plus").addEventListener("click", () => {
      let val = parseInt(input.value) || 1;
      input.value = val + 1;
    });
  }

  const nameEl = document.getElementById("modal-product-name");
  const inputEl = document.getElementById("modal-qty-input");
  const cancelBtn = document.getElementById("modal-btn-cancel");
  const confirmBtn = document.getElementById("modal-btn-confirm");
  const closeBtn = document.getElementById("modal-btn-close");

  nameEl.textContent = name;
  inputEl.value = "1";

  const cleanUp = () => {
    cartModal.classList.remove("active");
    const nc = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(nc, cancelBtn);
    const nk = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(nk, confirmBtn);
    const nx = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(nx, closeBtn);
  };

  const attach = (btnEl, valCb) =>
    btnEl.addEventListener("click", () => {
      cleanUp();
      valCb();
    });

  attach(document.getElementById("modal-btn-cancel"), () => callback(null));
  attach(document.getElementById("modal-btn-close"), () => callback(null));
  attach(document.getElementById("modal-btn-confirm"), () => {
    const val = parseInt(inputEl.value);
    callback(val > 0 ? val : null);
  });

  cartModal.classList.add("active");
}

export function initAddToCartButtons() {
  const addToCartBtns = document.querySelectorAll(".btn-add-cart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".product-card");
      if (!card) return;

      const nameEl = card.querySelector(".product-name");
      const priceEl = card.querySelector(".price-current");
      if (!nameEl || !priceEl) {
        alert("Sản phẩm này chưa đủ thông tin để thêm vào giỏ hàng.");
        return;
      }

      const name = nameEl.textContent.trim();
      const priceText = priceEl.textContent.trim();
      const imgUrl = extractImageUrlFromCard(card);

      showCartModal(name, (qty) => {
        if (!qty) return;

        const existing = cart.find((i) => i.name === name);
        const safeQty = parseInt(qty, 10);
        if (!safeQty || safeQty < 1) return;

        if (existing) {
          existing.quantity += safeQty;
        } else {
          cart.push({ name, priceText, imgUrl, quantity: safeQty });
        }
        saveCartToStorage(cart);
        updateCartBadge();

        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Đã thêm ${safeQty}`;
        btn.style.background = "var(--accent-red)";
        btn.style.color = "white";
        btn.style.borderColor = "var(--accent-red)";

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.style.color = "";
          btn.style.borderColor = "";
        }, 2000);
      });
    });
  });
}

export function initCartButtonNavigation() {
  document.querySelectorAll(".cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  });
}

// Shipping & Cart Page logic
const FREE_SHIP_THRESHOLD = 500000;
const NORTH_PROVINCES = [
  "ha noi", "hanoi", "hai phong", "quang ninh", "bac ninh", "bac giang",
  "hai duong", "hung yen", "vinh phuc", "phu tho", "thai nguyen", "lang son",
  "cao bang", "bac kan", "tuyen quang", "yen bai", "lao cai", "dien bien",
  "lai chau", "son la", "hoa binh", "ha giang", "nam dinh", "thai binh",
  "ninh binh", "ha nam",
];
const CENTRAL_PROVINCES = [
  "thanh hoa", "nghe an", "ha tinh", "quang binh", "quang tri",
  "thua thien hue", "hue", "da nang", "quang nam", "quang ngai",
  "binh dinh", "phu yen", "khanh hoa", "ninh thuan", "binh thuan",
  "kon tum", "gia lai", "dak lak", "dak nong", "lam dong",
];
const SOUTH_PROVINCES = [
  "ho chi minh", "hcm", "tp hcm", "can tho", "ba ria", "vung tau",
  "dong nai", "binh duong", "binh phuoc", "tay ninh", "long an",
  "tien giang", "ben tre", "tra vinh", "vinh long", "dong thap",
  "an giang", "kien giang", "hau giang", "soc trang", "bac lieu", "ca mau",
];

export function detectRegionFromAddress(address) {
  const normalized = normalizeText(address);
  if (!normalized) return "";
  if (NORTH_PROVINCES.some((p) => normalized.includes(p))) return "north";
  if (CENTRAL_PROVINCES.some((p) => normalized.includes(p))) return "central";
  if (SOUTH_PROVINCES.some((p) => normalized.includes(p))) return "south";
  return "";
}

export function getShippingFeeByRegion(region) {
  if (region === "north") return 15000;
  if (region === "central") return 20000;
  if (region === "south") return 25000;
  return 0;
}

export function calculateCartSubtotal(items = cart) {
  return items.reduce(
    (sum, item) => sum + parsePrice(item.priceText) * (item.quantity || 0),
    0
  );
}

export function computeShippingDetails(address, subtotal) {
  const region = detectRegionFromAddress(address);
  let shippingCost = getShippingFeeByRegion(region);
  if (subtotal >= FREE_SHIP_THRESHOLD) {
    shippingCost = 0;
  }
  return { region, shippingCost };
}

export function formatVnd(amount) {
  return `${amount.toLocaleString("vi-VN")}đ`;
}

export function getShippingSummaryLabel(shippingCost, subtotal, hasAddress) {
  if (subtotal >= FREE_SHIP_THRESHOLD) return "Miễn phí";
  if (shippingCost > 0) return formatVnd(shippingCost);
  return hasAddress ? "Chưa xác định" : "Nhập địa chỉ để tính";
}

export function getShippingOptionLabel(shippingCost, subtotal) {
  if (subtotal >= FREE_SHIP_THRESHOLD) return "Miễn phí";
  if (shippingCost > 0) return formatVnd(shippingCost);
  return "-";
}

export function getRegionLabel(region) {
  if (region === "north") return "Miền Bắc";
  if (region === "central") return "Miền Trung";
  if (region === "south") return "Miền Nam";
  return "Chưa xác định";
}

export function isExpressAvailable(distanceKm) {
  const km = parseFloat(distanceKm) || 0;
  return km > 0 && km <= 20;
}

export function initCartPage() {
  if (!window.location.pathname.includes("cart.html")) return;

  const mainContainer = document.querySelector(".page-container");
  if (!mainContainer) return;

  let isCheckoutView = false;
  let checkoutAddress = "";
  let shippingMethod = "standard";
  let shippingDistance = 0;

  if (!document.getElementById("checkout-styles")) {
    const style = document.createElement("style");
    style.id = "checkout-styles";
    style.innerHTML = `
      .form-input { width: 100%; padding: 12px 15px; border: 1px solid #e2e8f0; border-radius: 6px; margin-top: 5px; outline: none; transition: border 0.3s; }
      .form-input:focus { border-color: var(--primary); }
      .form-group { margin-bottom: 20px; }
      .checkout-card { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
      .shipping-option { display: flex; align-items: center; justify-content: space-between; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 10px; cursor: pointer; }
      .shipping-option.active { border-color: var(--primary); background: #f0f9ff; }
      .shipping-option input { margin-right: 15px; transform: scale(1.2); }
    `;
    document.head.appendChild(style);
  }

  function renderCartPage() {
    if (cart.length === 0) {
      mainContainer.style.display = "flex";
      mainContainer.innerHTML = `
        <div class="empty-cart-container text-center">
          <div style="font-size: 80px; color: #cbd5e1; margin-bottom: 20px;">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">Giỏ hàng trống</h2>
          <p style="color: var(--text-muted); margin-bottom: 30px;">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <a href="products.html" class="btn btn-cart-black" style="display: inline-flex; width: auto; padding: 12px 30px; border-radius: 6px;">Tiếp tục mua sắm</a>
        </div>
      `;
      return;
    }

    let totalCartValue = 0;
    let cartItemsHtml = cart
      .map((item, index) => {
        const rawPrice = parsePrice(item.priceText);
        totalCartValue += rawPrice * item.quantity;
        return `
          <div style="display: flex; align-items: center; border-bottom: 1px solid #e2e8f0; padding: 15px 0; gap: 15px;">
            <img src="${item.imgUrl || "./assets/images/anh/logo_transparent.png"}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
              <h4 style="margin: 0 0 5px 0; font-size: 16px;">${item.name}</h4>
              <div style="color: var(--primary); font-weight: bold;">${item.priceText}</div>
            </div>
            ${
              !isCheckoutView
                ? `
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="number" value="${item.quantity}" min="1" onchange="window.updateQuantity(${index}, this.value)" style="width: 50px; padding: 5px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px;">
              <button onclick="window.removeCartItem(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px;"><i class="fa-solid fa-trash-can"></i></button>
            </div>`
                : `
            <div style="font-weight: bold;">SL: ${item.quantity}</div>
            `
            }
          </div>
        `;
      })
      .join("");

    mainContainer.style.display = "block";

    if (!isCheckoutView) {
      mainContainer.innerHTML = `
        <div style="width: 100%; display: grid; grid-template-columns: 1fr 350px; gap: 30px; align-items: start;">
          <div class="checkout-card">
            <h2 style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #f1f5f9;">Giỏ hàng của bạn</h2>
            ${cartItemsHtml}
          </div>
          <div class="checkout-card">
            <h3 style="margin-bottom: 20px;">Tổng đơn hàng</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 16px;">
              <span>Tạm tính:</span>
              <strong>${totalCartValue.toLocaleString("vi-VN")}đ</strong>
            </div>
            <div style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Miễn phí ship cho đơn hàng từ 500.000đ (Báo giá phí ship ở bước sau)</div>
            <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 18px;">
              <b>Tổng cộng:</b>
              <b style="color: var(--primary);">${totalCartValue.toLocaleString("vi-VN")}đ</b>
            </div>
            <button onclick="window.goToCheckout()" class="btn" style="width: 100%; margin-top: 25px; padding: 15px 0; font-size: 16px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
              Tiến hành thanh toán <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>
            </button>
          </div>
        </div>
      `;
    } else {
      const hasAddress = normalizeText(checkoutAddress).length > 0;
      const { region: shippingRegion, shippingCost } = computeShippingDetails(
        checkoutAddress,
        totalCartValue
      );
      const expressAvailable = isExpressAvailable(shippingDistance);
      if (shippingMethod === "express" && !expressAvailable) {
        shippingMethod = "standard";
      }

      const finalTotal = totalCartValue + shippingCost;
      const shippingSummaryLabel = getShippingSummaryLabel(
        shippingCost,
        totalCartValue,
        hasAddress
      );
      const shippingOptionLabel = getShippingOptionLabel(
        shippingCost,
        totalCartValue
      );

      mainContainer.innerHTML = `
        <h1 style="font-size: 28px; margin-bottom: 30px;">Thanh toán</h1>
        <div style="width: 100%; display: grid; grid-template-columns: 1fr 380px; gap: 30px; align-items: start;">
          <div>
            <div class="checkout-card">
              <h3 style="margin-bottom: 20px; font-size: 18px;">Thông tin khách hàng</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div class="form-group"><label>Họ và tên *</label><input type="text" class="form-input"></div>
                <div class="form-group"><label>Số điện thoại *</label><input type="text" class="form-input"></div>
              </div>
              <div class="form-group"><label>Email *</label><input type="email" class="form-input"></div>
              <div class="form-group"><label>Địa chỉ nhận hàng *</label><input type="text" class="form-input" id="checkout-address-input" value="${checkoutAddress}" oninput="window.updateCheckoutAddress(this.value)" placeholder="Ví dụ: Hà Nội, Đà Nẵng, TP HCM..."></div>
              <div class="form-group" style="margin-bottom: 0;"><label>Ghi chú (không bắt buộc)</label><textarea class="form-input" rows="3" placeholder="Yêu cầu đặc biệt về đơn hàng..."></textarea></div>
            </div>

            <div class="checkout-card">
              <h3 style="margin-bottom: 20px; font-size: 18px;">Phí vận chuyển theo khu vực</h3>
              <div class="form-group">
                <label style="display:block; margin-bottom:10px;">Bảng phí vận chuyển cố định theo khu vực</label>
                <div style="font-size:14px; color:#334155; line-height:1.8;">
                  <div>Miền Bắc: <strong>15.000đ</strong></div>
                  <div>Miền Trung: <strong>20.000đ</strong></div>
                  <div>Miền Nam: <strong>25.000đ</strong></div>
                </div>
                <div style="margin-top:10px; font-size:14px; color:#0f172a;">Khu vực hiện tại: <strong id="checkout-region-label">${getRegionLabel(shippingRegion)}</strong></div>
                <div style="font-size:12px; color:#64748b; margin-top:4px;">Nhập tỉnh/thành trong địa chỉ để hệ thống tự tính phí ship.</div>
              </div>

              <div class="form-group" style="margin-top:10px;">
                <label style="display:block; margin-bottom:10px;">Khoảng cách giao hàng (km) để xét ship hỏa tốc</label>
                <input type="number" min="0" class="form-input" style="max-width:180px;" value="${shippingDistance}" oninput="window.updateShippingDistance(this.value)" placeholder="Nhập số km">
                <div style="font-size:12px; color:#64748b; margin-top:6px;">Ship hỏa tốc chỉ áp dụng trong bán kính <strong>20km</strong>.</div>
              </div>

              <div class="shipping-option ${shippingMethod === "standard" ? "active" : ""}" onclick="window.setShippingMethod('standard')">
                <div style="display:flex; align-items:center;">
                  <input type="radio" name="shipping-method" ${shippingMethod === "standard" ? "checked" : ""}>
                  <strong>Giao tiêu chuẩn</strong>
                </div>
                <strong id="checkout-ship-standard">${shippingOptionLabel}</strong>
              </div>

              <div class="shipping-option ${shippingMethod === "express" ? "active" : ""}" style="${expressAvailable ? "" : "opacity:0.6; cursor:not-allowed;"}" onclick="window.setShippingMethod('express')">
                <div style="display:flex; align-items:center;">
                  <input type="radio" name="shipping-method" ${shippingMethod === "express" ? "checked" : ""} ${expressAvailable ? "" : "disabled"}>
                  <strong>Giao hỏa tốc (≤ 20km)</strong>
                </div>
                <strong id="checkout-ship-express">${shippingOptionLabel}</strong>
              </div>

              ${expressAvailable ? "" : '<div style="font-size:12px; color:#ef4444; margin-top:8px;">Không thể chọn hỏa tốc vì khoảng cách lớn hơn 20km.</div>'}
            </div>

            <div class="checkout-card">
              <h3 style="margin-bottom: 20px; font-size: 18px;">Phương thức thanh toán</h3>
              <div class="shipping-option active">
                <div style="display:flex; align-items:center;">
                  <input type="radio" name="payment" checked>
                  <strong>Thanh toán khi nhận hàng (COD)</strong>
                </div>
              </div>
              <div class="shipping-option">
                <div style="display:flex; align-items:center;">
                  <input type="radio" name="payment">
                  <strong>Chuyển khoản ngân hàng</strong>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="checkout-card">
              <h3 style="margin-bottom: 20px;">Đơn hàng của bạn</h3>
              <div style="border-bottom: 1px solid #e2e8f0; margin-bottom: 15px; padding-bottom:10px;">
                ${cartItemsHtml}
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;">
                <span>Tạm tính:</span>
                <strong>${totalCartValue.toLocaleString("vi-VN")}đ</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 15px;">
                <span>Phí vận chuyển:</span>
                <strong id="checkout-shipping-cost">${shippingSummaryLabel}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 18px;">
                <b>Tổng cộng:</b>
                <b id="checkout-total-amount" style="color: var(--primary); font-size: 22px;">${formatVnd(finalTotal)}</b>
              </div>
              <button onclick="window.submitOrder()" class="btn" style="width: 100%; margin-top: 25px; padding: 15px 0; font-size: 16px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  window.updateQuantity = function (index, val) {
    const numVal = parseInt(val, 10) || 1;
    cart[index].quantity = numVal < 1 ? 1 : numVal;
    saveCartToStorage(cart);
    updateCartBadge();
    renderCartPage();
  };

  window.removeCartItem = function (index) {
    cart.splice(index, 1);
    saveCartToStorage(cart);
    updateCartBadge();
    renderCartPage();
  };

  window.goToCheckout = function () {
    isCheckoutView = true;
    renderCartPage();
    window.scrollTo(0, 0);
  };

  function updateCheckoutSummary() {
    if (!isCheckoutView) return;
    const hasAddress = normalizeText(checkoutAddress).length > 0;
    const subtotal = calculateCartSubtotal();
    const { region, shippingCost } = computeShippingDetails(
      checkoutAddress,
      subtotal
    );
    const finalTotal = subtotal + shippingCost;

    const regionEl = document.getElementById("checkout-region-label");
    if (regionEl) regionEl.textContent = getRegionLabel(region);

    const shippingSummaryEl = document.getElementById("checkout-shipping-cost");
    if (shippingSummaryEl) {
      shippingSummaryEl.textContent = getShippingSummaryLabel(
        shippingCost,
        subtotal,
        hasAddress
      );
    }

    const shippingStandardEl = document.getElementById("checkout-ship-standard");
    const shippingExpressEl = document.getElementById("checkout-ship-express");
    const optionLabel = getShippingOptionLabel(shippingCost, subtotal);
    if (shippingStandardEl) shippingStandardEl.textContent = optionLabel;
    if (shippingExpressEl) shippingExpressEl.textContent = optionLabel;

    const totalEl = document.getElementById("checkout-total-amount");
    if (totalEl) totalEl.textContent = formatVnd(finalTotal);
  }

  window.updateCheckoutAddress = function (address) {
    checkoutAddress = address || "";
    updateCheckoutSummary();
  };

  window.setShippingMethod = function (method) {
    if (method === "express" && !isExpressAvailable(shippingDistance)) {
      alert("Ship hỏa tốc chỉ áp dụng trong bán kính 20km.");
      shippingMethod = "standard";
      renderCartPage();
      return;
    }
    shippingMethod = method;
    renderCartPage();
  };

  window.updateShippingDistance = function (km) {
    shippingDistance = Math.max(0, parseFloat(km) || 0);
    renderCartPage();
  };

  window.submitOrder = function () {
    alert(
      "Đặt hàng thành công! Minh Aquarium sẽ liên hệ xác nhận và gửi hàng cho bạn trong thời gian sớm nhất."
    );
    cart.length = 0;
    localStorage.removeItem("minhaq_cart");
    isCheckoutView = false;
    updateCartBadge();
    renderCartPage();
    window.scrollTo(0, 0);
  };

  renderCartPage();
}
