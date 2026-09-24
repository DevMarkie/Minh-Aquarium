<template>
  <div class="product-card" @click="$emit('click', product)">
    <!-- Badges -->
    <div class="card-badges">
      <span v-if="product.featured" class="badge badge-hot">HOT</span>
    </div>

    <!-- Wishlist -->
    <button class="wishlist-btn" @click.stop="toggleWish" :class="{ active: wished }">
      <i :class="wished ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
    </button>

    <!-- Image -->
    <div class="card-img-wrap">
      <img
        :src="product.img"
        :alt="product.name"
        loading="lazy"
        @error="onImgError"
      />
      <div class="card-overlay">
        <button class="btn-quick-add btn btn-primary btn-sm" @click.stop="addToCartClick">
          <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="card-info">
      <p class="card-cat">{{ product.catLabel }}</p>
      <h3 class="card-name">{{ product.name }}</h3>
      <div class="card-price-row">
        <span class="card-price">{{ formatPrice(product.price) }}</span>
      </div>
      <button class="btn-add btn btn-accent btn-sm btn-full" @click.stop="addToCartClick">
        <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
      </button>
    </div>

    <!-- Added feedback -->
    <Transition name="pop">
      <div v-if="justAdded" class="added-toast">
        <i class="fa-solid fa-check"></i> Đã thêm!
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '@/composables/useCart'
import { formatPrice } from '@/data/products'

const props = defineProps({ product: { type: Object, required: true } })
const emit = defineEmits(['click'])

const { addItem } = useCart()
const wished = ref(false)
const justAdded = ref(false)

function toggleWish() { wished.value = !wished.value }

function addToCartClick() {
  addItem(props.product, 1)
  justAdded.value = true
  setTimeout(() => { justAdded.value = false }, 1500)
}

function onImgError(e) {
  e.target.src = '/images/anh/logo_transparent.png'
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: var(--r-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: box-shadow var(--t-mid), transform var(--t-mid);
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

/* Badges */
.card-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Wishlist */
.wishlist-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(4px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--text-muted);
  transition: all var(--t-fast);
}
.wishlist-btn:hover, .wishlist-btn.active { color: var(--accent); transform: scale(1.1); }
.wishlist-btn.active { background: var(--accent-light); }

/* Image */
.card-img-wrap {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--bg);
  position: relative;
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .card-img-wrap img { transform: scale(1.07); }

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 14px;
  opacity: 0;
  transition: opacity var(--t-mid);
}
.product-card:hover .card-overlay { opacity: 1; }
.btn-quick-add {
  width: 100%;
  backdrop-filter: blur(4px);
}

/* Info */
.card-info {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-cat {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--primary);
  margin-bottom: 4px;
}
.card-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
  margin-bottom: 10px;
  flex: 1;
}
.card-price-row { margin-bottom: 10px; }
.card-price {
  font-size: 17px;
  font-weight: 800;
  color: var(--accent);
}

.btn-add {
  gap: 6px;
}

/* Added toast */
.added-toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: var(--r-full);
  font-size: 13px;
  font-weight: 700;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Pop transition */
.pop-enter-active { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-leave-active { animation: popOut 0.25s ease; }
@keyframes popIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@keyframes popOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
</style>
