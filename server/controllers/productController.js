/**
 * server/controllers/productController.js
 * Controller for product endpoints
 */

const productService = require("../services/productService");

class ProductController {
  async getProducts(req, res, next) {
    try {
      const hasFilters = req.query && Object.keys(req.query).length > 0;
      if (!hasFilters) {
        const buf = await productService.getCachedBuffer();
        if (buf) {
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          return res.send(buf);
        }
      }

      const products = await productService.getAllProducts(req.query);
      res.json({
        success: true,
        count: products.length,
        products,
        data: products, // Backward compatibility with previous API signature
      });
    } catch (err) {
      next(err);
    }
  }

  async getProductById(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }
      res.json({ success: true, product, data: product });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
