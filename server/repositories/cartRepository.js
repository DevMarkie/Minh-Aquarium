/**
 * server/repositories/cartRepository.js
 * Data access repository for Shopping Carts and Line Items
 * Implements atomic upsert and resolves product image URLs via LEFT JOIN
 */

const pool = require("../config/db");

class CartRepository {
  /**
   * Retrieve active cart for a specific user ID, creating one if not exists
   * @param {number} userId
   * @returns {Promise<Object>} Cart record { id, user_id, updated_at }
   */
  async getOrCreateCart(userId) {
    const selectSql = "SELECT id, user_id, updated_at FROM carts WHERE user_id = ? LIMIT 1";
    const [rows] = await pool.query(selectSql, [userId]);
    if (rows.length > 0) {
      return rows[0];
    }

    // Insert new cart for user (ignore if race condition creates it simultaneously)
    await pool.query(
      "INSERT INTO carts (user_id) VALUES (?) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP",
      [userId],
    );

    const [newRows] = await pool.query(selectSql, [userId]);
    return newRows[0];
  }

  /**
   * Retrieve cart line items for a user ID
   * Fixes runtime bug by joining product_images for primary image_url
   * @param {number} userId
   * @returns {Promise<Array<Object>>}
   */
  async getByUserId(userId) {
    const sql = `
      SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity,
             p.name, p.price, p.sale_price, p.slug, p.stock_quantity,
             COALESCE(pi.image_url, '') AS image_url
      FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      JOIN products p ON ci.product_id = p.id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
      WHERE c.user_id = ?
      ORDER BY ci.id ASC
    `;

    const [rows] = await pool.query(sql, [userId]);
    return rows;
  }

  /**
   * Atomically upsert a product into a cart
   * Utilizes UNIQUE KEY uq_cart_product (cart_id, product_id)
   * Prevents race conditions and duplicate rows
   * @param {number} cartId
   * @param {number} productId
   * @param {number} quantity
   * @returns {Promise<Object>} Upserted item status
   */
  async addItem(cartId, productId, quantity = 1) {
    const parsed = parseInt(quantity, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    const qty = parsed;

    const sql = `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;

    const [result] = await pool.query(sql, [cartId, productId, qty]);

    // Fetch the updated item
    const [itemRows] = await pool.query(
      `SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity,
              p.name, p.price, p.slug,
              COALESCE(pi.image_url, '') AS image_url
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
       WHERE ci.cart_id = ? AND ci.product_id = ?
       LIMIT 1`,
      [cartId, productId],
    );

    return itemRows[0] || { affectedRows: result.affectedRows };
  }

  /**
   * Set absolute quantity for a cart item
   * @param {number} cartId
   * @param {number} productId
   * @param {number} quantity
   * @returns {Promise<boolean>}
   */
  async updateItemQuantity(cartId, productId, quantity) {
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      return this.removeItem(cartId, productId);
    }

    const [result] = await pool.query(
      "UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?",
      [qty, cartId, productId],
    );
    return result.affectedRows > 0;
  }

  /**
   * Remove a single product from a cart
   * @param {number} cartId
   * @param {number} productId
   * @returns {Promise<boolean>}
   */
  async removeItem(cartId, productId) {
    const [result] = await pool.query(
      "DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, productId],
    );
    return result.affectedRows > 0;
  }

  /**
   * Clear all items in a cart
   * @param {number} cartId
   * @returns {Promise<boolean>}
   */
  async clearCart(cartId) {
    const [result] = await pool.query("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);
    return result.affectedRows > 0;
  }

  /**
   * Get total quantity of items in a user's cart
   * @param {number} userId
   * @returns {Promise<number>}
   */
  async getItemCount(userId) {
    const sql = `
      SELECT COALESCE(SUM(ci.quantity), 0) AS total_count
      FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      WHERE c.user_id = ?
    `;
    const [rows] = await pool.query(sql, [userId]);
    return Number(rows[0]?.total_count || 0);
  }
}

module.exports = new CartRepository();
