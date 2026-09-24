<template>
  <div class="not-found-page">
    <div class="nf-bg">
      <div class="bubble-wrap">
        <span v-for="i in 10" :key="i" class="bubble" :style="bubbleStyle(i)"></span>
      </div>
    </div>

    <div class="nf-content">
      <!-- Big 404 -->
      <div class="nf-code">
        <span>4</span>
        <span class="fish-num">
          <i class="fa-solid fa-fish"></i>
        </span>
        <span>4</span>
      </div>

      <h1 class="nf-title">Trang không tìm thấy</h1>
      <p class="nf-desc">
        Oops! Con cá này đã bơi đi đâu mất rồi 🐠<br/>
        Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>

      <div class="nf-actions">
        <RouterLink to="/" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-house"></i> Về trang chủ
        </RouterLink>
        <RouterLink to="/products" class="btn btn-outline btn-lg">
          <i class="fa-solid fa-store"></i> Xem sản phẩm
        </RouterLink>
      </div>

      <div class="nf-links">
        <RouterLink to="/blog"><i class="fa-solid fa-book-open"></i> Kiến thức thủy sinh</RouterLink>
        <RouterLink to="/services"><i class="fa-solid fa-wand-magic-sparkles"></i> Dịch vụ setup bể</RouterLink>
        <RouterLink to="/cart"><i class="fa-solid fa-cart-shopping"></i> Giỏ hàng</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
function bubbleStyle(i) {
  const size = (i % 4 + 1) * 14
  return {
    width: size + 'px',
    height: size + 'px',
    left: (i * 10) + '%',
    animationDuration: (6 + i * 0.8) + 's',
    animationDelay: (i * 0.4) + 's',
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1f14 0%, #1a4a2a 60%, #0d3320 100%);
}

/* Background bubbles */
.nf-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.bubble-wrap { position: absolute; inset: 0; }
.bubble {
  position: absolute;
  bottom: -80px;
  background: rgba(255,255,255,0.06);
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  animation: floatUp linear infinite;
}
@keyframes floatUp {
  0%   { transform: translateY(0) scale(0.8); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.5; }
  100% { transform: translateY(-100vh) scale(1.1); opacity: 0; }
}

/* Content */
.nf-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 40px 20px;
  color: white;
}

/* 404 code */
.nf-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: clamp(80px, 16vw, 140px);
  font-weight: 900;
  line-height: 1;
  color: white;
  margin-bottom: 24px;
}
.fish-num {
  font-size: 0.55em;
  color: #4ade80;
  animation: fishSwim 3s ease-in-out infinite;
}
@keyframes fishSwim {
  0%, 100% { transform: translateY(0) rotate(-10deg); }
  50%       { transform: translateY(-12px) rotate(10deg); }
}

.nf-title {
  font-size: clamp(22px, 4vw, 34px);
  font-weight: 800;
  margin-bottom: 14px;
  color: white;
}

.nf-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
}

.nf-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.nf-links {
  display: flex;
  gap: 22px;
  justify-content: center;
  flex-wrap: wrap;
}
.nf-links a {
  color: rgba(255,255,255,0.6);
  font-size: 13.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color var(--t-fast);
}
.nf-links a:hover { color: #4ade80; }
.nf-links a i { font-size: 12px; }
</style>
