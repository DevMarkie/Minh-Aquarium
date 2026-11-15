/**
 * server/services/orderService.js
 * Business logic for customer orders
 */

class OrderService {
  async createOrder({ userId, items, shippingAddress, paymentMethod }) {
    const orderCode = "ORD-" + Date.now();
    const orderId = Math.floor(Math.random() * 10000) + 1000;

    return {
      success: true,
      order_id: orderId,
      order_code: orderCode,
      user_id: userId || 1,
      items_count: Array.isArray(items) ? items.length : 0,
      status: "pending",
      payment_method: paymentMethod || "cod",
      created_at: new Date().toISOString(),
    };
  }
}

module.exports = new OrderService();
