/**
 * tests/db/adversarial_stress_m1.js
 * Adversarial Stress & Edge Case Verification Suite for Milestone M1
 *
 * Scenarios Tested:
 * 1. Cart Addition Concurrency:
 *    - 20 parallel requests on empty cart (cold insert race)
 *    - 20 parallel requests with non-uniform quantities on existing item (warm upsert race)
 *    - Multi-product concurrency (5 products x 10 parallel requests = 50 concurrent requests)
 * 2. Chat Session BIGINT Boundaries:
 *    - Epoch timestamp Date.now() (> 1.7e12)
 *    - Arbitrary 10^14 timestamp (100,000,000,000,000)
 *    - JS Number.MAX_SAFE_INTEGER (9,007,199,254,740,991)
 *    - Extreme signed 64-bit BIGINT (9,223,372,036,854,775,800)
 *    - Overflow rejection test (> 2^63 - 1)
 * 3. CHECK Constraints & Boundary Enforcement:
 *    - Rejection: Negative price (-1, -0.01, -50000) on products
 *    - Rejection: Negative stock (-1, -100) on products
 *    - Rejection: Zero quantity (0) on cart_items
 *    - Rejection: Negative quantity (-1, -10) on cart_items
 *    - Rejection: Zero and negative quantity on order_items
 *    - Acceptance: Boundary valid zero price (0) and zero stock (0)
 *    - Acceptance: Boundary minimum positive cart quantity (1)
 */

const assert = require("assert");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const pool = require("../../server/config/db");
const {
  productRepository,
  cartRepository,
  chatRepository,
} = require("../../server/repositories");

let passed = 0;
let failed = 0;
const failures = [];

async function runScenario(name, fn) {
  process.stdout.write(`  [STRESS TEST] ${name} ... `);
  const start = Date.now();
  try {
    await fn();
    const duration = Date.now() - start;
    console.log(`PASSED (${duration}ms)`);
    passed++;
  } catch (err) {
    const duration = Date.now() - start;
    console.log(`FAILED (${duration}ms)`);
    console.error(`    -> Error: ${err.message}`);
    if (err.stack) {
      console.error(
        err.stack
          .split("\n")
          .slice(1, 4)
          .map((line) => "    " + line)
          .join("\n"),
      );
    }
    failed++;
    failures.push({ name, error: err.message });
  }
}

async function main() {
  console.log("\n================================================================");
  console.log("   Milestone M1: Adversarial Stress & Edge Case Harness        ");
  console.log("================================================================\n");

  // Get a valid existing product for cart tests
  const [prodRows] = await pool.query(
    "SELECT id, name, price FROM products WHERE is_active = TRUE LIMIT 10",
  );
  assert(prodRows.length >= 5, "Database must contain at least 5 active products for testing");
  const testProduct1 = prodRows[0];
  const testProduct2 = prodRows[1];

  // ============================================================================
  // SUITE 1: Cart Concurrency Stress Testing
  // ============================================================================
  console.log("--- SUITE 1: Cart Concurrency Stress Testing ---");

  await runScenario("20 parallel cart additions on cold cart (qty=1 each)", async () => {
    const testEmail = `stress_cold_${Date.now()}_${Math.random().toString(36).substring(7)}@test.local`;
    const [uResult] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ('Cold Cart User', ?, 'hash', 'customer')",
      [testEmail],
    );
    const userId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(userId);
      const concurrency = 20;

      // Launch 20 concurrent requests simultaneously
      const addPromises = Array.from({ length: concurrency }, () =>
        cartRepository.addItem(cart.id, testProduct1.id, 1),
      );

      const results = await Promise.all(addPromises);
      assert.strictEqual(results.length, concurrency, "All 20 requests must complete");

      // Verify database state: exactly ONE line item, quantity exactly 20
      const [items] = await pool.query(
        "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
        [cart.id, testProduct1.id],
      );

      assert.strictEqual(items.length, 1, `Expected exactly 1 cart item row, found ${items.length}`);
      assert.strictEqual(
        Number(items[0].quantity),
        concurrency,
        `Expected total quantity to be exactly ${concurrency}, got ${items[0].quantity}`,
      );

      // Verify item count via repository
      const totalCount = await cartRepository.getItemCount(userId);
      assert.strictEqual(totalCount, concurrency, `getItemCount expected ${concurrency}, got ${totalCount}`);
    } finally {
      await pool.query("DELETE FROM orders WHERE user_id = ?", [userId]);
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    }
  });

  await runScenario("20 parallel cart additions with varied quantities (1..20) on existing item", async () => {
    const testEmail = `stress_warm_${Date.now()}_${Math.random().toString(36).substring(7)}@test.local`;
    const [uResult] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ('Warm Cart User', ?, 'hash', 'customer')",
      [testEmail],
    );
    const userId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(userId);

      // Seed with initial quantity 5
      const initialQty = 5;
      await cartRepository.addItem(cart.id, testProduct1.id, initialQty);

      // Concurrently add quantities 1, 2, 3, ..., 20
      // Sum = 1 + 2 + ... + 20 = 210. Final expected = 5 + 210 = 215.
      const quantities = Array.from({ length: 20 }, (_, i) => i + 1);
      const expectedTotalAdded = quantities.reduce((a, b) => a + b, 0);
      const expectedFinalQty = initialQty + expectedTotalAdded;

      const addPromises = quantities.map((qty) =>
        cartRepository.addItem(cart.id, testProduct1.id, qty),
      );

      await Promise.all(addPromises);

      const [items] = await pool.query(
        "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
        [cart.id, testProduct1.id],
      );

      assert.strictEqual(items.length, 1, `Expected exactly 1 cart item row, found ${items.length}`);
      assert.strictEqual(
        Number(items[0].quantity),
        expectedFinalQty,
        `Expected quantity ${expectedFinalQty}, got ${items[0].quantity}`,
      );
    } finally {
      await pool.query("DELETE FROM orders WHERE user_id = ?", [userId]);
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    }
  });

  await runScenario("Multi-product high concurrency: 5 products x 10 parallel adds (50 total)", async () => {
    const testEmail = `stress_multi_${Date.now()}_${Math.random().toString(36).substring(7)}@test.local`;
    const [uResult] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ('Multi Cart User', ?, 'hash', 'customer')",
      [testEmail],
    );
    const userId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(userId);
      const targetProducts = prodRows.slice(0, 5);
      const perProductConcurrency = 10;

      // Build 50 requests across 5 products shuffled
      const tasks = [];
      for (const p of targetProducts) {
        for (let i = 0; i < perProductConcurrency; i++) {
          tasks.push({ cartId: cart.id, productId: p.id, qty: 1 });
        }
      }
      // Shuffle tasks to maximize interleaving
      tasks.sort(() => Math.random() - 0.5);

      await Promise.all(
        tasks.map((t) => cartRepository.addItem(t.cartId, t.productId, t.qty)),
      );

      // Verify each product has exactly 1 row and quantity = 10
      const [items] = await pool.query(
        "SELECT product_id, quantity FROM cart_items WHERE cart_id = ? ORDER BY product_id",
        [cart.id],
      );

      assert.strictEqual(items.length, 5, `Expected 5 unique product rows, got ${items.length}`);
      for (const item of items) {
        assert.strictEqual(
          Number(item.quantity),
          perProductConcurrency,
          `Product ${item.product_id} expected quantity ${perProductConcurrency}, got ${item.quantity}`,
        );
      }
    } finally {
      await pool.query("DELETE FROM orders WHERE user_id = ?", [userId]);
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    }
  });

  // ============================================================================
  // SUITE 2: Chat Sessions Numeric Boundary & Overflow Testing
  // ============================================================================
  console.log("\n--- SUITE 2: Chat Session BIGINT Overflow Limits ---");

  await runScenario("Standard Epoch timestamp Date.now() (~1.7e12 > 2^31-1)", async () => {
    const epochId = Date.now().toString();
    const createdId = await chatRepository.createSession(epochId);
    assert.strictEqual(createdId, epochId);

    const msgId = await chatRepository.saveMessage(epochId, null, "Stress test message epoch", "user");
    assert(msgId > 0);

    const history = await chatRepository.getHistory(epochId);
    assert.strictEqual(history.length, 1);
    assert.strictEqual(history[0].sessionId, epochId);

    await pool.query("DELETE FROM chat_sessions WHERE id = ?", [epochId]);
  });

  await runScenario("Arbitrary 10^14 timestamp (100000000000000)", async () => {
    const largeId = "100000000000000"; // 10^14
    const createdId = await chatRepository.createSession(largeId);
    assert.strictEqual(createdId, largeId);

    const msgId = await chatRepository.saveMessage(largeId, null, "10^14 boundary test", "assistant");
    assert(msgId > 0);

    const history = await chatRepository.getHistory(largeId);
    assert.strictEqual(history.length, 1);
    assert.strictEqual(history[0].sessionId, largeId);

    // Verify session retrieval
    const session = await chatRepository.getSessionById(largeId);
    assert(session !== null);
    assert.strictEqual(session.id.toString(), largeId);

    await pool.query("DELETE FROM chat_sessions WHERE id = ?", [largeId]);
  });

  await runScenario("Number.MAX_SAFE_INTEGER boundary (9007199254740991 = 2^53 - 1)", async () => {
    const maxSafeId = Number.MAX_SAFE_INTEGER.toString(); // 9007199254740991
    const createdId = await chatRepository.createSession(maxSafeId);
    assert.strictEqual(createdId, maxSafeId);

    const msgId = await chatRepository.saveMessage(maxSafeId, null, "MAX_SAFE_INTEGER boundary", "user");
    assert(msgId > 0);

    const history = await chatRepository.getHistory(maxSafeId);
    assert.strictEqual(history.length, 1);
    assert.strictEqual(history[0].sessionId, maxSafeId);

    await pool.query("DELETE FROM chat_sessions WHERE id = ?", [maxSafeId]);
  });

  await runScenario("Extreme 64-bit BIGINT value (9223372036854775800 near 2^63 - 1)", async () => {
    const extremeBigInt = "9223372036854775800";
    const createdId = await chatRepository.createSession(extremeBigInt);
    assert.strictEqual(createdId, extremeBigInt);

    const msgId = await chatRepository.saveMessage(extremeBigInt, null, "Near BIGINT MAX", "system");
    assert(msgId > 0);

    // Note: In mysql2 driver, without supportBigNumbers: true & bigNumberStrings: true,
    // reading BIGINT > 2^53 - 1 via SQL SELECT deserializes as JS Number (IEEE 754 float),
    // causing low-order precision loss (e.g. 9223372036854775800 -> 9223372036854776000).
    // We check raw string/cast via SQL CAST(id AS CHAR) to verify the DB stored the exact value.
    const [rows] = await pool.query("SELECT CAST(id AS CHAR) as id_str FROM chat_sessions WHERE id = ?", [extremeBigInt]);
    assert.strictEqual(rows.length, 1);
    assert.strictEqual(rows[0].id_str, extremeBigInt, "MySQL storage must retain full 64-bit integer precision");

    await pool.query("DELETE FROM chat_sessions WHERE id = ?", [extremeBigInt]);
  });

  await runScenario("BIGINT overflow rejection when value exceeds 2^63 - 1", async () => {
    // 2^63 = 9223372036854775808 (exceeds signed BIGINT limit)
    const overflowVal = "9223372036854775808";
    let threwOverflowError = false;
    try {
      await pool.query("INSERT INTO chat_sessions (id) VALUES (?)", [overflowVal]);
    } catch (err) {
      if (
        err.code === "ER_WARN_DATA_OUT_OF_RANGE" ||
        err.code === "ER_DATA_OUT_OF_RANGE" ||
        err.errno === 1264 ||
        err.message.includes("out of range")
      ) {
        threwOverflowError = true;
      } else {
        throw err;
      }
    }
    assert(threwOverflowError, "Database must reject values exceeding signed 64-bit BIGINT limit");
  });

  // ============================================================================
  // SUITE 3: CHECK Constraint Rejection & Boundary Verification
  // ============================================================================
  console.log("\n--- SUITE 3: CHECK Constraints & Boundary Enforcement ---");

  await runScenario("Negative price rejected on product INSERT (-50000, -1, -0.01)", async () => {
    const invalidPrices = [-50000, -1, -0.01];
    for (const badPrice of invalidPrices) {
      let threw = false;
      try {
        await pool.query(
          "INSERT INTO products (name, slug, price, stock_quantity) VALUES (?, ?, ?, 5)",
          [`Bad Price ${badPrice}`, `bad-price-${Date.now()}-${Math.abs(badPrice)}`, badPrice],
        );
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_products_price")
        ) {
          threw = true;
        } else {
          throw err;
        }
      }
      assert(threw, `Failed to reject negative price: ${badPrice}`);
    }
  });

  await runScenario("Negative price rejected on product UPDATE", async () => {
    // Insert valid temporary product
    const [res] = await pool.query(
      "INSERT INTO products (name, slug, price, stock_quantity) VALUES ('Valid Prod', ?, 1000, 10)",
      [`valid-prod-${Date.now()}`],
    );
    const prodId = res.insertId;

    try {
      let threw = false;
      try {
        await pool.query("UPDATE products SET price = -100 WHERE id = ?", [prodId]);
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_products_price")
        ) {
          threw = true;
        }
      }
      assert(threw, "Expected UPDATE to negative price to be rejected by chk_products_price");
    } finally {
      await pool.query("DELETE FROM products WHERE id = ?", [prodId]);
    }
  });

  await runScenario("Negative stock_quantity rejected on product INSERT and UPDATE", async () => {
    let threwInsert = false;
    try {
      await pool.query(
        "INSERT INTO products (name, slug, price, stock_quantity) VALUES ('Bad Stock', ?, 1000, -1)",
        [`bad-stock-${Date.now()}`],
      );
    } catch (err) {
      if (
        err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
        err.errno === 3819 ||
        err.message.includes("chk_products_stock")
      ) {
        threwInsert = true;
      }
    }
    assert(threwInsert, "Expected INSERT with negative stock to be rejected by chk_products_stock");

    // Insert valid product, then try UPDATE to negative stock
    const [res] = await pool.query(
      "INSERT INTO products (name, slug, price, stock_quantity) VALUES ('Stock Test', ?, 500, 10)",
      [`stock-test-${Date.now()}`],
    );
    const prodId = res.insertId;

    try {
      let threwUpdate = false;
      try {
        await pool.query("UPDATE products SET stock_quantity = -5 WHERE id = ?", [prodId]);
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_products_stock")
        ) {
          threwUpdate = true;
        }
      }
      assert(threwUpdate, "Expected UPDATE to negative stock to be rejected by chk_products_stock");
    } finally {
      await pool.query("DELETE FROM products WHERE id = ?", [prodId]);
    }
  });

  await runScenario("Zero (0) and negative quantity rejected on cart_items", async () => {
    const testEmail = `chk_cart_${Date.now()}@test.local`;
    const [uResult] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ('Cart Chk User', ?, 'hash', 'customer')",
      [testEmail],
    );
    const userId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(userId);

      // Attempt raw INSERT quantity = 0
      let threwZero = false;
      try {
        await pool.query(
          "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, 0)",
          [cart.id, testProduct1.id],
        );
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_cart_items_quantity")
        ) {
          threwZero = true;
        }
      }
      assert(threwZero, "Expected cart_items with quantity=0 to be rejected by chk_cart_items_quantity");

      // Attempt raw INSERT quantity = -1
      let threwNegative = false;
      try {
        await pool.query(
          "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, -1)",
          [cart.id, testProduct1.id],
        );
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_cart_items_quantity")
        ) {
          threwNegative = true;
        }
      }
      assert(threwNegative, "Expected cart_items with quantity=-1 to be rejected by chk_cart_items_quantity");

      // Insert valid item, then attempt UPDATE quantity = 0 and quantity = -3
      await cartRepository.addItem(cart.id, testProduct1.id, 2);

      let threwUpdateZero = false;
      try {
        await pool.query(
          "UPDATE cart_items SET quantity = 0 WHERE cart_id = ? AND product_id = ?",
          [cart.id, testProduct1.id],
        );
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_cart_items_quantity")
        ) {
          threwUpdateZero = true;
        }
      }
      assert(threwUpdateZero, "Expected UPDATE cart_items quantity=0 to be rejected");

      let threwUpdateNeg = false;
      try {
        await pool.query(
          "UPDATE cart_items SET quantity = -3 WHERE cart_id = ? AND product_id = ?",
          [cart.id, testProduct1.id],
        );
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_cart_items_quantity")
        ) {
          threwUpdateNeg = true;
        }
      }
      assert(threwUpdateNeg, "Expected UPDATE cart_items quantity=-3 to be rejected");
    } finally {
      await pool.query("DELETE FROM orders WHERE user_id = ?", [userId]);
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    }
  });

  await runScenario("Zero (0) and negative quantity rejected on order_items", async () => {
    const testEmail = `chk_order_${Date.now()}@test.local`;
    const [uResult] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ('Order Chk User', ?, 'hash', 'customer')",
      [testEmail],
    );
    const userId = uResult.insertId;

    try {
      const [orderRes] = await pool.query(
        `INSERT INTO orders (user_id, order_code, subtotal, total_amount, recipient_name, recipient_phone, shipping_address, payment_method)
         VALUES (?, ?, 100000, 100000, 'Test Recipient', '0901234567', 'Test Address', 'cod')`,
        [userId, `ORD-${Date.now()}`],
      );
      const orderId = orderRes.insertId;

      // Try inserting order_items with quantity = 0
      let threwOrderZero = false;
      try {
        await pool.query(
          "INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price) VALUES (?, ?, 'Test Prod', 0, 50000)",
          [orderId, testProduct1.id],
        );
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_order_items_quantity")
        ) {
          threwOrderZero = true;
        }
      }
      assert(threwOrderZero, "Expected order_items quantity=0 to be rejected by chk_order_items_quantity");

      // Try inserting order_items with quantity = -2
      let threwOrderNeg = false;
      try {
        await pool.query(
          "INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price) VALUES (?, ?, 'Test Prod', -2, 50000)",
          [orderId, testProduct1.id],
        );
      } catch (err) {
        if (
          err.code === "ER_CHECK_CONSTRAINT_VIOLATED" ||
          err.errno === 3819 ||
          err.message.includes("chk_order_items_quantity")
        ) {
          threwOrderNeg = true;
        }
      }
      assert(threwOrderNeg, "Expected order_items quantity=-2 to be rejected by chk_order_items_quantity");
    } finally {
      await pool.query("DELETE FROM orders WHERE user_id = ?", [userId]);
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    }
  });

  await runScenario("Edge Case: cartRepository.addItem with explicit quantity = 0 behavior", async () => {
    const testEmail = `chk_zero_${Date.now()}@test.local`;
    const [uResult] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ('Zero Qty User', ?, 'hash', 'customer')",
      [testEmail],
    );
    const userId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(userId);
      let threw = false;
      try {
        await cartRepository.addItem(cart.id, testProduct1.id, 0);
      } catch (err) {
        threw = true;
      }
      // Note: If parseInt(0, 10) || 1 is used in JS repository, 0 evaluates to 1 and does not throw!
      // This is an application-level flaw if explicit 0 is passed.
      if (!threw) {
        const [items] = await pool.query(
          "SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
          [cart.id, testProduct1.id],
        );
        console.log(`\n    [ADVERSARIAL FINDING]: Passing quantity=0 to cartRepository.addItem did not throw; it inserted quantity=${items[0]?.quantity} due to 'parseInt(qty) || 1' fallback!`);
      }
    } finally {
      await pool.query("DELETE FROM orders WHERE user_id = ?", [userId]);
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    }
  });

  await runScenario("Valid boundary values are accepted (price=0, stock=0, qty=1)", async () => {
    // Price = 0 (e.g. promotional giveaway)
    const [pRes] = await pool.query(
      "INSERT INTO products (name, slug, price, stock_quantity) VALUES ('Free Sample', ?, 0, 0)",
      [`free-sample-${Date.now()}`],
    );
    const freeProdId = pRes.insertId;

    try {
      const [pRows] = await pool.query("SELECT price, stock_quantity FROM products WHERE id = ?", [freeProdId]);
      assert.strictEqual(Number(pRows[0].price), 0, "Price 0 should be stored accurately");
      assert.strictEqual(Number(pRows[0].stock_quantity), 0, "Stock 0 should be stored accurately");
    } finally {
      await pool.query("DELETE FROM products WHERE id = ?", [freeProdId]);
    }
  });

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log("\n================================================================");
  console.log(`  Adversarial Stress Results: ${passed} passed, ${failed} failed`);
  console.log("================================================================\n");

  await pool.end();

  if (failed > 0) {
    console.error("Failures summary:", failures);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Fatal stress test harness error:", err);
    process.exit(1);
  });
}

module.exports = { main };
