-- database.sql - Minh Aquarium Database Schema
-- MySQL 8.0 Compatible with UTF-8 4-byte encoding, relational integrity & performance indexing

CREATE DATABASE IF NOT EXISTS minh_aquarium CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE minh_aquarium;

-- 1. BẢNG NGƯỜI DÙNG (USERS)
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `firebase_uid` VARCHAR(128) UNIQUE NULL,
    `phone` VARCHAR(20),
    `address` TEXT,
    `role` ENUM('customer', 'staff', 'admin') DEFAULT 'customer',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG DANH MỤC (CATEGORIES)
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `parent_id` INT NULL,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL,
    `description` TEXT,
    `image_url` VARCHAR(255),
    `sort_order` INT DEFAULT 0,
    FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL,
    INDEX `idx_categories_parent` (`parent_id`, `sort_order`)
);

-- 3. BẢNG SẢN PHẨM (PRODUCTS)
CREATE TABLE IF NOT EXISTS `products` (
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
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL,
    INDEX `idx_products_active_featured` (`is_active`, `is_featured`, `stock_quantity`),
    INDEX `idx_products_cat_active` (`category_id`, `is_active`),
    FULLTEXT INDEX `ft_products_search` (`name`, `description`),
    CONSTRAINT `chk_products_price` CHECK (`price` >= 0),
    CONSTRAINT `chk_products_stock` CHECK (`stock_quantity` >= 0)
);

-- 4. BẢNG ẢNH SẢN PHẨM (PRODUCT_IMAGES)
CREATE TABLE IF NOT EXISTS `product_images` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN DEFAULT FALSE,
    `sort_order` INT DEFAULT 0,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
    INDEX `idx_product_images_primary` (`product_id`, `is_primary`)
);

-- 5. BẢNG THÔNG SỐ SẢN PHẨM (PRODUCT_SPECS)
CREATE TABLE IF NOT EXISTS `product_specs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `spec_key` VARCHAR(100) NOT NULL,
    `spec_value` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
);

-- 6. BẢNG ĐÁNH GIÁ (REVIEWS)
CREATE TABLE IF NOT EXISTS `reviews` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `rating` INT CHECK (`rating` BETWEEN 1 AND 5),
    `comment` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_reviews_product_created` (`product_id`, `created_at` DESC)
);

-- 7. BẢNG GIỎ HÀNG (CARTS)
CREATE TABLE IF NOT EXISTS `carts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL UNIQUE,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- 8. CHI TIẾT GIỎ HÀNG (CART_ITEMS)
CREATE TABLE IF NOT EXISTS `cart_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cart_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `uq_cart_product` (`cart_id`, `product_id`),
    CONSTRAINT `chk_cart_items_quantity` CHECK (`quantity` > 0)
);

-- 9. BẢNG ĐƠN HÀNG (ORDERS)
CREATE TABLE IF NOT EXISTS `orders` (
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
    `is_express_ship` BOOLEAN DEFAULT FALSE,
    `note` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    INDEX `idx_orders_user_created` (`user_id`, `created_at` DESC),
    INDEX `idx_orders_status_created` (`order_status`, `created_at` DESC)
);

-- 10. CHI TIẾT ĐƠN HÀNG (ORDER_ITEMS)
CREATE TABLE IF NOT EXISTS `order_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `product_id` INT,
    `quantity` INT NOT NULL,
    `unit_price` DECIMAL(10,2) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL,
    CONSTRAINT `chk_order_items_quantity` CHECK (`quantity` > 0)
);

-- 11. BẢNG YÊU CẦU SETUP BỂ (SETUP_REQUESTS)
CREATE TABLE IF NOT EXISTS `setup_requests` (
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
CREATE TABLE IF NOT EXISTS `blog_categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) UNIQUE NOT NULL
);

-- 13. BẢNG BÀI VIẾT (BLOG_POSTS)
CREATE TABLE IF NOT EXISTS `blog_posts` (
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
    FOREIGN KEY (`author_id`) REFERENCES `users`(`id`),
    INDEX `idx_blog_published_at` (`is_published`, `published_at` DESC),
    FULLTEXT INDEX `ft_blog_search` (`title`, `content`)
);

-- 14. BẢNG PHIÊN CHAT (CHAT_SESSIONS) - BIGINT id to safely support Date.now() millisecond timestamps
CREATE TABLE IF NOT EXISTS `chat_sessions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NULL,
    `staff_id` INT NULL,
    `status` ENUM('open', 'closed') DEFAULT 'open',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`staff_id`) REFERENCES `users`(`id`)
);

-- 15. BẢNG TIN NHẮN (CHAT_MESSAGES) - session_id BIGINT to match chat_sessions
CREATE TABLE IF NOT EXISTS `chat_messages` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `session_id` BIGINT NOT NULL,
    `sender_id` INT NULL,
    `content` TEXT NOT NULL,
    `is_read` BOOLEAN DEFAULT FALSE,
    `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_messages_session_sent` (`session_id`, `sent_at` ASC, `id` ASC),
    INDEX `idx_messages_sent_at` (`sent_at`)
);
