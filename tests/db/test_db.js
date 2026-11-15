/**
 * tests/db/test_db.js
 * Comprehensive automated verification test suite for Milestone M1
 * Verifies:
 *   1. Migration runner execution and idempotency
 *   2. Schema constraints (CHECK constraints for price and quantities)
 *   3. BIGINT chat session IDs with Date.now() millisecond timestamps
 *   4. Cart item uniqueness & atomic upsert behavior
 *   5. Cart image join resolution (eliminating p.image_url error)
 *   6. Product repository queries and fulltext search
 */

const assert = require("assert");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const pool = require("../../server/config/db");
const { runMigrations, getStatus } = require("../../scripts/migrate");
const {
  productRepository,
  cartRepository,
  chatRepository,
} = require("../../server/repositories");

let testsPassed = 0;
let testsFailed = 0;

async function test(name, fn) {
  try {
    process.stdout.write(`  [TEST] ${name} ... `);
    await fn();
    console.log("PASSED");
    testsPassed++;
  } catch (err) {
    console.log("FAILED");
    console.error(`    Error: ${err.message}`);
    if (err.stack) {
      console.error(err.stack.split("\n").slice(1, 4).join("\n"));
    }
    testsFailed++;
  }
}

async function runAllTests() {
  console.log("\n========================================================");
  console.log("   Minh Aquarium - Database Optimization Test Suite    ");
  console.log("========================================================\n");

  // TEST 1: Migration Runner & Idempotency
  await test("Migration runner applies migrations and remains idempotent", async () => {
    const status = await getStatus();
    assert(status.length >= 2, "Expected at least 2 migrations");
    const m1 = status.find((s) => s.version === "001");
    const m2 = status.find((s) => s.version === "002");
    assert(m1 && m1.status === "APPLIED", "Migration 001 should be APPLIED");
    assert(m2 && m2.status === "APPLIED", "Migration 002 should be APPLIED");

    // Run migrations again; must be idempotent and skip without errors
    const secondRun = await runMigrations({ quiet: true });
    assert.strictEqual(secondRun.applied.length, 0, "No new migrations should be applied on re-run");
    assert(secondRun.skipped.length >= 2, "All migrations should be skipped on re-run");
  });

  // TEST 2: CHECK Constraints (Negative Tests)
  await test("Negative price on products violates CHECK constraint", async () => {
    let threwCheckError = false;
    try {
      await pool.query(
        `INSERT INTO products (name, slug, price, stock_quantity)
         VALUES ('Invalid Fish', 'invalid-fish-price-neg', -50000, 10)`,
      );
    } catch (err) {
      if (
        err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
        err.message.includes("chk_products_price") ||
        err.errno === 3819
      ) {
        threwCheckError = true;
      } else {
        throw err;
      }
    }
    assert(threwCheckError, "Expected ER_CHECK_CONSTRAINT_VIOLATED when price is negative");
  });

  await test("Negative stock quantity on products violates CHECK constraint", async () => {
    let threwCheckError = false;
    try {
      await pool.query(
        `INSERT INTO products (name, slug, price, stock_quantity)
         VALUES ('Invalid Stock Fish', 'invalid-fish-stock-neg', 50000, -10)`,
      );
    } catch (err) {
      if (
        err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
        err.message.includes("chk_products_stock") ||
        err.errno === 3819
      ) {
        threwCheckError = true;
      } else {
        throw err;
      }
    }
    assert(threwCheckError, "Expected ER_CHECK_CONSTRAINT_VIOLATED when stock_quantity is negative");
  });

  await test("Zero quantity on cart_items violates CHECK constraint", async () => {
    // Ensure test cart exists
    const [userRows] = await pool.query("SELECT id FROM users LIMIT 1");
    const userId = userRows[0].id;
    const cart = await cartRepository.getOrCreateCart(userId);

    const [prodRows] = await pool.query("SELECT id FROM products LIMIT 1");
    const productId = prodRows[0].id;

    let threwCheckError = false;
    try {
      await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, 0)",
        [cart.id, productId],
      );
    } catch (err) {
      if (
        err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
        err.message.includes("chk_cart_items_quantity") ||
        err.errno === 3819
      ) {
        threwCheckError = true;
      } else {
        throw err;
      }
    }
    assert(threwCheckError, "Expected ER_CHECK_CONSTRAINT_VIOLATED when quantity is 0");
  });

  // TEST 3: BIGINT Chat Sessions & Date.now()
  await test("Chat sessions accepts millisecond epoch timestamps (> 1.7e12) without overflow", async () => {
    const epochId = Date.now().toString(); // e.g. "1731616800123" (> 2.147e9 signed 32-bit INT limit)

    // Create session with BIGINT ID
    const createdSessionId = await chatRepository.createSession(epochId);
    assert.strictEqual(createdSessionId, epochId, "Created session ID must match input timestamp");

    // Store user and assistant messages
    const msgId1 = await chatRepository.saveMessage(epochId, null, "Tôi muốn tư vấn cá Guppy", "user");
    assert(msgId1 > 0, "Expected valid message insertId");

    const msgId2 = await chatRepository.saveMessage(epochId, null, "Dạ bên em có các dòng Guppy thuần chủng", "assistant");
    assert(msgId2 > 0, "Expected valid message insertId");

    // Retrieve conversation history
    const history = await chatRepository.getHistory(epochId);
    assert.strictEqual(history.length, 2, "Expected 2 messages in history");
    assert.strictEqual(history[0].role, "user");
    assert(history[0].text.includes("Guppy"));
    assert.strictEqual(history[1].role, "assistant");

    // Clean up test session
    await pool.query("DELETE FROM chat_sessions WHERE id = ?", [epochId]);
  });

  // TEST 4: Cart Item Uniqueness & Atomic Upsert
  await test("Cart atomic upsert accumulates quantity without creating duplicate rows", async () => {
    // Create dedicated test user
    const testEmail = `test_cart_${Date.now()}@test.local`;
    const [uResult] = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ('Cart Test User', ?, 'hash', 'customer')`,
      [testEmail],
    );
    const testUserId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(testUserId);
      const [prodRows] = await pool.query("SELECT id FROM products LIMIT 1");
      const testProductId = prodRows[0].id;

      // First add: quantity 2
      await cartRepository.addItem(cart.id, testProductId, 2);

      // Second add: quantity 3 (atomic upsert)
      await cartRepository.addItem(cart.id, testProductId, 3);

      // Verify exactly ONE item exists with total quantity 5
      const [items] = await pool.query(
        "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
        [cart.id, testProductId],
      );

      assert.strictEqual(items.length, 1, "There must be exactly ONE row for the product in cart");
      assert.strictEqual(items[0].quantity, 5, "Quantity must be atomically incremented to 5");
    } finally {
      await pool.query("DELETE FROM users WHERE id = ?", [testUserId]);
    }
  });

  // TEST 5: Cart Query Image Join Resolution
  await test("Cart getByUserId joins product_images correctly without column mismatch errors", async () => {
    // Create dedicated test user
    const testEmail = `test_img_${Date.now()}@test.local`;
    const [uResult] = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ('Image Test User', ?, 'hash', 'customer')`,
      [testEmail],
    );
    const testUserId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(testUserId);
      const [prodRows] = await pool.query(
        `SELECT p.id, pi.image_url
         FROM products p
         JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
         LIMIT 1`,
      );
      assert(prodRows.length > 0, "Expected at least one product with primary image in DB");
      const targetProduct = prodRows[0];

      await cartRepository.addItem(cart.id, targetProduct.id, 1);

      // Retrieve via repository
      const cartItems = await cartRepository.getByUserId(testUserId);
      assert.strictEqual(cartItems.length, 1, "Expected 1 cart item");
      assert.strictEqual(cartItems[0].product_id, targetProduct.id);
      assert.strictEqual(cartItems[0].image_url, targetProduct.image_url);
    } finally {
      await pool.query("DELETE FROM users WHERE id = ?", [testUserId]);
    }
  });

  // TEST 6: Product Repository & Fulltext Search
  await test("ProductRepository queries products and performs fulltext search", async () => {
    const products = await productRepository.getAll({ limit: 10 });
    assert(products.length > 0, "Expected products returned from getAll");
    assert(products[0].name, "Product should have name");
    assert(products[0].category_name !== undefined, "Product should have category_name join");

    // Fulltext search
    const searchResults = await productRepository.search("cá", 5);
    assert(Array.isArray(searchResults), "Search must return an array");
  });

  console.log("\n========================================================");
  console.log(`  Results: ${testsPassed} passed, ${testsFailed} failed`);
  console.log("========================================================\n");

  await pool.end();

  if (testsFailed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runAllTests().catch((err) => {
    console.error("Fatal test runner error:", err);
    process.exit(1);
  });
}

module.exports = { runAllTests };
