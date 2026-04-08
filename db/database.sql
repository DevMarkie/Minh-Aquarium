
CREATE DATABASE IF NOT EXISTS minh_aquarium CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE minh_aquarium;

-- 1. BẢNG NGƯỜI DÙNG (USERS)
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20),
    `address` TEXT,
    `role` ENUM('customer', 'staff', 'admin') DEFAULT 'customer',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG DANH MỤC (CATEGORIES)
CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `parent_id` INT NULL,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT,
    `image_url` VARCHAR(255),
    `sort_order` INT DEFAULT 0,
    FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
);

-- 3. BẢNG SẢN PHẨM (PRODUCTS)
CREATE TABLE `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL,
    `sale_price` DECIMAL(10,2),
    `stock_quantity` INT DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `is_featured` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
);

-- 4. BẢNG ẢNH SẢN PHẨM (PRODUCT_IMAGES)
CREATE TABLE `product_images` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN DEFAULT FALSE,
    `sort_order` INT DEFAULT 0,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
);

-- 5. BẢNG THÔNG SỐ SẢN PHẨM (PRODUCT_SPECS) - Cho phép lưu thông số nước rải rác
CREATE TABLE `product_specs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `spec_key` VARCHAR(100) NOT NULL,    -- Ví dụ: 'Nhiệt độ', 'pH'
    `spec_value` VARCHAR(255) NOT NULL,  -- Ví dụ: '22-26 độ C', '6.0-7.5'
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
);

-- 6. BẢNG ĐÁNH GIÁ (REVIEWS)
CREATE TABLE `reviews` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `rating` INT CHECK (`rating` BETWEEN 1 AND 5),
    `comment` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 7. BẢNG GIỎ HÀNG (CARTS)
CREATE TABLE `carts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL UNIQUE,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 8. CHI TIẾT GIỎ HÀNG (CART_ITEMS)
CREATE TABLE `cart_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cart_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
);

-- 9. BẢNG ĐƠN HÀNG (ORDERS)
CREATE TABLE `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `order_code` VARCHAR(50) UNIQUE NOT NULL,
    `subtotal` DECIMAL(12,2) NOT NULL,
    `shipping_fee` DECIMAL(12,2) DEFAULT 0,
    `total_amount` DECIMAL(12,2) NOT NULL,
    `recipient_name` VARCHAR(255) NOT NULL,
    `recipient_phone` VARCHAR(20) NOT NULL,
    `shipping_address` TEXT NOT NULL,
    `payment_method` ENUM('cod', 'bank_transfer') NOT NULL,
    `payment_status` ENUM('pending', 'paid') DEFAULT 'pending',
    `order_status` ENUM('pending', 'confirmed', 'shipping', 'completed', 'cancelled') DEFAULT 'pending',
    `is_express_ship` BOOLEAN DEFAULT FALSE, -- Cờ xác nhận ship hoả tốc cho cá sống
    `note` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

-- 10. CHI TIẾT ĐƠN HÀNG (ORDER_ITEMS)
CREATE TABLE `order_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `product_id` INT,
    `quantity` INT NOT NULL,
    `unit_price` DECIMAL(10,2) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL, -- Lưu trữ tên SP tại thời điểm mua phòng trường hợp SP gốc bị đổi tên/xóa
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
);

-- 11. BẢNG YÊU CẦU SETUP BỂ (SETUP_REQUESTS)
CREATE TABLE `setup_requests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255),
    `tank_size` VARCHAR(100),
    `tank_style` ENUM('natural', 'dutch', 'iwagumi', 'biotope', 'other'),
    `description` TEXT,
    `image_url` VARCHAR(255),
    `status` ENUM('new', 'consulting', 'quoted', 'completed', 'cancelled') DEFAULT 'new',
    `admin_note` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- 12. BẢNG DANH MỤC BLOG (BLOG_CATEGORIES)
CREATE TABLE `blog_categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL
);

-- 13. BẢNG BÀI VIẾT (BLOG_POSTS)
CREATE TABLE `blog_posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `blog_category_id` INT NOT NULL,
    `author_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL,
    `content` TEXT NOT NULL,
    `thumbnail_url` VARCHAR(255),
    `is_published` BOOLEAN DEFAULT FALSE,
    `published_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`blog_category_id`) REFERENCES `blog_categories`(`id`),
    FOREIGN KEY (`author_id`) REFERENCES `users`(`id`)
);

-- 14. BẢNG PHIÊN CHAT (CHAT_SESSIONS)
CREATE TABLE `chat_sessions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NULL, -- Khách vãng lai cũng có thể chat nên có thể null, hoặc ràng buộc tuỳ logic
    `staff_id` INT NULL, -- Tham chiếu tới admin/staff đang phụ trách
    `status` ENUM('open', 'closed') DEFAULT 'open',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`)
);

-- 15. BẢNG TIN NHẮN (CHAT_MESSAGES)
CREATE TABLE `chat_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `session_id` INT NOT NULL,
    `sender_id` INT NULL, -- ID của người gửi (nếu null có thể hiểu là bot hoặc system)
    `content` TEXT NOT NULL,
    `is_read` BOOLEAN DEFAULT FALSE,
    `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
