<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="container footer-grid">
        <!-- Brand -->
        <div class="footer-col brand-col">
          <RouterLink to="/" class="footer-logo">
            <img src="/images/anh/logo_transparent.png" alt="Minh Aquarium" />
            <span>Minh Aquarium</span>
          </RouterLink>
          <p>Cửa hàng thủy sinh chuyên nghiệp tại Hà Đông, Hà Nội. Cung cấp cá cảnh, tép cảnh, cây thủy sinh và thiết bị chăm sóc bể cá chất lượng cao.</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
          </div>
        </div>

        <!-- Danh mục -->
        <div class="footer-col">
          <h4>Danh mục</h4>
          <ul>
            <li><RouterLink to="/products?cat=ca-canh"><i class="fa-solid fa-fish"></i> Cá Cảnh</RouterLink></li>
            <li><RouterLink to="/products?cat=tep-canh"><i class="fa-solid fa-shrimp"></i> Tép Cảnh</RouterLink></li>
            <li><RouterLink to="/products?cat=cay-thuy-sinh"><i class="fa-solid fa-seedling"></i> Cây Thủy Sinh</RouterLink></li>
            <li><RouterLink to="/products?cat=may-loc"><i class="fa-solid fa-filter"></i> Máy Lọc</RouterLink></li>
            <li><RouterLink to="/products?cat=den-thuy-sinh"><i class="fa-solid fa-lightbulb"></i> Đèn Thủy Sinh</RouterLink></li>
            <li><RouterLink to="/products?cat=thuc-an"><i class="fa-solid fa-bowl-food"></i> Thức Ăn</RouterLink></li>
          </ul>
        </div>

        <!-- Hỗ trợ -->
        <div class="footer-col">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><RouterLink to="/blog">Kiến thức thủy sinh</RouterLink></li>
            <li><RouterLink to="/services">Dịch vụ setup bể</RouterLink></li>
            <li><a href="#">Chính sách vận chuyển</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Hướng dẫn chăm sóc</a></li>
            <li><RouterLink to="/cart">Giỏ hàng</RouterLink></li>
          </ul>
        </div>

        <!-- Liên hệ -->
        <div class="footer-col">
          <h4>Liên hệ</h4>
          <ul class="contact-list">
            <li>
              <i class="fa-solid fa-location-dot"></i>
              <span>123 Đường Nguyễn Văn Linh, Hà Đông, Hà Nội</span>
            </li>
            <li>
              <i class="fa-solid fa-phone"></i>
              <a href="tel:0123456789">0123 456 789</a>
            </li>
            <li>
              <i class="fa-solid fa-envelope"></i>
              <a href="mailto:contact@minhaquarium.vn">contact@minhaquarium.vn</a>
            </li>
            <li>
              <i class="fa-regular fa-clock"></i>
              <span>Mở cửa: 8:00 – 20:00 hàng ngày</span>
            </li>
          </ul>
          <div class="payment-badges">
            <span>COD</span>
            <span>Momo</span>
            <span>Chuyển khoản</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© 2026 Minh Aquarium. Bảo lưu mọi quyền.</p>
        <p>Thiết kế bởi ❤️ với Vue 3 + Vite</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  background: #0a1f14;
  color: rgba(255,255,255,0.7);
  margin-top: auto;
}

.footer-main { padding: 60px 0 40px; }

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.4fr;
  gap: 48px;
}

/* Brand col */
.brand-col {}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  color: white;
}
.footer-logo img {
  width: 42px;
  height: 42px;
  object-fit: contain;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
}
.footer-logo span { font-size: 18px; font-weight: 800; }
.brand-col > p {
  font-size: 13.5px;
  line-height: 1.7;
  margin-bottom: 20px;
}
.social-links {
  display: flex;
  gap: 10px;
}
.social-links a {
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  transition: all var(--t-fast);
}
.social-links a:hover { background: var(--primary); color: white; transform: translateY(-2px); }

/* Footer cols */
.footer-col h4 {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: white;
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.footer-col ul { display: flex; flex-direction: column; gap: 10px; }
.footer-col ul li { display: flex; align-items: center; gap: 8px; }
.footer-col ul li a, .footer-col ul li span {
  font-size: 13.5px;
  color: rgba(255,255,255,0.65);
  transition: color var(--t-fast);
}
.footer-col ul li a:hover { color: var(--gold); }
.footer-col ul li i { color: var(--gold); font-size: 12px; flex-shrink: 0; width: 16px; }

/* Contact list */
.contact-list { }
.contact-list li { align-items: flex-start !important; }

/* Payment badges */
.payment-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 18px;
}
.payment-badges span {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.4px;
}

/* Footer bottom */
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 16px 0;
}
.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.footer-bottom p { font-size: 13px; }

@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
}
@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .footer-bottom .container { justify-content: center; text-align: center; }
}
</style>
