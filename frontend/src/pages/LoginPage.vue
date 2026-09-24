<template>
  <div class="login-page section">
    <div class="container">
      <div class="login-card">
        <!-- Left decorative panel -->
        <div class="login-panel">
          <div class="panel-content">
            <img src="/images/anh/logo_transparent.png" alt="Minh Aquarium" class="panel-logo" />
            <h2>Chào mừng trở lại!</h2>
            <p>Đăng nhập để theo dõi đơn hàng, lưu danh sách yêu thích và nhận ưu đãi đặc biệt.</p>
            <div class="panel-features">
              <div class="pf-item"><i class="fa-solid fa-circle-check"></i> Theo dõi đơn hàng realtime</div>
              <div class="pf-item"><i class="fa-solid fa-circle-check"></i> Lưu sản phẩm yêu thích</div>
              <div class="pf-item"><i class="fa-solid fa-circle-check"></i> Nhận ưu đãi thành viên</div>
            </div>
          </div>
        </div>

        <!-- Right form -->
        <div class="login-form-wrap">
          <!-- Tab switch -->
          <div class="tab-switch">
            <button :class="{ active: tab === 'login' }" @click="tab = 'login'">Đăng nhập</button>
            <button :class="{ active: tab === 'register' }" @click="tab = 'register'">Đăng ký</button>
          </div>

          <!-- Login form -->
          <Transition name="fade" mode="out-in">
            <form v-if="tab === 'login'" key="login" class="auth-form" @submit.prevent="handleLogin">
              <div class="form-group">
                <label class="form-label">Email</label>
                <div class="input-wrap">
                  <i class="fa-regular fa-envelope"></i>
                  <input v-model="form.email" type="email" class="form-input" placeholder="your@email.com" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Mật khẩu</label>
                <div class="input-wrap">
                  <i class="fa-solid fa-lock"></i>
                  <input v-model="form.password" :type="showPass ? 'text' : 'password'" class="form-input" placeholder="••••••••" required />
                  <button type="button" class="pass-toggle" @click="showPass = !showPass">
                    <i :class="showPass ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" /> Nhớ đăng nhập
                </label>
                <a href="#" class="forgot-link">Quên mật khẩu?</a>
              </div>
              <button type="submit" class="btn btn-primary btn-full btn-lg" :class="{ loading: isLoading }">
                <span v-if="!isLoading"><i class="fa-solid fa-arrow-right-to-bracket"></i> Đăng nhập</span>
                <span v-else><i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...</span>
              </button>
              <div class="social-login">
                <div class="divider-text">hoặc đăng nhập với</div>
                <div class="social-btns">
                  <button type="button" class="social-btn google">
                    <i class="fa-brands fa-google"></i> Google
                  </button>
                  <button type="button" class="social-btn facebook">
                    <i class="fa-brands fa-facebook-f"></i> Facebook
                  </button>
                </div>
              </div>
            </form>

            <!-- Register form -->
            <form v-else key="register" class="auth-form" @submit.prevent="handleRegister">
              <div class="form-group">
                <label class="form-label">Họ và tên</label>
                <div class="input-wrap">
                  <i class="fa-regular fa-user"></i>
                  <input v-model="form.name" type="text" class="form-input" placeholder="Nguyễn Văn A" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <div class="input-wrap">
                  <i class="fa-regular fa-envelope"></i>
                  <input v-model="form.email" type="email" class="form-input" placeholder="your@email.com" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Số điện thoại</label>
                <div class="input-wrap">
                  <i class="fa-solid fa-phone"></i>
                  <input v-model="form.phone" type="tel" class="form-input" placeholder="09xx xxx xxx" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Mật khẩu</label>
                <div class="input-wrap">
                  <i class="fa-solid fa-lock"></i>
                  <input v-model="form.password" :type="showPass ? 'text' : 'password'" class="form-input" placeholder="Tối thiểu 8 ký tự" required minlength="8" />
                  <button type="button" class="pass-toggle" @click="showPass = !showPass">
                    <i :class="showPass ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                  </button>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-full btn-lg">
                <i class="fa-solid fa-user-plus"></i> Tạo tài khoản
              </button>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tab = ref('login')
const showPass = ref(false)
const isLoading = ref(false)
const form = reactive({ name: '', email: '', phone: '', password: '' })

async function handleLogin() {
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1200))
  isLoading.value = false
  alert('Demo: Đăng nhập thành công! Tích hợp backend để xác thực thật.')
  router.push('/')
}

function handleRegister() {
  alert('Demo: Đăng ký thành công! Tích hợp backend để lưu tài khoản thật.')
  tab.value = 'login'
}
</script>

<style scoped>
.login-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
}
.login-card {
  display: grid;
  grid-template-columns: 400px 1fr;
  max-width: 860px;
  margin: 0 auto;
  background: white;
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
}

/* Left panel */
.login-panel {
  background: linear-gradient(160deg, #0a1f14 0%, #1a6b45 100%);
  padding: 48px 36px;
  display: flex;
  align-items: center;
}
.panel-content { color: white; }
.panel-logo {
  width: 56px; height: 56px;
  object-fit: contain;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  padding: 4px;
  margin-bottom: 24px;
}
.panel-content h2 { font-size: 24px; font-weight: 800; margin-bottom: 12px; }
.panel-content p { font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.7; margin-bottom: 28px; }

.panel-features { display: flex; flex-direction: column; gap: 10px; }
.pf-item { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: rgba(255,255,255,0.85); }
.pf-item i { color: var(--gold); }

/* Right form */
.login-form-wrap { padding: 40px 36px; }

.tab-switch {
  display: flex;
  background: var(--bg);
  border-radius: var(--r-md);
  padding: 4px;
  margin-bottom: 28px;
}
.tab-switch button {
  flex: 1;
  padding: 8px;
  border: none;
  background: none;
  border-radius: var(--r-sm);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  transition: all var(--t-fast);
}
.tab-switch button.active { background: white; color: var(--primary); box-shadow: var(--shadow-xs); }

.auth-form { display: flex; flex-direction: column; gap: 18px; }

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.input-wrap > i:first-child {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
  font-size: 14px;
  z-index: 1;
}
.input-wrap .form-input { padding-left: 40px; }
.pass-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  transition: color var(--t-fast);
}
.pass-toggle:hover { color: var(--primary); }

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox-label { display: flex; align-items: center; gap: 7px; font-size: 13.5px; color: var(--text-muted); cursor: pointer; }
.checkbox-label input { accent-color: var(--primary); }
.forgot-link { font-size: 13px; color: var(--primary); font-weight: 600; transition: opacity var(--t-fast); }
.forgot-link:hover { opacity: 0.75; }

/* Social login */
.social-login { text-align: center; }
.divider-text {
  position: relative;
  font-size: 12.5px;
  color: var(--text-muted);
  margin: 16px 0;
}
.divider-text::before,
.divider-text::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: var(--border);
}
.divider-text::before { left: 0; }
.divider-text::after { right: 0; }

.social-btns { display: flex; gap: 10px; }
.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: var(--r-md);
  font-size: 13.5px;
  font-weight: 600;
  border: 1.5px solid var(--border);
  background: white;
  cursor: pointer;
  transition: all var(--t-fast);
}
.social-btn.google:hover { border-color: #ea4335; color: #ea4335; background: #fff5f4; }
.social-btn.facebook:hover { border-color: #1877f2; color: #1877f2; background: #f0f5ff; }

.btn.loading { opacity: 0.8; cursor: not-allowed; }

@media (max-width: 640px) {
  .login-card { grid-template-columns: 1fr; }
  .login-panel { display: none; }
}
</style>
