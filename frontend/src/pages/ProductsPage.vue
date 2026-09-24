<template>
  <!-- Product Detail Modal -->
  <ProductDetailModal
    :product="selectedProduct"
    @close="selectedProduct = null"
    @open="selectedProduct = $event"
  />
  <div class="products-page">
    <!-- Page header -->
    <div class="page-header-bar">
      <div class="container">
        <nav class="breadcrumb">
          <RouterLink to="/"><i class="fa-solid fa-house"></i></RouterLink>
          <i class="fa-solid fa-chevron-right sep"></i>
          <span>{{ activeCatLabel || 'Tất cả sản phẩm' }}</span>
        </nav>
      </div>
    </div>

    <div class="container page-body">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">Danh mục</h3>
          <ul class="cat-list">
            <li>
              <button
                :class="{ active: !activeCat }"
                @click="activeCat = ''; searchQ = ''"
              >
                <i class="fa-solid fa-th-large"></i> Tất cả
                <span class="count">{{ products.length }}</span>
              </button>
            </li>
            <li v-for="cat in categories" :key="cat.id">
              <button
                :class="{ active: activeCat === cat.id }"
                @click="activeCat = cat.id; searchQ = ''"
              >
                <i :class="`fa-solid ${cat.icon}`"></i>
                {{ cat.label }}
                <span class="count">{{ productsBycat(cat.id).length }}</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Price Filter -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Khoảng giá</h3>
          <div class="price-range-labels">
            <span>{{ formatPrice(priceRange[0]) }}</span>
            <span>{{ formatPrice(priceRange[1]) }}</span>
          </div>
          <div class="range-inputs">
            <input type="range" min="0" max="300000" step="5000" v-model.number="priceRange[0]" />
            <input type="range" min="0" max="300000" step="5000" v-model.number="priceRange[1]" />
          </div>
          <button class="btn btn-outline btn-sm btn-full mt-8" @click="resetFilters">
            <i class="fa-solid fa-rotate-left"></i> Xóa bộ lọc
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <div class="main-area">
        <!-- Toolbar -->
        <div class="toolbar">
          <div class="toolbar-left">
            <p class="result-count">
              Hiển thị <strong>{{ filtered.length }}</strong> sản phẩm
            </p>
          </div>
          <div class="toolbar-right">
            <!-- Search inline -->
            <div class="inline-search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                v-model="searchQ"
                type="text"
                placeholder="Tìm trong danh mục..."
              />
            </div>
            <!-- Sort -->
            <select v-model="sortBy" class="sort-select">
              <option value="default">Nổi bật trước</option>
              <option value="price-asc">Giá: Thấp → Cao</option>
              <option value="price-desc">Giá: Cao → Thấp</option>
              <option value="name-asc">Tên A → Z</option>
            </select>
          </div>
        </div>

        <!-- Category pills -->
        <div class="cat-pills" v-if="!activeCat">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="cat-pill"
            @click="activeCat = cat.id"
          >
            <i :class="`fa-solid ${cat.icon}`"></i> {{ cat.label }}
          </button>
        </div>

        <!-- Grid -->
        <div v-if="filtered.length" class="product-grid">
          <ProductCard
            v-for="p in filtered"
            :key="p.id"
            :product="p"
            @click="selectedProduct = p"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-fish-fins"></i></div>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          <button class="btn btn-primary" @click="resetFilters">Xóa bộ lọc</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { products, categories, formatPrice } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'

const route = useRoute()
const selectedProduct = ref(null)

const activeCat  = ref('')
const searchQ    = ref('')
const sortBy     = ref('default')
const priceRange = ref([0, 300000])

// Read URL params on mount & route change
function syncFromRoute() {
  activeCat.value = route.query.cat || ''
  searchQ.value   = route.query.q   || ''
}
onMounted(syncFromRoute)
watch(() => route.query, syncFromRoute)

const activeCatLabel = computed(() => {
  const cat = categories.find(c => c.id === activeCat.value)
  return cat ? cat.label : ''
})

function productsBycat(id) {
  return products.filter(p => p.cat === id)
}

const filtered = computed(() => {
  let list = [...products]

  if (activeCat.value)
    list = list.filter(p => p.cat === activeCat.value)

  if (searchQ.value.trim()) {
    const q = searchQ.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.catLabel.toLowerCase().includes(q)
    )
  }

  list = list.filter(p =>
    p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  )

  if (sortBy.value === 'price-asc')  list.sort((a,b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list.sort((a,b) => b.price - a.price)
  if (sortBy.value === 'name-asc')   list.sort((a,b) => a.name.localeCompare(b.name, 'vi'))
  if (sortBy.value === 'default')    list.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

  return list
})

function resetFilters() {
  activeCat.value  = ''
  searchQ.value    = ''
  sortBy.value     = 'default'
  priceRange.value = [0, 300000]
}
</script>

<style scoped>
/* Page header bar */
.page-header-bar {
  background: white;
  border-bottom: 1px solid var(--border-light);
  padding: 12px 0;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
}
.breadcrumb a { color: var(--primary); font-weight: 600; }
.breadcrumb .sep { font-size: 10px; }

/* Body layout */
.page-body {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  padding: 28px 20px;
  align-items: start;
}

/* Sidebar */
.sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 120px; }

.sidebar-card {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--r-lg);
  overflow: hidden;
}
.sidebar-title {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: white;
  background: var(--primary);
  padding: 11px 16px;
}

/* Category list */
.cat-list { padding: 8px 0; }
.cat-list button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 16px;
  background: none;
  border: none;
  font-size: 13.5px;
  color: var(--text-body);
  text-align: left;
  transition: all var(--t-fast);
  cursor: pointer;
}
.cat-list button i { width: 16px; color: var(--text-muted); }
.cat-list button:hover { background: var(--bg-section); color: var(--primary); }
.cat-list button:hover i { color: var(--primary); }
.cat-list button.active { background: var(--primary-light); color: var(--primary); font-weight: 700; }
.cat-list button.active i { color: var(--primary); }
.count {
  margin-left: auto;
  background: var(--bg);
  color: var(--text-muted);
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 10px;
  font-weight: 600;
}
.cat-list button.active .count { background: var(--primary); color: white; }

/* Price range */
.price-range-labels {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
}
.range-inputs { padding: 0 16px; display: flex; flex-direction: column; gap: 8px; }
.range-inputs input[type="range"] {
  width: 100%;
  accent-color: var(--primary);
  cursor: pointer;
}
.mt-8 { margin: 8px 16px 14px; width: calc(100% - 32px); }

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.toolbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.result-count { font-size: 14px; color: var(--text-muted); }
.result-count strong { color: var(--text-heading); }

.inline-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: var(--r-full);
  padding: 7px 14px;
  min-width: 200px;
  transition: border-color var(--t-fast);
}
.inline-search:focus-within { border-color: var(--primary); }
.inline-search i { color: var(--text-muted); font-size: 13px; }
.inline-search input { border: none; outline: none; font-size: 13.5px; background: transparent; flex: 1; color: var(--text-heading); }
.inline-search input::placeholder { color: var(--text-light); }

.sort-select {
  padding: 7px 12px;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: var(--r-full);
  font-size: 13.5px;
  font-family: inherit;
  color: var(--text-body);
  cursor: pointer;
  outline: none;
}

/* Category pills */
.cat-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}
.cat-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: var(--r-full);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-body);
  cursor: pointer;
  transition: all var(--t-fast);
}
.cat-pill:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  color: var(--primary);
}

/* Product grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: var(--r-xl);
  border: 1px solid var(--border-light);
}
.empty-icon { font-size: 64px; color: var(--border); margin-bottom: 20px; }
.empty-state h3 { font-size: 18px; font-weight: 700; color: var(--text-heading); margin-bottom: 8px; }
.empty-state p { color: var(--text-muted); margin-bottom: 20px; }

@media (max-width: 768px) {
  .page-body { grid-template-columns: 1fr; }
  .sidebar { position: static; flex-direction: row; flex-wrap: wrap; }
  .sidebar-card { flex: 1; min-width: 200px; }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
