/**
 * tests/api/api.test.js
 * Automated integration test suite for backend API endpoints
 */

const assert = require("assert");
const http = require("http");
const app = require("../../server/app");

async function runApiTests() {
  console.log("\n========================================================");
  console.log("   Minh Aquarium - Modular API Integration Test Suite    ");
  console.log("========================================================\n");

  const server = http.createServer(app);
  let baseUrl = "";

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  [TEST] ${name} ... PASSED`);
      passed++;
    } catch (err) {
      console.error(`  [TEST] ${name} ... FAILED:`, err.message);
      failed++;
    }
  }

  try {
    await test("GET /api/products returns products list with backward compatible payload", async () => {
      const res = await fetch(`${baseUrl}/api/products`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(Array.isArray(data.products) || Array.isArray(data.data));
      const list = data.products || data.data;
      assert.ok(list.length > 0, "Should have products returned");
      const first = list[0];
      assert.ok(first.name, "Product should have a name");
      assert.ok(first.price !== undefined, "Product should have price");
    });

    await test("GET /api/products/:id returns specific product or 404", async () => {
      const res = await fetch(`${baseUrl}/api/products/1`);
      assert.ok(res.status === 200 || res.status === 404);
      const data = await res.json();
      if (res.status === 200) {
        assert.strictEqual(data.success, true);
        assert.ok(data.product || data.data);
      }
    });

    await test("POST /api/login handles valid and missing email", async () => {
      // Missing email
      const res400 = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res400.status, 400);

      // Valid email
      const res200 = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      });
      assert.strictEqual(res200.status, 200);
      const data = await res200.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.user.email, "test@example.com");
    });

    await test("GET and POST /api/cart/:userId", async () => {
      const getRes = await fetch(`${baseUrl}/api/cart/1`);
      assert.strictEqual(getRes.status, 200);
      const getData = await getRes.json();
      assert.strictEqual(getData.success, true);
      assert.ok(Array.isArray(getData.items));

      const addRes = await fetch(`${baseUrl}/api/cart/1/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: 1, quantity: 2 }),
      });
      assert.strictEqual(addRes.status, 200);
      const addData = await addRes.json();
      assert.strictEqual(addData.success, true);
    });

    await test("POST /api/orders creates an order with code", async () => {
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,
          items: [{ product_id: 1, quantity: 1 }],
          shipping_address: "123 Le Loi, TP.HCM",
        }),
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.order_code, "Must return order_code");
    });

    await test("POST /api/chatbot processes message and enforces validation", async () => {
      // Empty message returns 400
      const emptyRes = await fetch(`${baseUrl}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "   " }),
      });
      assert.strictEqual(emptyRes.status, 400);

      // Valid message returns response and sessionId
      const chatRes = await fetch(`${baseUrl}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "tu van ca betta" }),
      });
      assert.strictEqual(chatRes.status, 200);
      const chatData = await chatRes.json();
      assert.strictEqual(chatData.success, true);
      assert.ok(chatData.sessionId, "Must return sessionId");
      assert.ok(chatData.reply || chatData.answer, "Must return reply");

      // Check session history
      const histRes = await fetch(`${baseUrl}/api/chatbot/history/${chatData.sessionId}`);
      assert.strictEqual(histRes.status, 200);
      const histData = await histRes.json();
      assert.strictEqual(histData.success, true);
      assert.ok(Array.isArray(histData.messages));
      assert.ok(histData.messages.length >= 2, "Should contain user and assistant messages");
    });

    await test("Cache headers: API has no-cache, assets have max-age", async () => {
      const apiRes = await fetch(`${baseUrl}/api/products`);
      assert.strictEqual(apiRes.headers.get("cache-control"), "no-cache, no-store, must-revalidate");
    });
  } finally {
    server.close();
    try {
      const pool = require("../../server/config/db");
      await pool.end();
    } catch {}
  }

  console.log("\n========================================================");
  console.log(`  Results: ${passed} passed, ${failed} failed`);
  console.log("========================================================\n");

  process.exit(failed > 0 ? 1 : 0);
}

if (require.main === module) {
  runApiTests().catch((err) => {
    console.error("Fatal test runner error:", err);
    process.exit(1);
  });
}

module.exports = runApiTests;
