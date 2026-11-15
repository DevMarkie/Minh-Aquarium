# 🧰 Minh Aquarium Tools (Maintenance & Development Tooling)

Thư mục này chứa các công cụ hỗ trợ phát triển, bảo trì danh mục sản phẩm, xử lý ảnh và tiện ích dòng lệnh, được phân chia theo module chức năng:

---

## 📁 1. Catalog & Content Maintenance (`tools/catalog/`)
Các script Python quản lý và làm giàu dữ liệu sản phẩm trong `src/products.html`:

- **`add_equipment_products.py`**: Quét thư mục ảnh thiết bị/phân nền/cây thủy sinh và sinh HTML thẻ sản phẩm tương ứng.
- **`add_lights.py`**: Quét ảnh các dòng đèn thủy sinh và bổ sung thẻ sản phẩm cùng danh mục "Đèn Chiếu Sáng" vào thanh sidebar.
- **`build_products.py`**: Khởi tạo khối thẻ sản phẩm đồng nhất cho cá và tép cảnh.
- **`cache_buster_all.py`**: Gắn tham số version vào thẻ `<script>` trong các tệp HTML để ép trình duyệt tải phiên bản mới nhất.
- **`fix_encoding.py`**: Quét và sửa các lỗi mã hóa ký tự CP1252/UTF-8 tiếng Việt.
- **`update_prices.py`**: Cập nhật giá bán lẻ chuẩn theo bảng giá thị trường Việt Nam.
- **`update_sidebar.py`**: Đồng bộ số lượng hiển thị trong ngoặc đơn trên thanh danh mục bên trái.
- **`update_sidebar_links.py`**: Cập nhật các liên kết lọc query (`products.html?q=...`) cho danh mục.

---

## 📁 2. Image Processing Utilities (`tools/images/`)
Các script Python tự động hóa xử lý ảnh:

- **`fix_logo_path.py`**: Chuẩn hóa các đường dẫn `src="logo_transparent.png"` thành `./assets/images/logo_transparent.png` trong tất cả file HTML.
- **`remove_bg.py`**: Tách nền ảnh đơn lẻ sang định dạng PNG trong suốt qua thư viện `rembg`.
- **`remove_bg_batch.py`**: Tách nền hàng loạt ảnh banner và sản phẩm.
- **`split_image.py`**: Cắt ghép ảnh banner lớn thành 3 khối ảnh đều nhau.
- **`split_image_hori.py`**: Cắt ảnh banner lớn thành 3 lát cắt ngang.

---

## 📁 3. Interactive CLI Assistant (`tools/chatbot/`)
- **`chatbot.py`**: Trợ lý tư vấn sản phẩm và kỹ thuật thủy sinh dòng lệnh.
  - Chạy nhanh qua: `npm run chatbot:cli "câu hỏi"`
