import { db, auth } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  }
});

// ======= CART LOGIC = localStorage =======
function loadCartFromStorage() {
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

let cart = loadCartFromStorage();

function updateCartBadge() {
  let totalItems = cart.reduce(
    (sum, item) => sum + (parseInt(item.quantity, 10) || 0),
    0,
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

    // Pop animation
    badge.style.transform = "scale(1.5)";
    setTimeout(() => (badge.style.transform = "scale(1)"), 300);
  });
}

function parsePrice(priceText) {
  return parseInt((priceText || "").replace(/[^0-9]/g, ""), 10) || 0;
}

function extractImageUrlFromCard(card) {
  const imageEl = card.querySelector(".product-image.real-image");
  if (!imageEl) return "";

  const inlineBg = imageEl.style.backgroundImage;
  const computedBg = window.getComputedStyle(imageEl).backgroundImage;
  const bg = inlineBg && inlineBg !== "none" ? inlineBg : computedBg;
  const match = bg ? bg.match(/url\(["']?(.*?)["']?\)/) : null;
  return match && match[1] ? match[1] : "";
}
// Init badge on load
updateCartBadge();

// Custom Modal Creation
let cartModal;
function showCartModal(name, callback) {
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

const addToCartBtns = document.querySelectorAll(".btn-add-cart");
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".product-card");
    if (!card) return;

    // Extract info
    const nameEl = card.querySelector(".product-name");
    const priceEl = card.querySelector(".price-current");
    if (!nameEl || !priceEl) {
      alert("Sản phẩm này chưa đủ thông tin để thêm vào giỏ hàng.");
      return;
    }

    const name = nameEl.textContent.trim();
    const priceText = priceEl.textContent.trim();
    const imgUrl = extractImageUrlFromCard(card);

    // Use Beautiful Modal
    showCartModal(name, (qty) => {
      if (!qty) return;

      // Add to cart array
      const existing = cart.find((i) => i.name === name);
      const safeQty = parseInt(qty, 10);
      if (!safeQty || safeQty < 1) return;

      if (existing) {
        existing.quantity += safeQty;
      } else {
        cart.push({ name, priceText, imgUrl, quantity: safeQty });
      }
      localStorage.setItem("minhaq_cart", JSON.stringify(cart));
      updateCartBadge();

      // Button animation
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

// Render Cart on cart.html
let isCheckoutView = false;
let checkoutAddress = "";
let shippingMethod = "standard"; // standard | express
let shippingDistance = 0; // km (for express eligibility)

const NORTH_PROVINCES = [
  "ha noi",
  "hanoi",
  "hai phong",
  "quang ninh",
  "bac ninh",
  "bac giang",
  "hai duong",
  "hung yen",
  "vinh phuc",
  "phu tho",
  "thai nguyen",
  "lang son",
  "cao bang",
  "bac kan",
  "tuyen quang",
  "yen bai",
  "lao cai",
  "dien bien",
  "lai chau",
  "son la",
  "hoa binh",
  "ha giang",
  "nam dinh",
  "thai binh",
  "ninh binh",
  "ha nam",
  "nam dinh",
  "quang ninh",
];

const CENTRAL_PROVINCES = [
  "thanh hoa",
  "nghe an",
  "ha tinh",
  "quang binh",
  "quang tri",
  "thua thien hue",
  "hue",
  "da nang",
  "quang nam",
  "quang ngai",
  "binh dinh",
  "phu yen",
  "khanh hoa",
  "ninh thuan",
  "binh thuan",
  "kon tum",
  "gia lai",
  "dak lak",
  "dak nong",
  "lam dong",
];

const SOUTH_PROVINCES = [
  "ho chi minh",
  "hcm",
  "tp hcm",
  "can tho",
  "ba ria",
  "vung tau",
  "dong nai",
  "binh duong",
  "binh phuoc",
  "tay ninh",
  "long an",
  "tien giang",
  "ben tre",
  "tra vinh",
  "vinh long",
  "dong thap",
  "an giang",
  "kien giang",
  "hau giang",
  "soc trang",
  "bac lieu",
  "ca mau",
];

function detectRegionFromAddress(address) {
  const normalized = normalizeText(address);
  if (!normalized) return "";

  if (NORTH_PROVINCES.some((p) => normalized.includes(p))) return "north";
  if (CENTRAL_PROVINCES.some((p) => normalized.includes(p))) return "central";
  if (SOUTH_PROVINCES.some((p) => normalized.includes(p))) return "south";

  return "";
}

function getShippingFeeByRegion(region) {
  if (region === "north") return 15000;
  if (region === "central") return 20000;
  if (region === "south") return 25000;
  return 0;
}

function getRegionLabel(region) {
  if (region === "north") return "Miền Bắc";
  if (region === "central") return "Miền Trung";
  if (region === "south") return "Miền Nam";
  return "Chưa xác định";
}

function isExpressAvailable(distanceKm) {
  const km = parseFloat(distanceKm) || 0;
  return km > 0 && km <= 20;
}

if (
  window.location.pathname.includes("cart.html") ||
  document.querySelector(".empty-cart-container")
) {
  const mainContainer = document.querySelector(".page-container");

  // Add global style for inputs if not exists
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
                    <img src="${item.imgUrl || "anh/logo_transparent.png"}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
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
      // VIEW: CART PAGE
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
      // VIEW: CHECKOUT PAGE
      const shippingRegion = detectRegionFromAddress(checkoutAddress);
      const expressAvailable = isExpressAvailable(shippingDistance);
      if (shippingMethod === "express" && !expressAvailable) {
        shippingMethod = "standard";
      }

      let shippingCost = getShippingFeeByRegion(shippingRegion);
      let finalTotal = totalCartValue + shippingCost;

      mainContainer.innerHTML = `
                <h1 style="font-size: 28px; margin-bottom: 30px;">Thanh toán</h1>
                <div style="width: 100%; display: grid; grid-template-columns: 1fr 380px; gap: 30px; align-items: start;">
                    <div>
                        <!-- Customer Info -->
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

                        <!-- Shipping Method -->
                        <div class="checkout-card">
                            <h3 style="margin-bottom: 20px; font-size: 18px;">Phí vận chuyển theo khu vực</h3>
                            <div class="form-group">
                              <label style="display:block; margin-bottom:10px;">Bảng phí vận chuyển cố định theo khu vực</label>
                              <div style="font-size:14px; color:#334155; line-height:1.8;">
                                <div>Miền Bắc: <strong>15.000đ</strong></div>
                                <div>Miền Trung: <strong>20.000đ</strong></div>
                                <div>Miền Nam: <strong>25.000đ</strong></div>
                              </div>
                              <div style="margin-top:10px; font-size:14px; color:#0f172a;">Khu vực hiện tại: <strong>${getRegionLabel(shippingRegion)}</strong></div>
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
                              <strong>${shippingCost > 0 ? shippingCost.toLocaleString("vi-VN") + "đ" : "-"}</strong>
                            </div>

                            <div class="shipping-option ${shippingMethod === "express" ? "active" : ""}" style="${expressAvailable ? "" : "opacity:0.6; cursor:not-allowed;"}" onclick="window.setShippingMethod('express')">
                              <div style="display:flex; align-items:center;">
                                <input type="radio" name="shipping-method" ${shippingMethod === "express" ? "checked" : ""} ${expressAvailable ? "" : "disabled"}>
                                <strong>Giao hỏa tốc (≤ 20km)</strong>
                              </div>
                              <strong>${shippingCost > 0 ? shippingCost.toLocaleString("vi-VN") + "đ" : "-"}</strong>
                            </div>

                            ${expressAvailable ? "" : '<div style="font-size:12px; color:#ef4444; margin-top:8px;">Không thể chọn hỏa tốc vì khoảng cách lớn hơn 20km.</div>'}
                        </div>

                        <!-- Payment Method -->
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

                    <!-- Right Column: Order Summary -->
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
                              <strong>${shippingCost > 0 ? shippingCost.toLocaleString("vi-VN") + "đ" : '<span style="color:#f59e0b;">Nhập địa chỉ để tính</span>'}</strong>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 18px;">
                                <b>Tổng cộng:</b>
                                <b style="color: var(--primary); font-size: 22px;">${finalTotal.toLocaleString("vi-VN")}đ</b>
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

  // Global Functions for inline HTML handlers
  window.updateQuantity = function (index, val) {
    if (val < 1) val = 1;
    cart[index].quantity = parseInt(val);
    localStorage.setItem("minhaq_cart", JSON.stringify(cart));
    updateCartBadge();
    renderCartPage();
  };

  window.removeCartItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("minhaq_cart", JSON.stringify(cart));
    updateCartBadge();
    renderCartPage();
  };

  window.goToCheckout = function () {
    isCheckoutView = true;
    renderCartPage();
    window.scrollTo(0, 0);
  };

  window.updateCheckoutAddress = function (address) {
    checkoutAddress = address || "";
    renderCartPage();
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
      "🎉 Chúc mừng bạn đã đặt hàng thành công! Nhân viên Minh Aquarium sẽ đóng gói hỏa tốc gửi đi ngay bây giờ.",
    );
    cart = [];
    localStorage.removeItem("minhaq_cart");
    isCheckoutView = false;
    updateCartBadge();
    renderCartPage();
    window.scrollTo(0, 0);
  };

  renderCartPage();
}

// Chat widget toggle (simple alert for demo)
const chatBtn = document.querySelector(".chat-btn");
if (chatBtn) {
  chatBtn.addEventListener("click", () => {
    alert(
      "Chào mừng bạn đến với Minh Aquarium! Vui lòng để lại lời nhắn, nhân viên của chúng tôi sẽ phản hồi trong giây lát.",
    );
  });
}

// Navigation for Cart and Login
document.querySelectorAll(".cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
});

document.querySelectorAll(".btn-login").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.authAction || "login";
    if (action === "logout") {
      if (confirm("Bạn muốn đăng xuất?")) {
        signOut(auth);
      }
      return;
    }

    window.location.href = "login.html";
  });
});

// ========= Banner Carousel Logic =========
const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-slide") || []);
const nextButton = document.querySelector(".carousel-nav.next");
const prevButton = document.querySelector(".carousel-nav.prev");
const dots = Array.from(document.querySelectorAll(".dot") || []);

if (track && slides.length > 0) {
  let currentIndex = 0;
  let autoplayInterval;

  const updateSlide = (index) => {
    // Vì track rộng 300%, mỗi vệt sẽ dùng 1/3 (hay 100/slides.length %)
    track.style.transform = `translateX(-${index * (100 / slides.length)}%)`;

    // Cập nhật trạng thái dấu chấm
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) {
      dots[index].classList.add("active");
    }
    currentIndex = index;
  };

  const nextSlide = () => {
    let targetIndex = currentIndex + 1;
    if (targetIndex >= slides.length) targetIndex = 0;
    updateSlide(targetIndex);
  };

  const prevSlide = () => {
    let targetIndex = currentIndex - 1;
    if (targetIndex < 0) targetIndex = slides.length - 1;
    updateSlide(targetIndex);
  };

  const startAutoplay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000); // 5000ms = 5 giây
  };

  // Khởi động auto-play
  startAutoplay();

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      startAutoplay(); // Reset bộ đếm khi người dùng tự bấm
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      startAutoplay(); // Reset bộ đếm khi người dùng tự bấm
    });
  }

  // Cho phép bấm vào các dấu chấm nhỏ
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSlide(index);
      startAutoplay();
    });
  });
}

// ========= Search Logic =========
function getSearchInputs() {
  return document.querySelectorAll(".search-input");
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

function filterProducts(query) {
  const isProductsPage = window.location.pathname.includes("products.html");
  if (isProductsPage) {
    const sidebar = document.querySelector(".sidebar-filter");
    const sidebarSearchInput = sidebar?.querySelector(".filter-input");
    if (sidebarSearchInput && sidebarSearchInput.value !== query) {
      sidebarSearchInput.value = query;
    }

    if (typeof window.applyAdvancedFilters === "function") {
      window.applyAdvancedFilters();
      return;
    }
  }

  const term = normalizeText(query);
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const title = card.querySelector(".product-name");
    const cat = card.querySelector(".product-cat");
    if (title || cat) {
      const matchName = title
        ? normalizeText(title.textContent).includes(term)
        : false;
      const matchCat = cat
        ? normalizeText(cat.textContent).includes(term)
        : false;
      if (term === "" || matchName || matchCat) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });

  // Cập nhật trạng thái active sidebar nếu click từ sidebar
  const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
  if (sidebarLinks.length > 0) {
    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      const linkText = link.childNodes[0].textContent.trim().toLowerCase();
      if (term !== "" && linkText.includes(term)) {
        link.classList.add("active");
      } else if (term === "" && linkText === "tất cả sản phẩm") {
        link.classList.add("active");
      }
    });
  }
}

function initGlobalSearchHandlers() {
  const searchInputs = getSearchInputs();

  searchInputs.forEach((input) => {
    if (input.dataset.searchBound === "1") return;
    input.dataset.searchBound = "1";

    // Fill input if URL query param 'q' is present
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    if (q && !input.value) {
      input.value = q;
      if (window.location.pathname.includes("products.html")) {
        filterProducts(q);
      }
    }

    // Realtime search on products page
    input.addEventListener("input", (e) => {
      if (window.location.pathname.includes("products.html")) {
        filterProducts(e.target.value);
      }
    });

    // Navigate to products page on Enter if on other pages
    input.addEventListener("keydown", (e) => {
      if (
        e.key === "Enter" &&
        !window.location.pathname.includes("products.html")
      ) {
        window.location.href = `products.html?q=${encodeURIComponent(e.target.value.trim())}`;
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobalSearchHandlers);
} else {
  initGlobalSearchHandlers();
}

// Cho phép bấm vào cục kính lúp để tìm kiếm nếu đang ở trang khác
document.querySelectorAll(".search-icon").forEach((icon) => {
  icon.style.cursor = "pointer";
  icon.addEventListener("click", () => {
    const input = icon.nextElementSibling;
    if (input && input.classList.contains("search-input")) {
      if (window.location.pathname.includes("products.html")) {
        filterProducts(input.value);
      } else {
        if (input.value.trim()) {
          window.location.href = `products.html?q=${encodeURIComponent(input.value.trim())}`;
        } else {
          window.location.href = `products.html`;
        }
      }
    }
  });
});

// ========= Layout Sorting Logic =========
document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.querySelector(".sort-select");
  const productGrid = document.querySelector(".product-grid");

  if (sortSelect && productGrid) {
    let originalOrder = Array.from(
      productGrid.querySelectorAll(".product-card"),
    );

    sortSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      let currentCards = Array.from(
        productGrid.querySelectorAll(".product-card"),
      );

      if (val === "featured" || val === "newest") {
        const arr =
          val === "newest" ? [...originalOrder].reverse() : originalOrder;
        arr.forEach((card) => productGrid.appendChild(card));
      } else if (val === "price-asc" || val === "price-desc") {
        currentCards.sort((a, b) => {
          const priceAStr =
            a.querySelector(".price-current")?.textContent || "0";
          const priceBStr =
            b.querySelector(".price-current")?.textContent || "0";

          const priceA = parseInt(priceAStr.replace(/[^0-9]/g, "")) || 0;
          const priceB = parseInt(priceBStr.replace(/[^0-9]/g, "")) || 0;

          return val === "price-asc" ? priceA - priceB : priceB - priceA;
        });

        currentCards.forEach((card) => productGrid.appendChild(card));
      }
    });
  }
});

// ========= Advanced Sidebar Filtering =========
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar-filter");
  if (!sidebar) return; // Only run on products page

  const headerSearchInput = document.querySelector(
    ".header-main .search-input",
  );
  const searchInput = sidebar.querySelector(".filter-input");
  const checkboxes = sidebar.querySelectorAll(
    '.checkbox-list input[type="checkbox"]',
  );
  const priceInputs = sidebar.querySelectorAll(".price-inputs .price-input");
  const clearBtn = sidebar.querySelector(".btn-clear-filter");
  const productGrid = document.querySelector(".product-grid");
  const countDisplay = document.querySelector(".page-subtitle");

  function applyAdvancedFilters() {
    const cards = Array.from(productGrid.querySelectorAll(".product-card"));

    // 1. Get search term
    const searchTerm = normalizeText(
      searchInput?.value || headerSearchInput?.value || "",
    );

    // 2. Get checked categories
    const checkedCats = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => normalizeText(cb.parentElement.textContent));

    // 3. Get price range
    let minPrice = parseInt(priceInputs[0].value) || 0;
    let maxPrice = parseInt(priceInputs[1].value) || 999999999;
    if (minPrice > maxPrice) {
      let tmp = minPrice;
      minPrice = maxPrice;
      maxPrice = tmp;
    }

    let visibleCount = 0;

    cards.forEach((card) => {
      const title = normalizeText(
        card.querySelector(".product-name")?.textContent || "",
      );
      const cat = normalizeText(
        card.querySelector(".product-cat")?.textContent || "",
      );
      const priceStr = card.querySelector(".price-current")?.textContent || "0";
      const price = parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;

      // Check conditions
      const matchSearch =
        searchTerm === "" ||
        title.includes(searchTerm) ||
        cat.includes(searchTerm);

      // For category checkboxes, it's an OR condition among selected, AND compared to other filters
      const matchCat =
        checkedCats.length === 0 ||
        checkedCats.some(
          (checkedCat) => cat.includes(checkedCat) || checkedCat.includes(cat),
        );

      const matchPrice = price >= minPrice && price <= maxPrice;

      if (matchSearch && matchCat && matchPrice) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Tìm thấy ${visibleCount} sản phẩm`;
    }
  }

  window.applyAdvancedFilters = applyAdvancedFilters;

  // Attach Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", applyAdvancedFilters);
  }

  if (headerSearchInput) {
    headerSearchInput.addEventListener("input", applyAdvancedFilters);
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", applyAdvancedFilters);
  });

  priceInputs.forEach((input) => {
    input.addEventListener("change", applyAdvancedFilters);
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") applyAdvancedFilters();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (headerSearchInput) headerSearchInput.value = "";
      checkboxes.forEach((cb) => (cb.checked = false));
      if (priceInputs.length === 2) {
        priceInputs[0].value = 0;
        priceInputs[1].value = 10000000; // Reset to 10M
      }
      applyAdvancedFilters();
    });
  }

  // Initialize from URL query (?q=...) and render once on page load
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get("q") || "";
  if (q) {
    if (searchInput) searchInput.value = q;
    if (headerSearchInput) headerSearchInput.value = q;
  }
  applyAdvancedFilters();
});

// ========= Aqua Bubble Background Effect =========
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.toLowerCase();
  const isHomePage =
    path.endsWith("/index.html") ||
    path === "/" ||
    path.endsWith("/") ||
    path === "index.html";
  if (!isHomePage) return;

  // Setup deep blue aquarium gradient base
  document.body.style.background =
    "linear-gradient(to bottom right, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)";
  document.body.style.backgroundAttachment = "fixed";

  // Create Bubbles Container
  const bubblesContainer = document.createElement("div");
  bubblesContainer.className = "aqua-bubbles-container";
  Object.assign(bubblesContainer.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "-1",
    overflow: "hidden",
    pointerEvents: "none",
  });

  // Generate random bubbles
  for (let i = 0; i < 30; i++) {
    const bubble = document.createElement("div");
    const size = Math.random() * 35 + 5; // 5px to 40px
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 5; // 5s to 15s
    const delay = Math.random() * 5;

    Object.assign(bubble.style, {
      position: "absolute",
      bottom: "-60px",
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: "rgba(255, 255, 255, 0.4)",
      border: "1px solid rgba(255, 255, 255, 0.7)",
      borderRadius: "50%",
      boxShadow: "inset 0 0 10px rgba(255,255,255,0.4)",
      animation: `aquaRise ${duration}s infinite ease-in-out ${delay}s`,
    });

    bubblesContainer.appendChild(bubble);
  }

  document.body.appendChild(bubblesContainer);

  // Inject Keyframes dynamically
  if (!document.getElementById("aqua-bubble-css")) {
    const style = document.createElement("style");
    style.id = "aqua-bubble-css";
    style.innerHTML = `
            @keyframes aquaRise {
                0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                50% { transform: translateY(-50vh) scale(1.1) translateX(15px); }
                90% { opacity: 0.8; }
                100% { transform: translateY(-110vh) scale(1.4) translateX(-15px); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }
});
// ========= Firebase Auth Logic =========
const authForm = document.getElementById("auth-form");
const authToggleLink = document.getElementById("auth-toggle-link");
const authTitle = document.getElementById("auth-title");
const authSubtitle = document.getElementById("auth-subtitle");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const authToggleText = document.getElementById("auth-toggle-text");
const authRememberRow = document.getElementById("auth-remember-row");

let isLoginMode = true;

if (authToggleLink) {
  authToggleLink.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    authTitle.textContent = isLoginMode ? "Đăng nhập" : "Đăng ký";
    authSubtitle.textContent = isLoginMode
      ? "Đăng nhập để theo dõi đơn hàng và tích điểm"
      : "Tạo tài khoản mới để hưởng ưu đãi thành viên";
    authSubmitBtn.textContent = isLoginMode
      ? "Đăng nhập ngay"
      : "Đăng ký tài khoản";
    authToggleText.textContent = isLoginMode
      ? "Chưa có tài khoản?"
      : "Đã có tài khoản?";
    authToggleLink.textContent = isLoginMode
      ? "Đăng ký ngay"
      : "Đăng nhập ngay";
    if (authRememberRow)
      authRememberRow.style.display = isLoginMode ? "flex" : "none";
  });
}

if (authForm) {
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value;
    const password = document.getElementById("auth-password").value;

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("🎉 Đăng nhập thành công!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("🎉 Đăng ký thành công! Chào mừng thành viên mới.");
      }
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
      alert(`❌ Lỗi: ${error.message}`);
    }
  });
}

// Track Auth State
onAuthStateChanged(auth, (user) => {
  const loginBtns = document.querySelectorAll(".btn-login");
  loginBtns.forEach((btn) => {
    if (user) {
      btn.innerHTML = `<i class="fa-solid fa-user"></i> ${user.email.split("@")[0]}`;
      btn.dataset.authAction = "logout";
    } else {
      btn.innerHTML = "Đăng nhập";
      btn.dataset.authAction = "login";
    }
  });
});
