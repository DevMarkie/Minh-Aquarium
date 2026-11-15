/**
 * server/controllers/orderController.js
 * Controller for order management
 */

const orderService = require("../services/orderService");

class OrderController {
  async createOrder(req, res, next) {
    try {
      const order = await orderService.createOrder(req.body);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrderController();
