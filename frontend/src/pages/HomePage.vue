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
      <div class="hero-bg">
        <div class="hero-particles">
          <span v-for="i in 12" :key="i" class="particle" :style="particleStyle(i)"></span>
        </div>
      </div>
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="hero-tag">
            <i class="fa-solid fa-fish"></i> Cửa hàng thủy sinh #1 Hà Đông
          </div>
          <h1 class="hero-title">
            Thế giới thủy sinh<br />
            <span class="hero-accent">sống động</span> trong tầm tay
          </h1>
          <p class="hero-desc">
            Hơn 129 loại cá cảnh, tép cảnh, cây thủy sinh và thiết bị chuyên dụng.
            Cam kết chất lượng – Giao hàng toàn quốc.
          </p>
          <div class="hero-actions">
            <RouterLink to="/products" class="btn btn-primary btn-xl">
              <i class="fa-solid fa-store"></i> Khám phá sản phẩm
            </RouterLink>
            <RouterLink to="/services" class="btn btn-ghost btn-xl">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Dịch vụ setup bể
            </RouterLink>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>129+</strong><span>Sản phẩm</span></div>
            <div class="stat-sep"></div>
            <div class="stat"><strong>5 năm</strong><span>Kinh nghiệm</span></div>
            <div class="stat-sep"></div>
            <div class="stat"><strong>2,000+</strong><span>Khách hàng</span></div>
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
            <i class="fa-solid fa-wand-magic-sparkles"></i> Dịch vụ chuyên nghiệp
          </div>
          <h2>Muốn có một bể thủy sinh<br/><strong>đẹp mà không mất thời gian?</strong></h2>
          <p>Đội ngũ chuyên gia của Minh Aquarium sẽ setup bể theo ý tưởng của bạn. Từ tư vấn chọn cây, cá, thiết bị đến lắp đặt hoàn chỉnh tại nhà.</p>
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
    <section class="section" style="background: var(--bg-section)">
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

// Particle styles
function particleStyle(i) {
  const size = (i % 3 + 1) * 8
  return {
    width: size + 'px', height: size + 'px',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    animationDelay: (i * 0.7) + 's',
    animationDuration: (8 + i * 0.5) + 's',
  }
}

const trusts = [
  { icon: 'fa-truck-fast',      title: 'Giao hàng toàn quốc', desc: 'Ship tận nơi, đóng gói an toàn',     bg: '#eaf6f0', color: '#1a6b45' },
  { icon: 'fa-shield-halved',   title: 'Bảo hành sinh vật',   desc: 'Cam kết 7 ngày, đổi trả miễn phí',   bg: '#fff0ef', color: '#e53935' },
  { icon: 'fa-star',            title: 'Chất lượng đảm bảo',  desc: 'Nhập khẩu trực tiếp, hàng tuyển chọn', bg: '#fffbeb', color: '#f59e0b' },
  { icon: 'fa-headset',         title: 'Hỗ trợ 24/7',         desc: 'Tư vấn miễn phí mọi lúc mọi nơi',    bg: '#f0f0ff', color: '#6366f1' },
]
</script>

<style scoped>
/* ===== HERO ===== */
.hero-section {
  background: linear-gradient(135deg, #0a1f14 0%, #1a4a2a 50%, #0d3320 100%);
  position: relative;
  overflow: hidden;
  min-height: 580px;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('/images/anh/logo_transparent.png') right -100px center / 500px no-repeat;
  opacity: 0.04;
}

.hero-particles { position: absolute; inset: 0; pointer-events: none; }
.particle {
  position: absolute;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
  animation: float linear infinite;
}
@keyframes float {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.6; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--gold);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--r-full);
  margin-bottom: 18px;
}
.hero-title {
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 900;
  color: white;
  line-height: 1.15;
  margin-bottom: 16px;
}
.hero-accent {
  background: linear-gradient(90deg, #4ade80, #86efac);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 480px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }

.hero-stats { display: flex; align-items: center; gap: 20px; }
.stat { display: flex; flex-direction: column; }
.stat strong { font-size: 22px; font-weight: 800; color: white; }
.stat span { font-size: 12px; color: rgba(255,255,255,0.55); }
.stat-sep { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }

/* Banner */
.hero-banner { overflow: hidden; }
.banner-wrap {
  position: relative;
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
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
  background: linear-gradient(135deg, #0a1f14 0%, #1a6b45 60%, #2a8a5a 100%);
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
