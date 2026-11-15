/**
 * server/controllers/cartController.js
 * Controller for cart endpoints
 */

const cartService = require("../services/cartService");

class CartController {
  async getCart(req, res, next) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const items = await cartService.getCart(userId);
      res.json({
        success: true,
        items,
      });
    } catch (err) {
      next(err);
    }
  }

  async addToCart(req, res, next) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const { product_id, quantity } = req.body || {};
      const result = await cartService.addItem(userId, product_id, quantity);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CartController();
