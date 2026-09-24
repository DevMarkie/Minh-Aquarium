<template>
  <div class="blog-page section">
    <div class="container">
      <div class="section-tag"><i class="fa-solid fa-book-open"></i> Blog & Kiến thức</div>
      <h1 class="section-title" style="margin-bottom: 32px">Kiến Thức Thủy Sinh</h1>
      <div class="blog-grid">
        <article v-for="post in posts" :key="post.id" class="blog-card card">
          <div class="blog-img-wrap">
            <img :src="post.img" :alt="post.title" loading="lazy" />
            <span class="blog-cat">{{ post.cat }}</span>
          </div>
          <div class="blog-body">
            <p class="blog-date"><i class="fa-regular fa-calendar"></i> {{ post.date }}</p>
            <h3>{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a href="#" class="read-more">Đọc tiếp <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = [
  { id:1, title:'Cách setup bể thủy sinh Iwagumi cho người mới bắt đầu', cat:'Cây thủy sinh', date:'15/08/2026', excerpt:'Hướng dẫn từng bước để tạo ra bể Iwagumi đẹp từ khâu chọn đá, trồng cây đến cân bằng CO2 và ánh sáng.', img:'/images/anh/banner_part1.png' },
  { id:2, title:'Top 10 loại cá neon phù hợp cho bể thủy sinh nhỏ', cat:'Cá cảnh', date:'12/08/2026', excerpt:'Từ Neon Xanh, Ember Tetra đến Cardinal Tetra – những loài cá tuyệt đẹp không đòi hỏi bể lớn.', img:'/images/anh/banner_part2.png' },
  { id:3, title:'Tép Bee Shrimp – Cách nuôi và sinh sản thành công', cat:'Tép cảnh', date:'08/08/2026', excerpt:'Tép Bee Shrimp rất nhạy cảm với môi trường nước. Bài viết này chia sẻ kinh nghiệm nuôi từ các chuyên gia.', img:'/images/anh/banner_part3.png' },
  { id:4, title:'Cây Ráy – Loại cây thủy sinh dễ trồng nhất cho người mới', cat:'Cây thủy sinh', date:'05/08/2026', excerpt:'Anubias hay Ráy là lựa chọn hoàn hảo: không cần CO2, ánh sáng vừa phải, dễ chăm sóc.', img:'/images/anh/banner_part1.png' },
  { id:5, title:'Chọn đèn thủy sinh đúng cách – PAR, PUR và Kelvin', cat:'Thiết bị', date:'01/08/2026', excerpt:'Đèn thủy sinh không chỉ là ánh sáng, mà còn ảnh hưởng đến màu sắc cá và sự phát triển của cây.', img:'/images/anh/banner_part2.png' },
  { id:6, title:'Bệnh thường gặp ở cá betta và cách điều trị', cat:'Cá cảnh', date:'28/07/2026', excerpt:'Nấm, đốm trắng, bụng phình – nhận biết sớm và điều trị đúng cách để bảo vệ chú cá betta của bạn.', img:'/images/anh/banner_part3.png' },
]
</script>

<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.blog-card { cursor: pointer; }
.blog-card:hover { }

.blog-img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.blog-img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.blog-card:hover .blog-img-wrap img { transform: scale(1.05); }

.blog-cat {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--primary);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--r-full);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blog-body { padding: 18px 20px 22px; }
.blog-date { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.blog-body h3 { font-size: 15.5px; font-weight: 700; color: var(--text-heading); line-height: 1.45; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.blog-excerpt { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.read-more { font-size: 13px; font-weight: 700; color: var(--primary); display: inline-flex; align-items: center; gap: 6px; transition: gap var(--t-fast); }
.read-more:hover { gap: 10px; }

@media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
</style>
