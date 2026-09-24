<template>
  <Transition name="modal-fade">
    <div v-if="product" class="modal-backdrop" @click.self="$emit('close')">
      <Transition name="modal-slide">
        <div v-if="product" class="modal-box" role="dialog" aria-modal="true">
          <!-- Close -->
          <button class="modal-close" @click="$emit('close')" aria-label="Đóng">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="modal-inner">
            <!-- Left: Image -->
            <div class="modal-img-wrap">
              <div class="modal-badges">
                <span v-if="product.featured" class="badge badge-hot">HOT</span>
              </div>
              <img :src="product.img" :alt="product.name" @error="onImgError" />
              <!-- Wishlist -->
              <button class="wish-btn" :class="{ active: wished }" @click="wished = !wished">
                <i :class="wished ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
              </button>
            </div>

            <!-- Right: Info -->
            <div class="modal-info">
              <p class="modal-cat">{{ product.catLabel }}</p>
              <h2 class="modal-name">{{ product.name }}</h2>

              <div class="modal-price-row">
                <span class="modal-price">{{ formatPrice(product.price) }}</span>
                <span class="modal-unit">/ con</span>
              </div>

              <!-- Stock indicator -->
              <div class="stock-badge">
                <span class="stock-dot"></span> Còn hàng – Sẵn sàng giao
              </div>

              <!-- Description -->
              <div class="modal-desc">
                <p>{{ getDesc(product) }}</p>
              </div>

              <!-- Care tags -->
              <div class="care-tags">
                <span v-for="tag in getCareTags(product)" :key="tag.label" class="care-tag">
                  <i :class="tag.icon"></i> {{ tag.label }}
                </span>
              </div>

              <!-- Quantity -->
              <div class="qty-row">
                <label class="qty-label">Số lượng</label>
                <div class="qty-ctrl">
                  <button @click="qty = Math.max(1, qty - 1)" :disabled="qty <= 1">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    v-model.number="qty"
                    min="1"
                    max="99"
                    @change="qty = Math.max(1, Math.min(99, qty))"
                  />
                  <button @click="qty = Math.min(99, qty + 1)">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <span class="qty-total">= {{ formatPrice(product.price * qty) }}</span>
              </div>

              <!-- Actions -->
              <div class="modal-actions">
                <button class="btn btn-primary btn-lg flex-1" @click="addAndClose">
                  <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                </button>
                <RouterLink to="/cart" class="btn btn-accent btn-lg flex-1" @click="addAndGoCart">
                  <i class="fa-solid fa-credit-card"></i> Mua ngay
                </RouterLink>
              </div>

              <!-- Added toast -->
              <Transition name="pop">
                <div v-if="justAdded" class="added-bar">
                  <i class="fa-solid fa-circle-check"></i> Đã thêm {{ qty }} sản phẩm vào giỏ hàng!
                </div>
              </Transition>

              <!-- Guarantees -->
              <div class="guarantees">
                <div class="guarantee" v-for="g in guarantees" :key="g.label">
                  <i :class="g.icon" :style="{ color: g.color }"></i>
                  <span>{{ g.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Related products -->
          <div v-if="related.length" class="related-section">
            <h3 class="related-title">Sản phẩm liên quan</h3>
            <div class="related-grid">
              <div
                v-for="p in related"
                :key="p.id"
                class="related-card"
                @click="$emit('open', p)"
              >
                <img :src="p.img" :alt="p.name" @error="(e) => e.target.src = '/images/anh/logo_transparent.png'" />
                <div class="related-info">
                  <p class="related-name">{{ p.name }}</p>
                  <p class="related-price">{{ formatPrice(p.price) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCart } from '@/composables/useCart'
import { products, formatPrice } from '@/data/products'

const props = defineProps({
  product: { type: Object, default: null },
})
const emit = defineEmits(['close', 'open'])

const { addItem } = useCart()
const qty      = ref(1)
const wished   = ref(false)
const justAdded = ref(false)

// Reset qty when product changes
watch(() => props.product, () => {
  qty.value = 1
  wished.value = false
  justAdded.value = false
})

const related = computed(() => {
  if (!props.product) return []
  return products
    .filter(p => p.cat === props.product.cat && p.id !== props.product.id)
    .slice(0, 6)
})

function onImgError(e) {
  e.target.src = '/images/anh/logo_transparent.png'
}

function addAndClose() {
  addItem(props.product, qty.value)
  justAdded.value = true
  setTimeout(() => { justAdded.value = false }, 2000)
}

function addAndGoCart() {
  addItem(props.product, qty.value)
}

function getDesc(product) {
  const descs = {
    'ca-canh':      `${product.name} là loài cá cảnh được yêu thích với màu sắc rực rỡ, phù hợp cho bể thủy sinh. Dễ nuôi, thích nghi tốt với môi trường nước Việt Nam. Cam kết cá khỏe mạnh, sạch bệnh.`,
    'tep-canh':     `${product.name} là tép cảnh cao cấp với màu sắc đặc trưng, lý tưởng cho bể thủy sinh. Tép giúp ăn rêu hại tự nhiên, thân thiện với cá nhỏ.`,
    'cay-thuy-sinh':`${product.name} là cây thủy sinh dễ trồng, phù hợp nhiều điều kiện ánh sáng. Giúp oxy hóa nước tự nhiên, tạo cảnh quan đẹp cho bể.`,
    'den-thuy-sinh':`${product.name} cung cấp ánh sáng chất lượng cao cho bể thủy sinh, phổ ánh sáng tối ưu cho cây và màu sắc cá.`,
    'may-loc':      `${product.name} đảm bảo nước bể luôn trong sạch, lưu lượng lọc phù hợp, vận hành êm ái.`,
    'phan-nen':     `${product.name} cung cấp dưỡng chất cần thiết cho cây thủy sinh phát triển khỏe mạnh.`,
    'thuc-an':      `${product.name} là thức ăn chất lượng cao, đầy đủ dinh dưỡng giúp cá tép phát triển khỏe mạnh, màu sắc tươi sáng.`,
    'thuoc-ve-sinh':`${product.name} giúp duy trì chất lượng nước, phòng ngừa và điều trị bệnh hiệu quả cho cá và tép.`,
  }
  return descs[product.cat] || `${product.name} – sản phẩm chất lượng cao từ Minh Aquarium.`
}

function getCareTags(product) {
  const tags = {
    'ca-canh':      [{ icon: 'fa-solid fa-temperature-half', label: '24–28°C' }, { icon: 'fa-solid fa-flask', label: 'pH 6.5–7.5' }, { icon: 'fa-solid fa-fish', label: 'Dễ nuôi' }],
    'tep-canh':     [{ icon: 'fa-solid fa-temperature-half', label: '22–26°C' }, { icon: 'fa-solid fa-flask', label: 'pH 6.0–7.0' }, { icon: 'fa-solid fa-droplet', label: 'GH 4–6' }],
    'cay-thuy-sinh':[{ icon: 'fa-solid fa-lightbulb', label: 'Ánh sáng vừa' }, { icon: 'fa-solid fa-seedling', label: 'CO₂ không cần' }, { icon: 'fa-solid fa-gauge', label: 'Dễ trồng' }],
    'den-thuy-sinh':[{ icon: 'fa-solid fa-plug', label: 'LED' }, { icon: 'fa-solid fa-shield-halved', label: 'Bảo hành 12T' }],
    'may-loc':      [{ icon: 'fa-solid fa-shield-halved', label: 'Bảo hành 12T' }, { icon: 'fa-solid fa-volume-low', label: 'Êm ái' }],
  }
  return tags[product.cat] || []
}

const guarantees = [
  { icon: 'fa-solid fa-shield-halved', color: '#1a6b45', label: 'Bảo hành sinh vật 7 ngày' },
  { icon: 'fa-solid fa-truck-fast',    color: '#2563eb', label: 'Giao hàng toàn quốc' },
  { icon: 'fa-solid fa-rotate-left',   color: '#f59e0b', label: 'Đổi trả trong 24h' },
]
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  z-index: 9500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-box {
  background: white;
  border-radius: var(--r-xl);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 32px 80px rgba(0,0,0,0.22);
}
.modal-box::-webkit-scrollbar { width: 5px; }
.modal-box::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

.modal-close {
  position: absolute;
  top: 14px; right: 14px;
  z-index: 10;
  width: 36px; height: 36px;
  background: var(--bg);
  border: 1px solid var(--border-light);
  border-radius: 50%;
  font-size: 16px;
  color: var(--text-muted);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--t-fast);
}
.modal-close:hover { background: var(--accent-light); color: var(--accent); border-color: var(--accent); }

/* Inner layout */
.modal-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 460px;
}

/* Image */
.modal-img-wrap {
  position: relative;
  background: var(--bg-section);
  border-radius: var(--r-xl) 0 0 0;
  overflow: hidden;
}
.modal-img-wrap img {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
}
.modal-badges { position: absolute; top: 14px; left: 14px; z-index: 2; }
.wish-btn {
  position: absolute;
  top: 14px; right: 14px;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  font-size: 16px;
  color: var(--text-muted);
  transition: all var(--t-fast);
  display: flex; align-items: center; justify-content: center;
}
.wish-btn:hover, .wish-btn.active { color: var(--accent); transform: scale(1.1); }
.wish-btn.active { background: var(--accent-light); }

/* Info */
.modal-info { padding: 32px 28px; display: flex; flex-direction: column; gap: 14px; }
.modal-cat { font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.7px; }
.modal-name { font-size: 22px; font-weight: 800; color: var(--text-heading); line-height: 1.3; }

.modal-price-row { display: flex; align-items: baseline; gap: 6px; }
.modal-price { font-size: 26px; font-weight: 900; color: var(--accent); }
.modal-unit { font-size: 13px; color: var(--text-muted); }

.stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  color: #16a34a;
  background: #f0fff4;
  border: 1px solid #bbf7d0;
  border-radius: var(--r-full);
  padding: 4px 12px;
  width: fit-content;
}
.stock-dot { width: 8px; height: 8px; background: #16a34a; border-radius: 50%; animation: pulse 2s infinite; }

.modal-desc { font-size: 13.5px; color: var(--text-muted); line-height: 1.7; }

/* Care tags */
.care-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.care-tag {
  display: flex; align-items: center; gap: 5px;
  background: var(--bg-section);
  border: 1px solid var(--border);
  border-radius: var(--r-full);
  padding: 4px 10px;
  font-size: 12px; font-weight: 600; color: var(--text-body);
}
.care-tag i { color: var(--primary); font-size: 11px; }

/* Quantity */
.qty-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.qty-label { font-size: 13px; font-weight: 700; color: var(--text-body); }
.qty-ctrl {
  display: flex;
  border: 1.5px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}
.qty-ctrl button {
  width: 34px; height: 36px;
  background: var(--bg);
  border: none;
  font-size: 12px;
  color: var(--text-body);
  transition: background var(--t-fast);
}
.qty-ctrl button:hover:not(:disabled) { background: var(--primary-light); color: var(--primary); }
.qty-ctrl button:disabled { opacity: 0.4; cursor: not-allowed; }
.qty-ctrl input {
  width: 44px; height: 36px;
  border: none;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  text-align: center;
  font-size: 15px; font-weight: 700;
  color: var(--text-heading);
  outline: none;
}
.qty-ctrl input::-webkit-outer-spin-button,
.qty-ctrl input::-webkit-inner-spin-button { -webkit-appearance: none; }
.qty-total { font-size: 15px; font-weight: 800; color: var(--primary); }

/* Actions */
.modal-actions { display: flex; gap: 10px; }
.flex-1 { flex: 1; }

/* Added bar */
.added-bar {
  background: var(--primary-light);
  border: 1px solid var(--primary);
  border-radius: var(--r-md);
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 8px;
}
.added-bar i { color: var(--primary); }

/* Guarantees */
.guarantees {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  padding-top: 6px;
  border-top: 1px solid var(--border-light);
}
.guarantee {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}
.guarantee i { font-size: 14px; }

/* Related */
.related-section {
  padding: 24px 28px;
  border-top: 1px solid var(--border-light);
  background: var(--bg-section);
  border-radius: 0 0 var(--r-xl) var(--r-xl);
}
.related-title { font-size: 15px; font-weight: 800; color: var(--text-heading); margin-bottom: 14px; }
.related-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}
.related-card {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--r-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--t-fast);
}
.related-card:hover { box-shadow: var(--shadow-sm); transform: translateY(-2px); }
.related-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
.related-info { padding: 6px 8px; }
.related-name { font-size: 11px; font-weight: 600; color: var(--text-heading); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.related-price { font-size: 11px; font-weight: 800; color: var(--accent); margin-top: 2px; }

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-slide-enter-active { animation: slideUp 0.3s cubic-bezier(0.25,1,0.5,1); }
.modal-slide-leave-active { animation: slideDown 0.2s ease; }
@keyframes slideUp { from { opacity: 0; transform: scale(0.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes slideDown { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.96); } }

.pop-enter-active { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-leave-active { animation: popOut 0.2s ease; }
@keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
@keyframes popOut { to { opacity: 0; } }

@media (max-width: 768px) {
  .modal-inner { grid-template-columns: 1fr; }
  .modal-img-wrap { border-radius: var(--r-xl) var(--r-xl) 0 0; min-height: 220px; }
  .modal-img-wrap img { min-height: 220px; }
  .modal-info { padding: 20px 18px; }
  .related-grid { grid-template-columns: repeat(3, 1fr); }
  .modal-actions { flex-direction: column; }
}
</style>
