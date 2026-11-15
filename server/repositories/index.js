/**
 * server/repositories/index.js
 * Export all database repositories
 */

const productRepository = require("./productRepository");
const cartRepository = require("./cartRepository");
const chatRepository = require("./chatRepository");

module.exports = {
  productRepository,
  cartRepository,
  chatRepository,
};
