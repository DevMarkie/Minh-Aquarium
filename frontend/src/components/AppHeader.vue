<template>
  <!-- Top utility bar -->
  <div class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-left">
        <span><i class="fa-solid fa-truck-fast"></i> Giao hàng toàn quốc</span>
        <span class="sep">|</span>
        <span><i class="fa-solid fa-shield-halved"></i> Bảo hành sinh vật 7 ngày</span>
        <span class="sep">|</span>
        <span><i class="fa-solid fa-phone-volume"></i> Hotline: 0123 456 789</span>
      </div>
      <div class="top-bar-right">
        <RouterLink to="/login"><i class="fa-regular fa-user"></i> Đăng nhập</RouterLink>
        <span class="sep">|</span>
        <RouterLink to="/login"><i class="fa-solid fa-user-plus"></i> Đăng ký</RouterLink>
      </div>
    </div>
  </div>

  <!-- Main header -->
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="container header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <div class="logo-icon">
          <img src="/images/anh/logo_transparent.png" alt="Minh Aquarium" />
        </div>
        <div class="logo-text">
          <span class="brand-name">Minh Aquarium</span>
          <span class="brand-slogan">Thủy sinh chuyên nghiệp</span>
        </div>
      </RouterLink>

      <!-- Search -->
      <div class="search-wrap" :class="{ focused: searchFocused }">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm cá, tép, cây thủy sinh..."
          class="search-input"
          @focus="searchFocused = true"
          @blur="handleBlur"
          @keydown.enter="doSearch"
        />
        <button class="search-btn" @click="doSearch" aria-label="Tìm kiếm">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        <!-- Live suggestions -->
        <Transition name="dropdown">
          <div class="search-suggestions" v-if="suggestions.length && searchFocused">
            <RouterLink
              v-for="p in suggestions"
              :key="p.id"
              :to="`/products?q=${encodeURIComponent(p.name)}`"
              class="suggestion-item"
              @click="searchFocused = false; searchQuery = ''"
            >
              <img :src="p.img" :alt="p.name" />
              <div>
                <div class="sug-name">{{ p.name }}</div>
                <div class="sug-cat">{{ p.catLabel }}</div>
              </div>
              <span class="sug-price">{{ formatPrice(p.price) }}</span>
            </RouterLink>
          </div>
        </Transition>
      </div>

      <!-- Actions -->
      <div class="header-actions">
        <a href="tel:0123456789" class="hotline hide-mobile">
          <div class="hotline-icon"><i class="fa-solid fa-phone"></i></div>
          <div>
            <small>Hotline</small>
            <strong>0123 456 789</strong>
          </div>
        </a>

        <RouterLink to="/cart" class="cart-btn" aria-label="Giỏ hàng">
          <i class="fa-solid fa-cart-shopping"></i>
          <span v-if="totalCount > 0" class="cart-badge">{{ totalCount }}</span>
        </RouterLink>

        <RouterLink to="/login" class="btn btn-primary btn-sm hide-mobile">
          <i class="fa-regular fa-user"></i> Đăng nhập
        </RouterLink>
      </div>
    </div>

    <!-- Red nav bar -->
    <nav class="main-nav">
      <div class="container nav-inner">
        <!-- Category Mega Menu Toggle -->
        <div class="cat-toggle-wrap">
          <button class="cat-toggle" @click="catOpen = !catOpen" :class="{ active: catOpen }">
            <i class="fa-solid fa-grip"></i>
            <span>DANH MỤC</span>
            <i class="fa-solid fa-chevron-down toggle-arrow"></i>
          </button>

          <Transition name="dropdown">
            <div class="cat-menu" v-if="catOpen" @mouseleave="catOpen = false">
              <RouterLink
                v-for="cat in categories"
                :key="cat.id"
                :to="`/products?cat=${cat.id}`"
                class="cat-menu-item"
                @click="catOpen = false"
              >
                <i :class="`fa-solid ${cat.icon}`"></i>
                <span>{{ cat.label }}</span>
              </RouterLink>
            </div>
          </Transition>
        </div>

        <!-- Nav links -->
        <div class="nav-links">
          <RouterLink to="/" exact-active-class="active">Trang chủ</RouterLink>
          <RouterLink to="/products" active-class="active">Sản phẩm</RouterLink>
          <RouterLink :to="{ path: '/products', query: { cat: 'ca-canh' } }" active-class="active">Cá cảnh</RouterLink>
          <RouterLink :to="{ path: '/products', query: { cat: 'tep-canh' } }" active-class="active">Tép cảnh</RouterLink>
          <RouterLink :to="{ path: '/products', query: { cat: 'cay-thuy-sinh' } }" active-class="active">Cây thủy sinh</RouterLink>
          <RouterLink to="/blog" active-class="active">Kiến thức</RouterLink>
          <RouterLink to="/services" active-class="active">Dịch vụ Setup</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { products, categories, formatPrice } from '@/data/products'

const { totalCount } = useCart()
const router = useRouter()

const isScrolled = ref(false)
const searchQuery = ref('')
const searchFocused = ref(false)
const catOpen = ref(false)

const suggestions = computed(() => {
  if (!searchQuery.value.trim() || searchQuery.value.length < 2) return []
  const q = searchQuery.value.toLowerCase()
  return products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5)
})

function doSearch() {
  if (!searchQuery.value.trim()) return
  router.push({ path: '/products', query: { q: searchQuery.value.trim() } })
  searchQuery.value = ''
  searchFocused.value = false
}

function handleBlur() {
  setTimeout(() => { searchFocused.value = false }, 200)
}

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ===== TOP BAR ===== */
.top-bar {
  background: #0d2018;
  color: rgba(255,255,255,0.72);
  font-size: 12.5px;
  padding: 6px 0;
}
.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-bar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.top-bar-left i, .top-bar-right i { color: var(--gold); }
.sep { opacity: 0.3; }
.top-bar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.top-bar-right a { color: rgba(255,255,255,0.72); transition: color var(--t-fast); }
.top-bar-right a:hover { color: white; }

/* ===== MAIN HEADER ===== */
.site-header {
  background: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 0 var(--border-light);
  transition: box-shadow var(--t-mid);
}
.site-header.scrolled {
  box-shadow: 0 4px 20px rgba(0,0,0,0.10);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.logo-icon img {
  height: 48px;
  width: 48px;
  object-fit: contain;
  border-radius: 50%;
}
.logo-text { display: flex; flex-direction: column; }
.brand-name {
  font-size: 18px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.1;
}
.brand-slogan {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

/* Search */
.search-wrap {
  flex: 1;
  max-width: 520px;
  position: relative;
  display: flex;
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: var(--r-full);
  overflow: visible;
  transition: all var(--t-fast);
}
.search-wrap.focused {
  border-color: var(--primary);
  background: white;
  box-shadow: var(--shadow-glow);
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
  color: var(--text-heading);
  border-radius: var(--r-full) 0 0 var(--r-full);
}
.search-input::placeholder { color: var(--text-light); }
.search-btn {
  background: var(--accent);
  border: none;
  color: white;
  width: 46px;
  border-radius: 0 var(--r-full) var(--r-full) 0;
  font-size: 15px;
  transition: background var(--t-fast);
  flex-shrink: 0;
}
.search-btn:hover { background: var(--accent-hover); }

/* Suggestions dropdown */
.search-suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-lg);
  z-index: 2000;
  overflow: hidden;
}
.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  transition: background var(--t-fast);
  border-bottom: 1px solid var(--border-light);
}
.suggestion-item:last-child { border-bottom: none; }
.suggestion-item:hover { background: var(--bg-section); }
.suggestion-item img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: var(--r-sm);
  flex-shrink: 0;
}
.sug-name { font-size: 13px; font-weight: 600; color: var(--text-heading); }
.sug-cat  { font-size: 11px; color: var(--text-muted); }
.sug-price { font-size: 13px; font-weight: 700; color: var(--accent); margin-left: auto; flex-shrink: 0; }

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-left: auto;
  flex-shrink: 0;
}
.hotline {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-heading);
}
.hotline-icon {
  width: 36px;
  height: 36px;
  background: var(--accent-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 14px;
}
.hotline small {
  display: block;
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.hotline strong { font-size: 15px; font-weight: 800; }

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: 50%;
  color: var(--text-body);
  font-size: 18px;
  transition: all var(--t-fast);
}
.cart-btn:hover {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
}
.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--accent);
  color: white;
  font-size: 10px;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  animation: pulse 0.3s ease;
}

/* ===== NAV BAR ===== */
.main-nav {
  background: var(--primary);
  position: relative;
}
.nav-inner {
  display: flex;
  align-items: stretch;
  gap: 0;
}

/* Category toggle */
.cat-toggle-wrap {
  position: relative;
  flex-shrink: 0;
}
.cat-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  height: 46px;
  background: rgba(0,0,0,0.18);
  border: none;
  color: white;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: background var(--t-fast);
  min-width: 170px;
}
.cat-toggle:hover, .cat-toggle.active { background: rgba(0,0,0,0.28); }
.toggle-arrow {
  margin-left: auto;
  font-size: 11px;
  transition: transform var(--t-fast);
}
.cat-toggle.active .toggle-arrow { transform: rotate(180deg); }

.cat-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 240px;
  background: white;
  border-radius: 0 0 var(--r-lg) var(--r-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  z-index: 2000;
  overflow: hidden;
}
.cat-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 18px;
  font-size: 13.5px;
  color: var(--text-body);
  border-bottom: 1px solid var(--border-light);
  transition: all var(--t-fast);
}
.cat-menu-item:last-child { border-bottom: none; }
.cat-menu-item:hover {
  background: var(--primary-light);
  color: var(--primary);
  padding-left: 24px;
}
.cat-menu-item i { width: 18px; color: var(--primary); font-size: 13px; flex-shrink: 0; }

/* Nav links */
.nav-links {
  display: flex;
  align-items: stretch;
}
.nav-links a {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 46px;
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
  letter-spacing: 0.2px;
  transition: background var(--t-fast);
  white-space: nowrap;
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  height: 2px;
  background: white;
  border-radius: 2px 2px 0 0;
  transition: all var(--t-mid);
}
.nav-links a:hover { color: white; background: rgba(0,0,0,0.1); }
.nav-links a:hover::after,
.nav-links a.active::after { left: 12px; right: 12px; }
.nav-links a.active { color: white; }

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active { transition: all 0.2s ease; }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 768px) {
  .top-bar { display: none; }
  .header-inner { padding: 10px 16px; }
  .brand-name { font-size: 15px; }
  .nav-links a { padding: 0 10px; font-size: 12px; }
  .cat-toggle { min-width: unset; padding: 0 12px; font-size: 12px; }
  .cat-toggle span { display: none; }
}
</style>
