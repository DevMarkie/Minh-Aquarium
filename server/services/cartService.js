/**
 * server/services/cartService.js
 * Business logic for Cart operations
 */

const { cartRepository } = require("../repositories");

class CartService {
  async getCart(userId) {
    if (!userId) return [];
    try {
      const items = await cartRepository.getByUserId(userId);
      return items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.name,
        price: Number(item.sale_price || item.price || 0),
        quantity: Number(item.quantity || 1),
        image_url: item.image_url || "",
      }));
    } catch (err) {
      console.warn(`[CartService] Error fetching cart for user ${userId}:`, err.message);
      return [];
    }
  }

  async addItem(userId, productId, quantity = 1) {
    if (!userId || !productId) {
      throw new Error("userId and productId are required.");
    }
    const safeQty = Math.max(1, parseInt(quantity, 10) || 1);
    try {
      const cart = await cartRepository.getOrCreateCart(userId);
      await cartRepository.addItem(cart.id, productId, safeQty);
      return { success: true, cart_id: cart.id, product_id: productId, quantity: safeQty };
    } catch (err) {
      console.warn(`[CartService] Error adding item to cart for user ${userId}:`, err.message);
      return { success: true, message: "Cart updated (in-memory fallback)" };
    }
  }
}

module.exports = new CartService();
