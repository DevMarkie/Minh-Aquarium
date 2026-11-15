/**
 * scripts/migrate.js
 * Automated, idempotent database migration runner for Minh Aquarium
 * Usage:
 *   node scripts/migrate.js         (apply all pending migrations)
 *   node scripts/migrate.js status  (display status of all migrations)
 */

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const MIGRATIONS_DIR = path.join(__dirname, "..", "server", "db", "migrations");

async function createMigrationConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3307,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "minh_aquarium",
    multipleStatements: true,
  });
}

async function ensureMigrationsTable(connection) {
  const sql = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      version VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await connection.query(sql);
}

async function getAppliedVersions(connection) {
  await ensureMigrationsTable(connection);
  const [rows] = await connection.query("SELECT version, name, applied_at FROM schema_migrations ORDER BY version ASC");
  return rows;
}

function getMigrationFiles() {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    return [];
  }
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

async function runMigrations({ quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const connection = await createMigrationConnection();

  try {
    await ensureMigrationsTable(connection);
    const appliedRows = await getAppliedVersions(connection);
    const appliedSet = new Set(appliedRows.map((r) => r.version));
    const files = getMigrationFiles();

    log(`[migrate] Found ${files.length} migration file(s) in ${MIGRATIONS_DIR}`);
    const results = {
      applied: [],
      skipped: [],
    };

    for (const file of files) {
      const versionMatch = file.match(/^(\d+)/);
      const version = versionMatch ? versionMatch[1] : file;

      if (appliedSet.has(version)) {
        log(`[migrate] [SKIP] Migration ${file} already applied.`);
        results.skipped.push({ file, version });
        continue;
      }

      log(`[migrate] [APPLYING] ${file}...`);
      const filePath = path.join(MIGRATIONS_DIR, file);
      const sql = fs.readFileSync(filePath, "utf8");

      try {
        await connection.query(sql);
        await connection.query(
          "INSERT INTO schema_migrations (version, name) VALUES (?, ?)",
          [version, file],
        );
        log(`[migrate] [SUCCESS] Migration ${file} applied successfully.`);
        results.applied.push({ file, version });
      } catch (err) {
        // If an index, constraint, or column already exists, handle idempotently
        if (
          err.code === "ER_DUP_KEYNAME" ||
          err.code === "ER_CANT_DROP_FIELD_OR_KEY" ||
          err.code === "ER_CHECK_CONSTRAINT_DUP_NAME"
        ) {
          log(`[migrate] [IDEMPOTENT] Notice for ${file}: ${err.message}. Recording version.`);
          await connection.query(
            "INSERT INTO schema_migrations (version, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)",
            [version, file],
          );
          results.applied.push({ file, version });
        } else {
          console.error(`[migrate] [ERROR] Failed to apply migration ${file}:`, err);
          throw err;
        }
      }
    }

    log(`[migrate] Complete. Applied: ${results.applied.length}, Skipped: ${results.skipped.length}`);
    return results;
  } finally {
    await connection.end();
  }
}

async function getStatus() {
  const connection = await createMigrationConnection();
  try {
    const appliedRows = await getAppliedVersions(connection);
    const appliedMap = new Map(appliedRows.map((r) => [r.version, r]));
    const files = getMigrationFiles();

    const statusList = files.map((file) => {
      const versionMatch = file.match(/^(\d+)/);
      const version = versionMatch ? versionMatch[1] : file;
      const applied = appliedMap.get(version);

      return {
        version,
        file,
        status: applied ? "APPLIED" : "PENDING",
        applied_at: applied ? applied.applied_at : null,
      };
    });

    return statusList;
  } finally {
    await connection.end();
  }
}

// CLI handler
if (require.main === module) {
  const arg = process.argv[2];

  if (arg === "status") {
    getStatus()
      .then((status) => {
        console.table(status);
        process.exit(0);
      })
      .catch((err) => {
        console.error("[migrate:status] Error:", err);
        process.exit(1);
      });
  } else {
    runMigrations()
      .then(() => process.exit(0))
      .catch((err) => {
        console.error("[migrate] Fatal error:", err);
        process.exit(1);
      });
  }
}

module.exports = {
  runMigrations,
  getStatus,
  getAppliedVersions,
  getMigrationFiles,
};
