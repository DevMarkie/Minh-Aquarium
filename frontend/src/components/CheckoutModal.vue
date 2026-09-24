<template>
  <Transition name="modal-fade">
    <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
      <Transition name="modal-slide">
        <div v-if="open" class="checkout-box" role="dialog" aria-modal="true">
          <!-- Step 1: Form -->
          <template v-if="!submitted">
            <div class="checkout-header">
              <h2><i class="fa-solid fa-bag-shopping"></i> Thông tin đặt hàng</h2>
              <button class="close-btn" @click="$emit('close')">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Order summary mini -->
            <div class="order-mini">
              <div class="mini-row" v-for="item in items" :key="item.id">
                <img :src="item.img" :alt="item.name" @error="e => e.target.src='/images/anh/logo_transparent.png'" />
                <span class="mini-name">{{ item.name }}</span>
                <span class="mini-qty">x{{ item.qty }}</span>
                <span class="mini-price">{{ formatPrice(item.price * item.qty) }}</span>
              </div>
              <div class="mini-total">
                <span>Tổng cộng</span>
                <strong>{{ formatPrice(totalPrice) }}</strong>
              </div>
            </div>

            <!-- Form -->
            <form class="checkout-form" @submit.prevent="handleSubmit">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Họ và tên <span class="req">*</span></label>
                  <div class="input-wrap">
                    <i class="fa-regular fa-user"></i>
                    <input
                      v-model="form.name"
                      type="text"
                      class="form-input"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Số điện thoại <span class="req">*</span></label>
                  <div class="input-wrap">
                    <i class="fa-solid fa-phone"></i>
                    <input
                      v-model="form.phone"
                      type="tel"
                      class="form-input"
                      placeholder="09xx xxx xxx"
                      pattern="[0-9]{9,11}"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Địa chỉ giao hàng <span class="req">*</span></label>
                <div class="input-wrap">
                  <i class="fa-solid fa-location-dot"></i>
                  <input
                    v-model="form.address"
                    type="text"
                    class="form-input"
                    placeholder="Số nhà, đường, quận/huyện, tỉnh/thành"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Ghi chú (nếu có)</label>
                <textarea
                  v-model="form.note"
                  class="form-input"
                  placeholder="Giao giờ hành chính, để lại trước cửa..."
                  rows="2"
                ></textarea>
              </div>

              <!-- Payment method -->
              <div class="form-group">
                <label class="form-label">Phương thức thanh toán</label>
                <div class="pay-methods">
                  <label
                    v-for="m in payMethods"
                    :key="m.id"
                    class="pay-option"
                    :class="{ active: form.payment === m.id }"
                  >
                    <input type="radio" v-model="form.payment" :value="m.id" hidden />
                    <i :class="m.icon" :style="{ color: m.color }"></i>
                    <span>{{ m.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Freeship notice -->
              <div class="ship-notice" :class="totalPrice >= 500000 ? 'success' : 'warn'">
                <i :class="totalPrice >= 500000 ? 'fa-solid fa-circle-check' : 'fa-solid fa-truck-fast'"></i>
                <span v-if="totalPrice >= 500000">Bạn được <strong>miễn phí vận chuyển!</strong></span>
                <span v-else>Mua thêm <strong>{{ formatPrice(500000 - totalPrice) }}</strong> để được miễn phí ship</span>
              </div>

              <button type="submit" class="btn btn-primary btn-full btn-lg" :class="{ loading: isLoading }">
                <span v-if="!isLoading">
                  <i class="fa-solid fa-circle-check"></i> Xác nhận đặt hàng
                </span>
                <span v-else>
                  <i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
                </span>
              </button>
            </form>
          </template>

          <!-- Step 2: Success -->
          <template v-else>
            <div class="success-screen">
              <div class="success-icon">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <h2>Đặt hàng thành công! 🎉</h2>
              <p>Cảm ơn bạn đã tin tưởng <strong>Minh Aquarium</strong>!</p>
              <div class="success-info">
                <div><i class="fa-solid fa-user"></i> {{ form.name }}</div>
                <div><i class="fa-solid fa-phone"></i> {{ form.phone }}</div>
                <div><i class="fa-solid fa-location-dot"></i> {{ form.address }}</div>
              </div>
              <p class="success-note">
                Nhân viên sẽ liên hệ xác nhận đơn hàng trong vòng <strong>15 phút</strong>.<br/>
                Mã đơn hàng: <strong class="order-code">#MA{{ orderCode }}</strong>
              </p>
              <div class="success-actions">
                <button class="btn btn-primary btn-lg" @click="finish">
                  <i class="fa-solid fa-house"></i> Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </template>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCart } from '@/composables/useCart'
import { formatPrice } from '@/data/products'
import { useRouter } from 'vue-router'

defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const { items, totalPrice, clearCart } = useCart()
const router = useRouter()

const submitted  = ref(false)
const isLoading  = ref(false)
const orderCode  = ref('')

const form = reactive({
  name: '',
  phone: '',
  address: '',
  note: '',
  payment: 'cod',
})

const payMethods = [
  { id: 'cod',   label: 'Tiền mặt (COD)', icon: 'fa-solid fa-money-bill-wave', color: '#16a34a' },
  { id: 'momo',  label: 'MoMo',           icon: 'fa-solid fa-mobile-screen',   color: '#b91c8d' },
  { id: 'bank',  label: 'Chuyển khoản',   icon: 'fa-solid fa-building-columns', color: '#2563eb' },
]

async function handleSubmit() {
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1500))
  orderCode.value = Math.floor(100000 + Math.random() * 900000).toString()
  submitted.value = true
  isLoading.value = false
  clearCart()
}

function finish() {
  emit('close')
  submitted.value = false
  Object.assign(form, { name: '', phone: '', address: '', note: '', payment: 'cod' })
  router.push('/')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  z-index: 9600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.checkout-box {
  background: white;
  border-radius: var(--r-xl);
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 32px 80px rgba(0,0,0,0.22);
}
.checkout-box::-webkit-scrollbar { width: 5px; }
.checkout-box::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

/* Header */
.checkout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border-light);
}
.checkout-header h2 {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-heading);
  display: flex;
  align-items: center;
  gap: 10px;
}
.checkout-header h2 i { color: var(--primary); }
.close-btn {
  width: 32px; height: 32px;
  background: var(--bg);
  border: 1px solid var(--border-light);
  border-radius: 50%;
  color: var(--text-muted);
  font-size: 15px;
  display: flex; align-items: center; justify-content: center;
  transition: all var(--t-fast);
}
.close-btn:hover { background: var(--accent-light); color: var(--accent); border-color: var(--accent); }

/* Order mini */
.order-mini {
  background: var(--bg-section);
  border-bottom: 1px solid var(--border-light);
  padding: 12px 24px;
  max-height: 160px;
  overflow-y: auto;
}
.mini-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 13px;
}
.mini-row:last-of-type { border-bottom: none; }
.mini-row img { width: 36px; height: 36px; object-fit: cover; border-radius: var(--r-sm); flex-shrink: 0; }
.mini-name { flex: 1; color: var(--text-heading); font-weight: 600; }
.mini-qty { color: var(--text-muted); flex-shrink: 0; }
.mini-price { font-weight: 700; color: var(--accent); flex-shrink: 0; }
.mini-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  font-size: 14px;
  color: var(--text-muted);
}
.mini-total strong { font-size: 17px; font-weight: 900; color: var(--accent); }

/* Form */
.checkout-form { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.req { color: var(--accent); }

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.input-wrap > i:first-child {
  position: absolute;
  left: 13px;
  color: var(--text-muted);
  font-size: 13px;
  pointer-events: none;
}
.input-wrap .form-input { padding-left: 38px; }

/* Payment methods */
.pay-methods { display: flex; gap: 8px; flex-wrap: wrap; }
.pay-option {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--r-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-body);
  cursor: pointer;
  transition: all var(--t-fast);
  background: white;
}
.pay-option:hover { border-color: var(--primary); background: var(--primary-light); }
.pay-option.active { border-color: var(--primary); background: var(--primary-light); color: var(--primary); }

/* Ship notice */
.ship-notice {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 14px;
  border-radius: var(--r-md);
  font-size: 13px;
}
.ship-notice.warn { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }
.ship-notice.warn i { color: #f59e0b; }
.ship-notice.success { background: var(--primary-light); border: 1px solid var(--border); color: var(--primary); }
.ship-notice.success i { color: var(--primary); }

.btn.loading { opacity: 0.8; pointer-events: none; }

/* Success screen */
.success-screen {
  padding: 48px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.success-icon {
  width: 80px; height: 80px;
  background: var(--primary-light);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 36px;
  color: var(--primary);
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.success-screen h2 { font-size: 22px; font-weight: 800; color: var(--text-heading); }
.success-screen > p { font-size: 14px; color: var(--text-muted); }
.success-info {
  background: var(--bg-section);
  border: 1px solid var(--border-light);
  border-radius: var(--r-md);
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  text-align: left;
}
.success-info div {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: var(--text-body);
}
.success-info i { color: var(--primary); width: 16px; flex-shrink: 0; }
.success-note { font-size: 13px; color: var(--text-muted); line-height: 1.7; }
.order-code { color: var(--primary); font-size: 14px; }
.success-actions { margin-top: 8px; }

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-slide-enter-active { animation: slideUp 0.3s cubic-bezier(0.25,1,0.5,1); }
.modal-slide-leave-active { animation: slideDown 0.2s ease; }
@keyframes slideUp { from { opacity: 0; transform: scale(0.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes slideDown { from { opacity: 1; } to { opacity: 0; transform: scale(0.96); } }
@keyframes popIn { from { transform: scale(0.5); } to { transform: scale(1); } }

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .checkout-box { max-height: 95vh; }
}
</style>
