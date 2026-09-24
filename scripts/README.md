# 🛠️ Minh Aquarium Scripts

Thư mục chứa các script hỗ trợ phát triển, bảo trì dữ liệu sản phẩm, xử lý hình ảnh và kiểm thử.

## 📌 Danh Sách Scripts

### 1. Dữ Liệu & Kiểm Thử
- **`seed_database_from_products.js`**: Tự động parse sản phẩm từ file HTML (`src/products.html`) và nạp vào cơ sở dữ liệu MySQL (bảng `categories` và `products`).
  - Chạy bằng: `npm run seed:db`
- **`run_playwright.js`**: Wrapper chạy Playwright E2E tests với cấu hình môi trường chuẩn.
  - Chạy bằng: `npm run test:e2e`

### 2. Cập Nhật Sản Phẩm & Nội Dung (Python)
- **`add_equipment_products.py`**: Bổ sung các thiết bị máy lọc, phụ kiện hồ cá vào catalog HTML.
- **`add_lights.py`**: Bổ sung các dòng đèn LED thủy sinh chuyên dụng (Chihiros, Netlea, Flat...).
- **`build_products.py`**: Tạo các khối product card HTML đồng nhất.
- **`update_prices.py`**: Đồng bộ và định dạng lại giá bán hiển thị trên giao diện.
- **`update_sidebar.py` & `update_sidebar_links.py`**: Cập nhật thanh danh mục và liên kết bộ lọc bên trái.
- **`fix_encoding.py`**: Xử lý và chuẩn hóa mã hóa ký tự tiếng Việt UTF-8.
- **`fix_logo_path.py`**: Chuẩn hóa đường dẫn tương đối tới logo trên toàn bộ các trang.
- **`cache_buster_all.py`**: Gắn hash / version vào đường dẫn CSS/JS để chống cache trình duyệt khi cập nhật.

### 3. Xử Lý Hình Ảnh (Python)
- **`remove_bg.py` & `remove_bg_batch.py`**: Tách nền ảnh sản phẩm sang dạng trong suốt (PNG).
- **`split_image.py` & `split_image_hori.py`**: Cắt ghép các ảnh banner trang chủ theo tỷ lệ mong muốn.
