# 🛠️ Minh Aquarium Scripts (Operational & Lifecycle Scripts)

Thư mục này chứa các script vận hành cốt lõi (core operational & lifecycle scripts) phục vụ quá trình khởi chạy, di trú cơ sở dữ liệu, nạp dữ liệu (seed), chạy kiểm thử tự động và đo kiểm hiệu năng hệ thống.

> **Lưu ý cấu trúc**: Các công cụ tiện ích bảo trì danh mục (catalog), xử lý hình ảnh (images) và chatbot thử nghiệm đã được tách riêng sang thư mục `tools/` (`tools/catalog/`, `tools/images/`, `tools/chatbot/`) để đảm bảo phân tách rõ ràng giữa tác vụ vận hành hệ thống và công cụ hỗ trợ phát triển.

---

## 📌 Danh Sách Script Vận Hành (`scripts/`)

| Script | Ngôn ngữ | Lệnh thực thi | Mô tả chức năng |
| :--- | :--- | :--- | :--- |
| **`migrate.js`** | Node.js | `npm run migrate` | Tự động quét và áp dụng tuần tự các tệp migration SQL trong `server/db/migrations/` vào cơ sở dữ liệu MySQL, lưu trữ trạng thái vào bảng `schema_migrations` với cơ chế idempotent (an toàn khi chạy lặp lại). |
| **`seed_database_from_products.js`** | Node.js | `npm run seed:db` | Phân tích cú pháp catalog HTML từ `src/products.html` và trích xuất danh mục, sản phẩm, hình ảnh để nạp đồng bộ vào cơ sở dữ liệu MySQL. |
| **`run_playwright.js`** | Node.js | `npm run test:e2e` | Bộ thực thi Playwright End-to-End browser tests với cấu hình môi trường, tự động khởi tạo web server kiểm thử nếu được yêu cầu (`PLAYWRIGHT_START_WEBSERVER=1`). |
| **`benchmark_runner.js`** | Node.js | `node scripts/benchmark_runner.js` | Đo kiểm hiệu năng và độ trễ các API endpoints bằng Autocannon, thu thập thông số Requests/sec, Latency p99, Throughput và xuất kết quả so sánh. |

---

## 🧰 Tham Chiếu Đến Các Công Cụ Tiện Ích (`tools/`)

Các công cụ tiện ích bảo trì được tổ chức theo module trong thư mục `tools/`:

- **`tools/catalog/`**: Các công cụ quản lý dữ liệu sản phẩm, cập nhật giá, đồng bộ sidebar và chuẩn hóa HTML:
  - `add_equipment_products.py`: Bổ sung sản phẩm thiết bị & lọc vào catalog.
  - `add_lights.py`: Bổ sung sản phẩm đèn chiếu sáng vào catalog.
  - `build_products.py`: Tạo khối card sản phẩm chuẩn hóa.
  - `cache_buster_all.py`: Đánh dấu version cache busting cho asset.
  - `fix_encoding.py`: Khắc phục lỗi mã hóa ký tự UTF-8 tiếng Việt.
  - `update_prices.py`: Cập nhật bảng giá sản phẩm tự động.
  - `update_sidebar.py`: Cập nhật bộ đếm danh mục bên thanh điều hướng.
  - `update_sidebar_links.py`: Cập nhật đường dẫn query lọc sản phẩm.

- **`tools/images/`**: Các công cụ xử lý đồ họa, tách nền và cắt banner:
  - `fix_logo_path.py`: Chuẩn hóa đường dẫn tương đối tới logo trên toàn bộ trang.
  - `remove_bg.py`: Tách phông nền một ảnh sản phẩm đơn lẻ (sử dụng `rembg`).
  - `remove_bg_batch.py`: Tách phông nền hàng loạt ảnh banner.
  - `split_image.py`: Cắt ảnh banner lớn thành 3 phần theo kích thước ngang/dọc.
  - `split_image_hori.py`: Cắt ảnh banner theo 3 lát cắt ngang.

- **`tools/chatbot/`**: Công cụ CLI tương tác trực tiếp với Chatbot:
  - `chatbot.py`: Trợ lý tư vấn khách hàng qua giao diện Terminal (`npm run chatbot:cli`).
