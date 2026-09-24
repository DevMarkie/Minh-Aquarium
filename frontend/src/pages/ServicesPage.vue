<template>
  <div class="services-page">
    <!-- Hero -->
    <section class="svc-hero">
      <div class="container">
        <div class="section-tag" style="background:rgba(255,255,255,0.15); color:white">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Dịch vụ chuyên nghiệp
        </div>
        <h1>Dịch Vụ Setup Bể Thủy Sinh</h1>
        <p>Đội ngũ kỹ thuật viên giàu kinh nghiệm, trang thiết bị hiện đại – chúng tôi biến ý tưởng của bạn thành hiện thực.</p>
        <a href="tel:0123456789" class="btn btn-xl" style="background:white; color:var(--primary)">
          <i class="fa-solid fa-phone"></i> Tư vấn miễn phí ngay
        </a>
      </div>
    </section>

    <!-- Services grid -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom:36px">
          <div class="section-tag"><i class="fa-solid fa-star"></i> Dịch vụ</div>
          <h2 class="section-title">Chúng tôi cung cấp gì?</h2>
        </div>
        <div class="svc-grid">
          <div v-for="svc in services" :key="svc.id" class="svc-card card">
            <div class="svc-icon" :style="{ background: svc.bg }">
              <i :class="`fa-solid ${svc.icon}`" :style="{ color: svc.color }"></i>
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.desc }}</p>
            <div class="svc-price">Từ {{ svc.priceFrom }}</div>
            <a href="tel:0123456789" class="btn btn-outline btn-sm btn-full">Đặt lịch tư vấn</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section" style="background: var(--bg-section)">
      <div class="container">
        <div class="text-center" style="margin-bottom:36px">
          <div class="section-tag"><i class="fa-solid fa-list-ol"></i> Quy trình</div>
          <h2 class="section-title">Quy trình 4 bước đơn giản</h2>
        </div>
        <div class="process-steps">
          <div v-for="(step, i) in steps" :key="i" class="process-step">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-connector" v-if="i < steps.length - 1"></div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="svc-cta">
          <h2>Sẵn sàng có bể thủy sinh mơ ước?</h2>
          <p>Liên hệ ngay hôm nay để được tư vấn miễn phí và báo giá chi tiết.</p>
          <div class="cta-btns">
            <a href="tel:0123456789" class="btn btn-primary btn-xl">
              <i class="fa-solid fa-phone"></i> Gọi: 0123 456 789
            </a>
            <a href="https://zalo.me/0123456789" class="btn btn-outline btn-xl">
              <i class="fa-brands fa-facebook-messenger"></i> Chat Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const services = [
  { id:1, icon:'fa-water', title:'Setup bể cơ bản', desc:'Thiết kế và lắp đặt hệ thống lọc, đèn, phân nền cơ bản. Phù hợp bể 30–60cm.', priceFrom:'800.000đ', bg:'#eaf6f0', color:'#1a6b45' },
  { id:2, icon:'fa-seedling', title:'Setup bể Dutch', desc:'Trồng cây theo phong cách Dutch cổ điển với nhiều màu sắc, tầng lớp rõ ràng.', priceFrom:'1.500.000đ', bg:'#f0fff4', color:'#16a34a' },
  { id:3, icon:'fa-mountain', title:'Setup bể Nature Aquarium', desc:'Phong cách thiên nhiên theo Takashi Amano với đá Iwagumi, cây mịn và cá nhỏ.', priceFrom:'2.000.000đ', bg:'#fffbeb', color:'#f59e0b' },
  { id:4, icon:'fa-fish', title:'Setup bể cá cảnh', desc:'Thiết kế bể tập trung vào không gian bơi lội cho cá, ít cây, dễ bảo dưỡng.', priceFrom:'600.000đ', bg:'#eff6ff', color:'#2563eb' },
  { id:5, icon:'fa-wrench', title:'Bảo trì định kỳ', desc:'Thay nước, vệ sinh kính, cắt tỉa cây, kiểm tra thiết bị theo lịch hàng tháng.', priceFrom:'200.000đ', bg:'#fdf4ff', color:'#9333ea' },
  { id:6, icon:'fa-graduation-cap', title:'Tư vấn & đào tạo', desc:'Hướng dẫn tận tình cho người mới: cách setup, chăm sóc, xử lý sự cố bể.', priceFrom:'Miễn phí', bg:'#fff0ef', color:'#e53935' },
]

const steps = [
  { title: 'Tư vấn & Khảo sát',  desc: 'Chúng tôi lắng nghe yêu cầu, khảo sát không gian và đề xuất phương án phù hợp.' },
  { title: 'Lên ý tưởng thiết kế', desc: 'Phác thảo layout bể, chọn đá, cây, cá và thiết bị theo ngân sách của bạn.' },
  { title: 'Thi công & Setup',    desc: 'Đội kỹ thuật thi công chuyên nghiệp, gọn gàng, đúng hẹn tại địa chỉ của bạn.' },
  { title: 'Bàn giao & Hướng dẫn', desc: 'Hướng dẫn chi tiết cách chăm sóc, bảo hành thiết bị và hỗ trợ 24/7 sau bàn giao.' },
]
</script>

<style scoped>
/* Hero */
.svc-hero {
  background: linear-gradient(135deg, #0a1f14 0%, #1a6b45 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}
.svc-hero h1 { font-size: clamp(28px,4vw,44px); font-weight: 900; margin: 14px 0 16px; }
.svc-hero p { font-size: 16px; color: rgba(255,255,255,0.78); max-width: 560px; margin: 0 auto 28px; line-height: 1.7; }

/* Services grid */
.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.svc-card { padding: 28px 24px; text-align: center; }
.svc-icon {
  width: 60px; height: 60px;
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 26px;
  margin: 0 auto 16px;
}
.svc-card h3 { font-size: 16px; font-weight: 800; margin-bottom: 10px; }
.svc-card p { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin-bottom: 16px; }
.svc-price {
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 16px;
}

/* Process */
.process-steps {
  display: flex;
  gap: 0;
  position: relative;
}
.process-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}
.step-num {
  width: 52px; height: 52px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 16px;
  z-index: 1;
  box-shadow: 0 4px 16px rgba(26,107,69,0.3);
}
.step-connector {
  position: absolute;
  top: 26px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--border);
  z-index: 0;
}
.step-content { padding: 0 12px; }
.step-content h4 { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.step-content p { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* CTA */
.svc-cta {
  background: var(--primary-light);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  padding: 56px 40px;
  text-align: center;
}
.svc-cta h2 { font-size: 28px; font-weight: 800; margin-bottom: 12px; }
.svc-cta p { font-size: 15px; color: var(--text-muted); margin-bottom: 28px; }
.cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

@media (max-width: 768px) {
  .svc-grid { grid-template-columns: 1fr; }
  .process-steps { flex-direction: column; gap: 24px; }
  .step-connector { display: none; }
}
@media (max-width: 1024px) {
  .svc-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
