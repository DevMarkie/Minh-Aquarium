-- Migration: 002_optimize_indexes_and_types.sql
-- Description: Alters chat session IDs to BIGINT, adds cart uniqueness constraint,
--              composite indexes, fulltext search indexes, and CHECK constraints.

-- 1. Alter chat_sessions.id and chat_messages.session_id to BIGINT AUTO_INCREMENT
-- Temporarily drop the FK on chat_messages.session_id to permit type modification
SET @fk_session = (
    SELECT CONSTRAINT_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'chat_messages'
      AND COLUMN_NAME = 'session_id'
      AND REFERENCED_TABLE_NAME IS NOT NULL
    LIMIT 1
);
SET @drop_fk_sql = IF(@fk_session IS NOT NULL, CONCAT('ALTER TABLE chat_messages DROP FOREIGN KEY `', @fk_session, '`'), 'SELECT 1');
PREPARE stmt_drop_fk FROM @drop_fk_sql;
EXECUTE stmt_drop_fk;
DEALLOCATE PREPARE stmt_drop_fk;

ALTER TABLE chat_sessions MODIFY COLUMN id BIGINT AUTO_INCREMENT;
ALTER TABLE chat_messages MODIFY COLUMN session_id BIGINT NOT NULL;

-- Re-establish the foreign key constraint on session_id
ALTER TABLE chat_messages ADD CONSTRAINT fk_chat_messages_session
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE;

-- 2. Cart items uniqueness: prevent duplicate rows under concurrent add-to-cart operations
ALTER TABLE cart_items ADD UNIQUE KEY uq_cart_product (cart_id, product_id);

-- 3. Composite indexes for high-throughput query filtering and sorting
-- Products: active, featured catalog sorting
ALTER TABLE products ADD INDEX idx_products_active_featured (is_active, is_featured, stock_quantity);
-- Products: category browsing by active status
ALTER TABLE products ADD INDEX idx_products_cat_active (category_id, is_active);
-- Orders: customer order history sorted by most recent
ALTER TABLE orders ADD INDEX idx_orders_user_created (user_id, created_at DESC);
-- Orders: admin order triage by status
ALTER TABLE orders ADD INDEX idx_orders_status_created (order_status, created_at DESC);
-- Chat messages: session history ordered by sent_at ASC
ALTER TABLE chat_messages ADD INDEX idx_messages_session_sent (session_id, sent_at ASC, id ASC);
-- Chat messages: background retention cleanup
ALTER TABLE chat_messages ADD INDEX idx_messages_sent_at (sent_at);

-- 4. Fulltext indexes for natural language product and article search
ALTER TABLE products ADD FULLTEXT INDEX ft_products_search (name, description);
ALTER TABLE blog_posts ADD FULLTEXT INDEX ft_blog_search (title, content);

-- 5. Integrity check constraints
ALTER TABLE products ADD CONSTRAINT chk_products_price CHECK (price >= 0);
ALTER TABLE products ADD CONSTRAINT chk_products_stock CHECK (stock_quantity >= 0);
ALTER TABLE cart_items ADD CONSTRAINT chk_cart_items_quantity CHECK (quantity > 0);
ALTER TABLE order_items ADD CONSTRAINT chk_order_items_quantity CHECK (quantity > 0);
