<template>
  <!-- Product Detail Modal -->
  <ProductDetailModal
    :product="selectedProduct"
    @close="selectedProduct = null"
    @open="selectedProduct = $event"
  />
  <div class="home-page">

    <!-- ===== HERO BANNER ===== -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="hero-tag">
            <i class="fa-solid fa-location-dot"></i> La Khê, Hà Đông, Hà Nội
          </div>
          <h1 class="hero-title">
            Cá cảnh, tép cảnh &amp;<br />
            <span class="hero-accent">cây thủy sinh</span> cho bể nhà bạn
          </h1>
          <p class="hero-desc">
            Minh Aquarium cung cấp cá cảnh, tép cảnh, cây thủy sinh, thiết bị lọc,
            đèn chuyên dụng và nhận setup bể trọn gói. Giao hàng toàn quốc, hỗ trợ COD.
          </p>
          <div class="hero-actions">
            <RouterLink to="/products" class="btn btn-primary btn-xl">
              <i class="fa-solid fa-store"></i> Xem sản phẩm
            </RouterLink>
            <RouterLink to="/services" class="btn btn-ghost btn-xl">
              <i class="fa-solid fa-screwdriver-wrench"></i> Dịch vụ setup bể
            </RouterLink>
          </div>
        </div>
        <!-- Banner carousel -->
        <div class="hero-banner">
          <div class="banner-wrap">
            <div class="banner-track" :style="{ transform: `translateX(-${slide * 100}%)` }">
              <div v-for="(banner, i) in banners" :key="i" class="banner-slide">
                <img :src="banner.img" :alt="banner.alt" />
              </div>
            </div>
            <button class="banner-arrow prev" @click="prevSlide"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="banner-arrow next" @click="nextSlide"><i class="fa-solid fa-chevron-right"></i></button>
            <div class="banner-dots">
              <button v-for="(_, i) in banners" :key="i" :class="{ active: slide === i }" @click="slide = i"></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TRUST BADGES ===== -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-grid">
          <div class="trust-item" v-for="t in trusts" :key="t.title">
            <div class="trust-icon" :style="{ background: t.bg }">
              <i :class="`fa-solid ${t.icon}`" :style="{ color: t.color }"></i>
            </div>
            <div class="trust-text">
              <strong>{{ t.title }}</strong>
              <span>{{ t.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CATEGORY QUICK NAV ===== -->
    <section class="section section--sm">
      <div class="container">
        <div class="cat-nav-grid">
          <RouterLink
            v-for="cat in categories"
            :key="cat.id"
            :to="`/products?cat=${cat.id}`"
            class="cat-nav-item"
          >
            <div class="cat-nav-icon">
              <i :class="`fa-solid ${cat.icon}`"></i>
            </div>
            <span>{{ cat.label }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ===== FEATURED PRODUCTS ===== -->
    <section class="section" style="background: var(--bg-section)">
      <div class="container">
        <div class="section-header">
          <div>
            <div class="section-tag"><i class="fa-solid fa-star"></i> Nổi bật</div>
            <h2 class="section-title">Sản phẩm được yêu thích</h2>
          </div>
          <RouterLink to="/products" class="btn btn-outline btn-sm">
            Xem tất cả <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="p in featuredProducts"
            :key="p.id"
            :product="p"
            @click="selectedProduct = p"
          />
        </div>
      </div>
    </section>

    <!-- ===== CÁ CẢNH ===== -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <div class="section-tag"><i class="fa-solid fa-fish"></i> Cá cảnh</div>
            <h2 class="section-title">Cá Cảnh Thủy Sinh</h2>
          </div>
          <RouterLink to="/products?cat=ca-canh" class="btn btn-outline btn-sm">
            Xem thêm <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
        </div>
        <div class="products-grid">
          <ProductCard v-for="p in fishProducts" :key="p.id" :product="p" @click="selectedProduct = p" />
        </div>
      </div>
    </section>

    <!-- ===== CTA SETUP ===== -->
    <section class="cta-section">
      <div class="cta-bg"></div>
      <div class="container cta-inner">
        <div class="cta-content">
          <div class="section-tag" style="background:rgba(255,255,255,0.15); color:white">
            <i class="fa-solid fa-screwdriver-wrench"></i> Dịch vụ setup bể
          </div>
          <h2>Nhận thiết kế &amp; setup<br/><strong>bể thủy sinh trọn gói</strong></h2>
          <p>Minh Aquarium tư vấn chọn cây, cá, thiết bị và lắp đặt hoàn chỉnh tại nhà theo phong cách bạn mong muốn (Iwagumi, Biotope, rừng nhiệt đới...). Liên hệ để được báo giá.</p>
          <div class="cta-actions">
            <RouterLink to="/services" class="btn btn-xl" style="background:white; color:var(--primary)">
              <i class="fa-solid fa-calendar-check"></i> Đặt lịch tư vấn
            </RouterLink>
            <a href="tel:0123456789" class="btn btn-ghost btn-xl">
              <i class="fa-solid fa-phone"></i> Gọi ngay: 0123 456 789
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TÉP CẢNH ===== -->
    <section v-if="shrimpProducts.length" class="section" style="background: var(--bg-section)">
      <div class="container">
        <div class="section-header">
          <div>
            <div class="section-tag"><i class="fa-solid fa-shrimp"></i> Tép cảnh</div>
            <h2 class="section-title">Tép Cảnh Cao Cấp</h2>
          </div>
          <RouterLink to="/products?cat=tep-canh" class="btn btn-outline btn-sm">
            Xem thêm <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
        </div>
        <div class="products-grid products-grid-4">
          <ProductCard v-for="p in shrimpProducts" :key="p.id" :product="p" @click="selectedProduct = p" />
        </div>
      </div>
    </section>

    <!-- ===== CÂY THỦY SINH ===== -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <div class="section-tag"><i class="fa-solid fa-seedling"></i> Cây thủy sinh</div>
            <h2 class="section-title">Cây Thủy Sinh Xanh Mướt</h2>
          </div>
          <RouterLink to="/products?cat=cay-thuy-sinh" class="btn btn-outline btn-sm">
            Xem thêm <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
        </div>
        <div class="products-grid">
          <ProductCard v-for="p in plantProducts" :key="p.id" :product="p" @click="selectedProduct = p" />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'

const selectedProduct = ref(null)

// Banners
const banners = [
  { img: '/images/anh/banner_part1.png', alt: 'Banner 1' },
  { img: '/images/anh/banner_part2.png', alt: 'Banner 2' },
  { img: '/images/anh/banner_part3.png', alt: 'Banner 3' },
]
const slide = ref(0)
let autoTimer

function nextSlide() { slide.value = (slide.value + 1) % banners.length; resetTimer() }
function prevSlide() { slide.value = (slide.value - 1 + banners.length) % banners.length; resetTimer() }
function resetTimer() {
  clearInterval(autoTimer)
  autoTimer = setInterval(nextSlide, 4500)
}
onMounted(() => { autoTimer = setInterval(nextSlide, 4500) })
onUnmounted(() => clearInterval(autoTimer))

// Products
const featuredProducts = computed(() => products.filter(p => p.featured).slice(0, 10))
const fishProducts     = computed(() => products.filter(p => p.cat === 'ca-canh').slice(0, 10))
const shrimpProducts   = computed(() => products.filter(p => p.cat === 'tep-canh').slice(0, 8))
const plantProducts    = computed(() => products.filter(p => p.cat === 'cay-thuy-sinh').slice(0, 10))

const trusts = [
  { icon: 'fa-truck-fast',      title: 'Giao hàng toàn quốc', desc: 'Ship tận nơi, đóng gói an toàn',     bg: '#eaf6f0', color: '#1a6b45' },
  { icon: 'fa-shield-halved',   title: 'Bảo hành sinh vật',   desc: 'Cam kết 7 ngày, đổi trả nếu lỗi',    bg: '#f3ece2', color: '#a86a3d' },
  { icon: 'fa-seedling',        title: 'Hàng tuyển chọn',     desc: 'Cá khỏe, cây sạch, chọn kỹ từng con', bg: '#eaf6f0', color: '#2f6b52' },
  { icon: 'fa-headset',         title: 'Tư vấn tận tình',     desc: 'Hỗ trợ chọn cây, cá và cách chăm',   bg: '#eef4f0', color: '#3d8168' },
]
</script>

<style scoped>
/* ===== HERO ===== */
.hero-section {
  background: #14532d;
  position: relative;
  overflow: hidden;
  min-height: 520px;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('/images/anh/logo_transparent.png') right -100px center / 460px no-repeat;
  opacity: 0.05;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 56px 20px;
  position: relative;
  z-index: 1;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffe6c7;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--r-full);
  margin-bottom: 18px;
}
.hero-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  color: white;
  line-height: 1.18;
  margin-bottom: 16px;
}
.hero-accent {
  color: #86efac;
}
.hero-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.78);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 480px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

/* Banner */
.hero-banner { overflow: hidden; }
.banner-wrap {
  position: relative;
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  aspect-ratio: 16/9;
}
.banner-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25,1,0.5,1);
}
.banner-slide { flex: 0 0 100%; }
.banner-slide img { width: 100%; height: 100%; object-fit: cover; }

.banner-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.9);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  z-index: 5;
  transition: all var(--t-fast);
}
.banner-arrow:hover { background: white; box-shadow: var(--shadow-md); }
.banner-arrow.prev { left: 12px; }
.banner-arrow.next { right: 12px; }
.banner-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}
.banner-dots button {
  width: 7px; height: 7px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.5);
  padding: 0;
  cursor: pointer;
  transition: all 0.3s;
}
.banner-dots button.active { width: 22px; border-radius: 4px; background: white; }

/* ===== TRUST ===== */
.trust-section {
  background: white;
  border-bottom: 1px solid var(--border-light);
  padding: 20px 0;
}
.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 24px;
  border-right: 1px solid var(--border-light);
}
.trust-item:last-child { border-right: none; }
.trust-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.trust-text strong { display: block; font-size: 13.5px; font-weight: 700; color: var(--text-heading); margin-bottom: 2px; }
.trust-text span { font-size: 12px; color: var(--text-muted); }

/* ===== CATEGORY NAV ===== */
.cat-nav-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
}
.cat-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 8px;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--r-lg);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-body);
  text-align: center;
  transition: all var(--t-mid);
}
.cat-nav-item:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
}
.cat-nav-icon {
  width: 44px; height: 44px;
  background: var(--bg-section);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--primary);
  transition: all var(--t-mid);
}
.cat-nav-item:hover .cat-nav-icon { background: var(--primary); color: white; }

/* ===== SECTION HEADER ===== */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

/* ===== PRODUCT GRIDS ===== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.products-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* ===== CTA ===== */
.cta-section {
  position: relative;
  padding: 80px 0;
  overflow: hidden;
}
.cta-bg {
  position: absolute;
  inset: 0;
  background: #14532d;
}
.cta-inner { position: relative; z-index: 1; }
.cta-content { max-width: 680px; color: white; }
.cta-content h2 { font-size: clamp(22px, 3vw, 34px); font-weight: 800; line-height: 1.3; margin: 14px 0 16px; }
.cta-content p { font-size: 15px; color: rgba(255,255,255,0.78); line-height: 1.7; margin-bottom: 28px; }
.cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }

/* Responsive */
@media (max-width: 1024px) {
  .cat-nav-grid { grid-template-columns: repeat(4, 1fr); }
  .products-grid { grid-template-columns: repeat(4, 1fr); }
  .trust-grid { grid-template-columns: repeat(2, 1fr); }
  .trust-item:nth-child(2) { border-right: none; }
}
@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; gap: 28px; }
  .hero-banner { display: none; }
  .cat-nav-grid { grid-template-columns: repeat(4, 1fr); }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .products-grid-4 { grid-template-columns: repeat(2, 1fr); }
  .trust-grid { grid-template-columns: 1fr; }
  .trust-item { border-right: none; border-bottom: 1px solid var(--border-light); }
  .trust-item:last-child { border-bottom: none; }
}
</style>
