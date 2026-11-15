/**
 * server/routes/apiRoutes.js
 * Modular routes for core store APIs (products, cart, orders, auth)
 */

const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

// Products
router.get("/products", (req, res, next) => productController.getProducts(req, res, next));
router.get("/products/:id", (req, res, next) => productController.getProductById(req, res, next));

// Authentication
router.post("/login", (req, res, next) => authController.login(req, res, next));

// Cart
router.get("/cart/:userId", (req, res, next) => cartController.getCart(req, res, next));
router.post("/cart/:userId/add", (req, res, next) => cartController.addToCart(req, res, next));

// Orders
router.post("/orders", (req, res, next) => orderController.createOrder(req, res, next));

module.exports = router;
