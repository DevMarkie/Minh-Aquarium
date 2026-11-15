/**
 * server/server.js
 * Application Entrypoint
 * Boots Express server with connection verification and service warmup
 */

require("dotenv").config();
const app = require("./app");
const { PORT } = require("./config/env");
const productService = require("./services/productService");

// Warm up product cache in background on server boot
productService
  .getAllProducts()
  .then((products) => {
    console.log(`[Warmup] Product catalog pre-loaded: ${products.length} products.`);
  })
  .catch((err) => {
    console.warn("[Warmup] Product catalog warmup notice:", err.message);
  });

const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`🤖 Modular API & Chat routes active at /api`);
});

module.exports = server;
