<template>
  <!-- Checkout Modal -->
  <CheckoutModal :open="checkoutOpen" @close="checkoutOpen = false" />
  <div class="cart-page section">
    <div class="container">
      <h1 class="page-h1"><i class="fa-solid fa-cart-shopping"></i> Giỏ hàng của bạn</h1>

      <!-- Empty -->
      <div v-if="items.length === 0" class="empty-cart">
        <div class="empty-icon"><i class="fa-solid fa-bag-shopping"></i></div>
        <h2>Giỏ hàng trống</h2>
        <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <RouterLink to="/products" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-store"></i> Tiếp tục mua sắm
        </RouterLink>
      </div>

      <!-- Cart content -->
      <div v-else class="cart-layout">
        <!-- Items -->
        <div class="cart-items">
          <div class="cart-item" v-for="item in items" :key="item.id">
            <img :src="item.img" :alt="item.name" class="item-img" @error="e => e.target.src='/images/anh/logo_transparent.png'" />
            <div class="item-info">
              <p class="item-cat">{{ item.catLabel }}</p>
              <h4 class="item-name">{{ item.name }}</h4>
              <p class="item-unit-price">{{ formatPrice(item.price) }} / con</p>
            </div>
            <div class="item-qty">
              <button @click="updateQty(item.id, item.qty - 1)" :disabled="item.qty <= 1">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                :value="item.qty"
                min="1"
                @change="updateQty(item.id, +$event.target.value)"
              />
              <button @click="updateQty(item.id, item.qty + 1)">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div class="item-subtotal">{{ formatPrice(item.price * item.qty) }}</div>
            <button class="item-remove" @click="removeItem(item.id)" title="Xóa">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        <!-- Summary -->
        <div class="cart-summary">
          <h3>Tóm tắt đơn hàng</h3>

          <div class="summary-rows">
            <div class="summary-row">
              <span>Tạm tính ({{ totalCount }} sản phẩm)</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
            <div class="summary-row">
              <span>Phí vận chuyển</span>
              <span class="free-ship">{{ totalPrice >= 500000 ? 'Miễn phí' : 'Tính khi đặt hàng' }}</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row total">
              <span>Tổng cộng</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
          </div>

          <p v-if="totalPrice < 500000" class="free-ship-hint">
            <i class="fa-solid fa-truck-fast"></i>
            Mua thêm <strong>{{ formatPrice(500000 - totalPrice) }}</strong> để được miễn phí ship!
          </p>
          <p v-else class="free-ship-hint success">
            <i class="fa-solid fa-circle-check"></i>
            Bạn được <strong>miễn phí vận chuyển!</strong>
          </p>

          <button class="btn btn-accent btn-full btn-lg" @click="checkoutOpen = true">
            <i class="fa-solid fa-credit-card"></i> Đặt hàng ngay
          </button>
          <RouterLink to="/products" class="btn btn-outline btn-full mt-8">
            <i class="fa-solid fa-arrow-left"></i> Tiếp tục mua sắm
          </RouterLink>

          <button class="btn-clear" @click="clearCart">
            <i class="fa-solid fa-trash"></i> Xóa toàn bộ giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '@/composables/useCart'
import { formatPrice } from '@/data/products'
import CheckoutModal from '@/components/CheckoutModal.vue'

const { items, totalCount, totalPrice, removeItem, updateQty, clearCart } = useCart()
const checkoutOpen = ref(false)
</script>

<style scoped>
.page-h1 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.page-h1 i { color: var(--primary); }

/* Empty */
.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: var(--r-xl);
  border: 1px solid var(--border-light);
}
.empty-icon { font-size: 72px; color: var(--border); margin-bottom: 20px; }
.empty-cart h2 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
.empty-cart p { color: var(--text-muted); margin-bottom: 24px; }

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

/* Items */
.cart-items {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--r-xl);
  overflow: hidden;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-light);
  transition: background var(--t-fast);
}
.cart-item:last-child { border-bottom: none; }
.cart-item:hover { background: var(--bg-section); }

.item-img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: var(--r-md);
  flex-shrink: 0;
  border: 1px solid var(--border-light);
}
.item-info { flex: 1; min-width: 0; }
.item-cat { font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
.item-name { font-size: 14px; font-weight: 700; color: var(--text-heading); margin-bottom: 4px; }
.item-unit-price { font-size: 12px; color: var(--text-muted); }

/* Qty controls */
.item-qty {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}
.item-qty button {
  width: 32px; height: 32px;
  background: var(--bg);
  border: none;
  font-size: 12px;
  color: var(--text-body);
  transition: background var(--t-fast);
}
.item-qty button:hover:not(:disabled) { background: var(--primary-light); color: var(--primary); }
.item-qty button:disabled { opacity: 0.4; cursor: not-allowed; }
.item-qty input {
  width: 42px;
  height: 32px;
  text-align: center;
  border: none;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
  background: white;
  outline: none;
}
.item-qty input::-webkit-outer-spin-button,
.item-qty input::-webkit-inner-spin-button { -webkit-appearance: none; }

.item-subtotal {
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
  min-width: 90px;
  text-align: right;
  flex-shrink: 0;
}

.item-remove {
  width: 34px; height: 34px;
  background: none;
  border: 1px solid var(--border-light);
  border-radius: var(--r-md);
  color: var(--text-muted);
  font-size: 14px;
  transition: all var(--t-fast);
  flex-shrink: 0;
}
.item-remove:hover { background: var(--accent-light); border-color: var(--accent); color: var(--accent); }

/* Summary */
.cart-summary {
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--r-xl);
  padding: 24px;
  position: sticky;
  top: 120px;
}
.cart-summary h3 { font-size: 16px; font-weight: 800; margin-bottom: 20px; }

.summary-rows { display: flex; flex-direction: column; gap: 12px; }
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-muted);
}
.summary-row.total {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-heading);
  padding-top: 4px;
}
.free-ship { color: var(--primary); font-weight: 600; }
.summary-divider { height: 1px; background: var(--border-light); margin: 4px 0; }

.free-ship-hint {
  background: var(--bg-section);
  border: 1px solid var(--border-light);
  border-radius: var(--r-md);
  padding: 10px 14px;
  font-size: 13px;
  color: var(--text-muted);
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.free-ship-hint i { color: var(--accent); }
.free-ship-hint.success { background: var(--primary-light); border-color: var(--primary); }
.free-ship-hint.success i { color: var(--primary); }

.mt-8 { margin-top: 10px; }

.btn-clear {
  width: 100%;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 12.5px;
  margin-top: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: color var(--t-fast);
}
.btn-clear:hover { color: var(--accent); }

@media (max-width: 768px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
  .item-subtotal { display: none; }
}
</style>
