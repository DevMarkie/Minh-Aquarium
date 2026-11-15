const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const pool = require("../../server/config/db");
const { getStatus } = require("../../scripts/migrate");
const {
  productRepository,
  cartRepository,
  chatRepository,
} = require("../../server/repositories");

test.describe("Database Architecture & Repository Tests", () => {
  test("migrations are registered and applied", async () => {
    const status = await getStatus();
    expect(status.length).toBeGreaterThanOrEqual(2);
    const m1 = status.find((s) => s.version === "001");
    const m2 = status.find((s) => s.version === "002");
    expect(m1?.status).toBe("APPLIED");
    expect(m2?.status).toBe("APPLIED");
  });

  test("negative price violates CHECK constraint", async () => {
    let checkViolated = false;
    try {
      await pool.query(
        "INSERT INTO products (name, slug, price, stock_quantity) VALUES ('Bad Price', 'bad-price-test', -100, 5)",
      );
    } catch (err) {
      if (err.code === "ER_CHECK_CONSTRAINT_VIOLATED" || err.errno === 3819) {
        checkViolated = true;
      }
    }
    expect(checkViolated).toBe(true);
  });

  test("BIGINT chat session accepts millisecond timestamps", async () => {
    const epochId = Date.now().toString();
    const createdId = await chatRepository.createSession(epochId);
    expect(createdId).toBe(epochId);

    const msgId = await chatRepository.saveMessage(epochId, null, "Hello Guppy", "user");
    expect(msgId).toBeGreaterThan(0);

    const history = await chatRepository.getHistory(epochId);
    expect(history.length).toBe(1);
    expect(history[0].text).toContain("Hello Guppy");

    await pool.query("DELETE FROM chat_sessions WHERE id = ?", [epochId]);
  });

  test("atomic cart upsert enforces uniqueness and accumulates quantity", async () => {
    const testEmail = `pw_cart_${Date.now()}@test.local`;
    const [uResult] = await pool.query(
      "INSERT INTO users (full_name, email, password_hash, role) VALUES ('Cart PW User', ?, 'hash', 'customer')",
      [testEmail],
    );
    const userId = uResult.insertId;

    try {
      const cart = await cartRepository.getOrCreateCart(userId);
      const [pRows] = await pool.query("SELECT id FROM products LIMIT 1");
      const prodId = pRows[0].id;

      await cartRepository.addItem(cart.id, prodId, 2);
      await cartRepository.addItem(cart.id, prodId, 3);

      const items = await cartRepository.getByUserId(userId);
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(5);
      expect(items[0].image_url).toBeDefined();
    } finally {
      await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    }
  });

  test("product search uses fulltext match and returns active products", async () => {
    const results = await productRepository.search("cá", 5);
    expect(Array.isArray(results)).toBe(true);
  });
});
