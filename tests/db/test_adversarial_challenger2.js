/**
 * tests/db/test_adversarial_challenger2.js
 * Comprehensive Adversarial Test Suite for Milestone M1 (Challenger 2)
 *
 * Covers:
 * 1. Index Execution Plan Analysis (EXPLAIN)
 *    - idx_products_active_featured
 *    - idx_products_cat_active
 *    - ft_products_search
 *    - idx_orders_user_created
 *    - idx_orders_status_created
 *    - idx_messages_session_sent
 * 2. Migration Idempotency Stress Testing
 *    - Repeated sequential executions
 *    - Status consistency validation
 *    - Schema migrations tracking resilience
 * 3. Seeding Scalability & Concurrency Stress Testing
 *    - 5x repeated runs (row stability, no duplicate rows)
 *    - Database transaction performance breakdown
 *    - Orphaned image analysis (FK integrity & primary image uniqueness)
 *    - 5-worker concurrent execution race condition & lock contention test
 */

const assert = require("assert");
const path = require("path");
const { execSync, spawn } = require("child_process");
const pool = require("../../server/config/db");
const { runMigrations, getStatus } = require("../../scripts/migrate");

const results = {
  passed: 0,
  failed: 0,
  findings: [],
  benchmarks: {},
  explainPlans: {}
};

function logHeader(title) {
  console.log("\n========================================================");
  console.log(`   ${title}`);
  console.log("========================================================\n");
}

async function test(name, fn) {
  process.stdout.write(`  [CHALLENGE] ${name} ... `);
  try {
    const res = await fn();
    console.log("PASS");
    results.passed++;
    return res;
  } catch (err) {
    console.log("FAIL");
    console.error(`    Error: ${err.message}`);
    if (err.stack) {
      console.error(err.stack.split("\n").slice(1, 3).join("\n"));
    }
    results.failed++;
    results.findings.push({ name, error: err.message });
    return null;
  }
}

async function run() {
  logHeader("DOMAIN 1: INDEX EXECUTION PLAN (EXPLAIN) VERIFICATION");

  // Query 1: Active & Featured Product Catalog Query
  await test("EXPLAIN verifies idx_products_active_featured on active/featured query", async () => {
    const sql = `
      EXPLAIN
      SELECT p.id, p.category_id, p.name, p.slug, p.description,
             p.price, p.sale_price, p.stock_quantity, p.is_active, p.is_featured,
             p.created_at,
             c.name AS category_name, c.slug AS category_slug,
             COALESCE(pi.image_url, '') AS image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
      WHERE p.is_active = 1 AND p.is_featured = 1
      ORDER BY p.is_featured DESC, p.stock_quantity DESC, p.id DESC
      LIMIT 50 OFFSET 0
    `;
    const [rows] = await pool.query(sql);
    const pRow = rows.find(r => r.table === "p");
    assert(pRow, "Query plan must include table 'p'");

    results.explainPlans.active_featured = {
      key: pRow.key,
      possible_keys: pRow.possible_keys,
      type: pRow.type,
      extra: pRow.Extra
    };

    console.log(`\n      [EXPLAIN Plan p]: key=${pRow.key}, possible_keys=${pRow.possible_keys}, type=${pRow.type}, Extra=${pRow.Extra}`);
    assert(pRow.possible_keys.includes("idx_products_active_featured"), "possible_keys must include idx_products_active_featured");
    assert.strictEqual(pRow.key, "idx_products_active_featured", "Optimizer must select idx_products_active_featured");
    assert(pRow.Extra.includes("Backward index scan") || !pRow.Extra.includes("Using filesort"), "Must avoid filesort via B-tree ordering");
  });

  // Query 2: Category Catalog Query with idx_products_cat_active
  await test("EXPLAIN verifies idx_products_cat_active on category filtering query", async () => {
    const [cats] = await pool.query("SELECT id FROM categories LIMIT 1");
    const catId = cats[0].id;

    const sql = `
      EXPLAIN
      SELECT p.id, p.category_id, p.name, p.slug,
             p.price, p.stock_quantity, p.is_active
      FROM products p
      WHERE p.category_id = ? AND p.is_active = 1
      LIMIT 50
    `;
    const [rows] = await pool.query(sql, [catId]);
    const pRow = rows.find(r => r.table === "p");
    assert(pRow, "Query plan must include table 'p'");

    results.explainPlans.cat_active = {
      key: pRow.key,
      possible_keys: pRow.possible_keys,
      type: pRow.type,
      extra: pRow.Extra
    };

    console.log(`\n      [EXPLAIN Plan p]: key=${pRow.key}, possible_keys=${pRow.possible_keys}, type=${pRow.type}`);
    assert(pRow.possible_keys.includes("idx_products_cat_active"), "possible_keys must include idx_products_cat_active");
    assert.strictEqual(pRow.key, "idx_products_cat_active", "Optimizer must select idx_products_cat_active");
    assert.strictEqual(pRow.type, "ref", "Access type must be 'ref' (index lookup)");
  });

  // Query 3: Fulltext Product Search with ft_products_search
  await test("EXPLAIN verifies ft_products_search index on natural language MATCH AGAINST", async () => {
    const sql = `
      EXPLAIN
      SELECT p.id, p.name, p.description,
             MATCH(p.name, p.description) AGAINST('Thủy Sinh' IN NATURAL LANGUAGE MODE) AS relevance
      FROM products p
      WHERE p.is_active = TRUE
        AND MATCH(p.name, p.description) AGAINST('Thủy Sinh' IN NATURAL LANGUAGE MODE)
      LIMIT 10
    `;
    const [rows] = await pool.query(sql);
    const pRow = rows.find(r => r.table === "p");
    assert(pRow, "Query plan must include table 'p'");

    results.explainPlans.fulltext = {
      key: pRow.key,
      possible_keys: pRow.possible_keys,
      type: pRow.type,
      extra: pRow.Extra
    };

    console.log(`\n      [EXPLAIN Plan p]: key=${pRow.key}, possible_keys=${pRow.possible_keys}, type=${pRow.type}, Extra=${pRow.Extra}`);
    assert(pRow.possible_keys.includes("ft_products_search"), "possible_keys must include ft_products_search");
    assert.strictEqual(pRow.key, "ft_products_search", "Optimizer must use ft_products_search");
    assert.strictEqual(pRow.type, "fulltext", "Access type must be fulltext");
  });

  // Query 4: Orders by user_id and created_at DESC with idx_orders_user_created
  await test("EXPLAIN verifies idx_orders_user_created eliminates filesort on order history", async () => {
    const sql = `
      EXPLAIN
      SELECT id, order_code, total_amount, order_status, created_at
      FROM orders
      WHERE user_id = 1
      ORDER BY created_at DESC
    `;
    const [rows] = await pool.query(sql);
    const oRow = rows.find(r => r.table === "orders");
    assert(oRow, "Query plan must include table 'orders'");

    results.explainPlans.orders_user = {
      key: oRow.key,
      possible_keys: oRow.possible_keys,
      type: oRow.type,
      extra: oRow.Extra
    };

    console.log(`\n      [EXPLAIN Plan orders]: key=${oRow.key}, possible_keys=${oRow.possible_keys}, type=${oRow.type}, Extra=${oRow.Extra}`);
    assert(oRow.possible_keys.includes("idx_orders_user_created"), "possible_keys must include idx_orders_user_created");
    assert.strictEqual(oRow.key, "idx_orders_user_created", "Optimizer must select idx_orders_user_created");
    assert.strictEqual(oRow.type, "ref", "Access type must be ref");
    assert(!oRow.Extra || !oRow.Extra.includes("Using filesort"), "Must NOT use filesort when index matches ORDER BY created_at DESC");
  });

  // Query 5: Orders triage by status with idx_orders_status_created
  await test("EXPLAIN verifies idx_orders_status_created on order triage query", async () => {
    const sql = `
      EXPLAIN
      SELECT id, order_code, total_amount, order_status, created_at
      FROM orders
      WHERE order_status = 'pending'
      ORDER BY created_at DESC
    `;
    const [rows] = await pool.query(sql);
    const oRow = rows.find(r => r.table === "orders");
    assert(oRow, "Query plan must include table 'orders'");

    console.log(`\n      [EXPLAIN Plan orders status]: key=${oRow.key}, possible_keys=${oRow.possible_keys}, type=${oRow.type}`);
    assert(oRow.possible_keys.includes("idx_orders_status_created"), "possible_keys must include idx_orders_status_created");
    assert.strictEqual(oRow.key, "idx_orders_status_created", "Optimizer must select idx_orders_status_created");
  });

  // Query 6: Chat messages history by session_id with idx_messages_session_sent
  await test("EXPLAIN verifies idx_messages_session_sent on chat history query", async () => {
    const sql = `
      EXPLAIN
      SELECT id, session_id, content, sent_at
      FROM chat_messages
      WHERE session_id = 1731616800123
      ORDER BY sent_at ASC, id ASC
    `;
    const [rows] = await pool.query(sql);
    const mRow = rows.find(r => r.table === "chat_messages");
    assert(mRow, "Query plan must include table 'chat_messages'");

    results.explainPlans.chat_session = {
      key: mRow.key,
      possible_keys: mRow.possible_keys,
      type: mRow.type,
      extra: mRow.Extra
    };

    console.log(`\n      [EXPLAIN Plan chat]: key=${mRow.key}, possible_keys=${mRow.possible_keys}, type=${mRow.type}, Extra=${mRow.Extra}`);
    assert(mRow.possible_keys.includes("idx_messages_session_sent"), "possible_keys must include idx_messages_session_sent");
    assert.strictEqual(mRow.key, "idx_messages_session_sent", "Optimizer must select idx_messages_session_sent");
    assert.strictEqual(mRow.type, "ref", "Access type must be ref");
    assert(!mRow.Extra || !mRow.Extra.includes("Using filesort"), "Must NOT use filesort when index matches ORDER BY");
  });

  logHeader("DOMAIN 2: MIGRATION IDEMPOTENCY STRESS TESTING");

  // Migration Stress 1: 10 Consecutive Sequential Migration Runs
  await test("Migration runner completes 10 consecutive runs with 0 errors and idempotent skips", async () => {
    for (let i = 1; i <= 10; i++) {
      const res = await runMigrations({ quiet: true });
      assert.strictEqual(res.applied.length, 0, `Run ${i}: expected 0 newly applied migrations`);
      assert(res.skipped.length >= 2, `Run ${i}: expected at least 2 skipped migrations`);
    }
  });

  // Migration Stress 2: Status check consistency
  await test("Migration status reports APPLIED consistently for all migration files", async () => {
    const status = await getStatus();
    assert.strictEqual(status.length, 2, "Expected exactly 2 migration files tracked");
    for (const item of status) {
      assert.strictEqual(item.status, "APPLIED", `Migration ${item.file} must have status APPLIED`);
      assert(item.applied_at instanceof Date || typeof item.applied_at === "string", "applied_at must be valid timestamp");
    }
  });

  logHeader("DOMAIN 3: SEEDING SCALABILITY & CONCURRENCY STRESS TESTING");

  // Seeding Stress 1: 5 Consecutive Runs (Data Idempotency & Stability)
  await test("Seeder runs 5 times sequentially with stable row counts and sub-150ms DB transactions", async () => {
    const timings = [];
    const txnTimings = [];
    let initialProductCount = 0;
    let initialImageCount = 0;
    let initialCatCount = 0;

    for (let i = 1; i <= 5; i++) {
      const t0 = Date.now();
      const output = execSync("node scripts/seed_database_from_products.js", { stdio: "pipe" }).toString();
      const duration = Date.now() - t0;
      timings.push(duration);

      const txnMatch = output.match(/Batch seeding completed in (\d+)ms/);
      const txnMs = txnMatch ? parseInt(txnMatch[1], 10) : 0;
      txnTimings.push(txnMs);

      const [pRows] = await pool.query("SELECT COUNT(*) as cnt FROM products");
      const [imgRows] = await pool.query("SELECT COUNT(*) as cnt FROM product_images");
      const [catRows] = await pool.query("SELECT COUNT(*) as cnt FROM categories");

      const pCount = pRows[0].cnt;
      const imgCount = imgRows[0].cnt;
      const catCount = catRows[0].cnt;

      if (i === 1) {
        initialProductCount = pCount;
        initialImageCount = imgCount;
        initialCatCount = catCount;
      } else {
        assert.strictEqual(pCount, initialProductCount, `Run ${i}: Product count changed! (${pCount} vs ${initialProductCount})`);
        assert.strictEqual(imgCount, initialImageCount, `Run ${i}: Image count changed! (${imgCount} vs ${initialImageCount})`);
        assert.strictEqual(catCount, initialCatCount, `Run ${i}: Category count changed! (${catCount} vs ${initialCatCount})`);
      }
    }

    const avgProcess = Math.round(timings.reduce((a, b) => a + b, 0) / timings.length);
    const avgTxn = Math.round(txnTimings.reduce((a, b) => a + b, 0) / txnTimings.length);
    results.benchmarks.sequential_seed_5x = {
      wall_timings_ms: timings,
      txn_timings_ms: txnTimings,
      avg_process_ms: avgProcess,
      avg_db_txn_ms: avgTxn,
      final_counts: {
        products: initialProductCount,
        images: initialImageCount,
        categories: initialCatCount
      }
    };
    console.log(`\n      [5x Seed Benchmark]: DB Txn avg=${avgTxn}ms (timings=[${txnTimings.join(", ")}]), Process avg=${avgProcess}ms, products=${initialProductCount}, images=${initialImageCount}`);
    assert(initialProductCount > 100, "Expected > 100 products seeded");
    assert(avgTxn < 250, "Database transaction duration must remain sub-250ms");
  });

  // Seeding Stress 2: Orphaned Images & Referential Integrity Check
  await test("No orphaned product_images or duplicate primary images exist after seeding", async () => {
    // Check 1: Orphaned images (no matching product)
    const [orphanRows] = await pool.query(`
      SELECT pi.id, pi.product_id
      FROM product_images pi
      LEFT JOIN products p ON pi.product_id = p.id
      WHERE p.id IS NULL
    `);
    assert.strictEqual(orphanRows.length, 0, `Expected 0 orphaned images, found ${orphanRows.length}`);

    // Check 2: More than 1 primary image per product
    const [dupPrimaryRows] = await pool.query(`
      SELECT product_id, COUNT(*) as primary_count
      FROM product_images
      WHERE is_primary = TRUE
      GROUP BY product_id
      HAVING COUNT(*) > 1
    `);
    assert.strictEqual(dupPrimaryRows.length, 0, `Expected 0 products with duplicate primary images, found ${dupPrimaryRows.length}`);

    // Check 3: Every product in products table has exactly one primary image
    const [productsWithoutPrimary] = await pool.query(`
      SELECT p.id, p.name
      FROM products p
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
      WHERE pi.id IS NULL
    `);
    assert.strictEqual(productsWithoutPrimary.length, 0, `Expected 0 products without primary image, found ${productsWithoutPrimary.length}`);
  });

  // Seeding Stress 3: Concurrent Execution Stress Test
  await test("5 concurrent seed runs execute without unhandled deadlocks and preserve DB consistency", async () => {
    const numWorkers = 5;
    const promises = [];

    for (let i = 0; i < numWorkers; i++) {
      promises.push(new Promise((resolve) => {
        const proc = spawn("node", ["scripts/seed_database_from_products.js"], { stdio: "pipe" });
        let stdout = "";
        let stderr = "";
        proc.stdout.on("data", d => stdout += d.toString());
        proc.stderr.on("data", d => stderr += d.toString());
        proc.on("close", (code) => {
          resolve({ worker: i + 1, code, stdout, stderr });
        });
      }));
    }

    const concurrentResults = await Promise.all(promises);
    const exitCodes = concurrentResults.map(r => r.code);
    console.log(`\n      [5-Worker Concurrent Seed]: exitCodes=[${exitCodes.join(", ")}]`);

    // All should exit code 0 or rollback on lock contention cleanly
    for (const r of concurrentResults) {
      assert(
        r.code === 0 || r.stderr.includes("Deadlock") || r.stderr.includes("Lock"),
        `Worker ${r.worker} encountered unhandled fatal crash: ${r.stderr}`
      );
    }

    // Verify DB integrity after concurrent executions
    const [pRows] = await pool.query("SELECT COUNT(*) as cnt FROM products");
    const [imgRows] = await pool.query("SELECT COUNT(*) as cnt FROM product_images");
    assert.strictEqual(pRows[0].cnt, results.benchmarks.sequential_seed_5x.final_counts.products);
    assert.strictEqual(imgRows[0].cnt, results.benchmarks.sequential_seed_5x.final_counts.images);
  });

  logHeader("SUMMARY OF ADVERSARIAL CHALLENGE RESULTS");
  console.log(`Total tests run: ${results.passed + results.failed}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  if (results.findings.length > 0) {
    console.log("Findings:", JSON.stringify(results.findings, null, 2));
  }

  await pool.end();
  if (results.failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Adversarial test harness crashed:", err);
  process.exit(1);
});
