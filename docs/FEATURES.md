# Danh Sách Chức Năng Dự Án Minh Aquarium

Tài liệu mô tả chi tiết chức năng hệ thống thương mại điện tử và dịch vụ thủy sinh **Minh Aquarium**.

---

## I. Giao Diện Người Dùng (Customer Frontend)

### 1. Trang Chủ (Home Page)
- **Header:** Menu điều hướng trực quan, thanh tìm kiếm sản phẩm nhanh, widget giỏ hàng real-time, nút Đăng nhập / Đăng ký.
- **Hero & Banner:** Giới thiệu thương hiệu cửa hàng, dịch vụ setup hồ chuyên nghiệp, các bộ sưu tập sản phẩm nổi bật.
- **Nội dung chính:**
  - Danh mục sản phẩm nổi bật (Sinh vật cảnh, Thiết bị lọc, Đèn, Cây thủy sinh).
  - Sản phẩm khuyến mãi / Flash Sale hấp dẫn.
  - Tư vấn kiến thức thủy sinh cơ bản.
- **Footer:** Thông tin liên hệ (Địa chỉ, Hotline, Zalo, Fanpage), bản đồ, chính sách vận chuyển sinh vật sống và chế độ bảo hành.

### 2. Danh Mục Sản Phẩm (Catalog & Filters)
- **Cá & Tép cảnh:** Bộ lọc phân loại chi tiết theo dòng cá (Betta, Neon, Cá đàn, Cá dọn bể...) và dòng tép (Tép màu, tép Sulawesi, tép ong...).
- **Thiết bị & Phụ kiện:** Phân loại chuyên sâu:
  - Máy lọc và vật liệu lọc (Lọc thác, lọc thùng, matrix, sứ lọc...).
  - Đèn thủy sinh (Chihiros, Netlea, Flat Nano...).
  - Máy sục oxy, hệ thống bình CO2.
  - Phân nền, cốt nền, cát trải nền.
  - Đá, lũa cảnh tự nhiên.
  - Thức ăn cho cá/tép và thuốc vi sinh/chế phẩm dưỡng nước.
- **Cây thủy sinh:** Ráy, tiêu thảo, rêu, dương xỉ, cây cắt cắm.
- **Bộ lọc & Tìm kiếm:** Lọc theo khoảng giá, danh mục, tình trạng còn hàng và từ khóa tìm kiếm.

### 3. Chi Tiết Sản Phẩm (Product Details)
- **Hình ảnh & Trực quan:** Ảnh sản phẩm độ nét cao, trạng thái kho hàng.
- **Thông số kỹ thuật & Môi trường sống:**
  - Khoảng nhiệt độ nước tối ưu (°C).
  - Độ pH, độ cứng dH phù hợp.
  - Tính tương thích với các dòng sinh vật khác.
- **Tương tác:** Thêm vào giỏ hàng, chọn số lượng, đánh giá và bình luận.

### 4. Giỏ Hàng & Thanh Toán (Cart & Checkout)
- **Quản lý giỏ hàng:** Thêm, xóa sản phẩm, tăng/giảm số lượng real-time, lưu trữ qua LocalStorage.
- **Vận chuyển:** Hỗ trợ tính phí ship, lựa chọn hình thức hỏa tốc an toàn cho sinh vật sống.
- **Thanh toán:** Thuận tiện với COD (nhận hàng thanh toán) hoặc Chuyển khoản ngân hàng.

### 5. Dịch Vụ Setup Bể Thủy Sinh (Custom Aquarium Setup)
- **Form đăng ký tư vấn:** Nhập kích thước hồ dự kiến, phong cách yêu thích (Iwagumi, Hà Lan, Rừng nhiệt đới, Biotope...).
- **Quy trình tiếp nhận:** Lưu trữ thông tin và kết nối nhân viên tư vấn báo giá chi tiết.

### 6. Kiến Thức Thủy Sinh (Blog)
- Các bài viết hướng dẫn chuyên sâu cho người mới bắt đầu.
- Cẩm nang nhận biết và chữa bệnh cho cá cảnh, cách xử lý rêu hại.
- Hướng dẫn bố cục cảnh và chăm sóc cây thủy sinh phát triển khỏe mạnh.

### 7. Tài Khoản Người Dùng (User Profile & Auth)
- Tích hợp Firebase Authentication: Đăng ký, đăng nhập email/mật khẩu, đồng bộ trạng thái đăng nhập tức thì.
- Lịch sử đơn hàng và theo dõi trạng thái giao nhận.

### 8. Trợ Lý AI & Chatbot (AI Assistant)
- Tích hợp Google Gemini AI hỗ trợ tư vấn 24/7 trực tiếp trên website.
- Tự động nhận diện nhu cầu cá cảnh, tép cảnh, đèn, lọc và đưa ra lời khuyên tối ưu.

---

## II. Trang Quản Trị (Admin Dashboard)

1. **Tổng quan (Dashboard Overview):**
   - Thống kê doanh thu, đơn hàng mới, lượt truy cập website.
2. **Quản lý Sản phẩm & Danh mục:**
   - CRUD danh mục và thông số sản phẩm, cập nhật giá và tồn kho.
3. **Quản lý Đơn hàng & Dịch vụ:**
   - Xử lý đơn hàng: Chờ duyệt $\rightarrow$ Đang chuẩn bị $\rightarrow$ Đang giao $\rightarrow$ Hoàn tất.
   - Quản lý danh sách khách hàng đặt lịch dịch vụ setup bể.
4. **Quản lý Khách hàng & Nội dung:**
   - Quản lý tài khoản người dùng, bình luận và bài viết Blog.
