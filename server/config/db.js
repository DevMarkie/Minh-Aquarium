const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

/**
 * Hardened MySQL Connection Pool for Minh Aquarium
 * - enableKeepAlive: Keeps TCP connection active across idle intervals
 * - keepAliveInitialDelay: 10s initial delay before keepalive probes
 * - idleTimeout: 60s idle timeout before recycling inactive connections
 * - waitForConnections: Queue requests when pool limits are reached
 * - connectionLimit: 10 concurrent connections
 * - Error listener on pool to catch and log unhandled socket disconnects
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 3307,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "minh_aquarium",
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
  queueLimit: 0,
  supportBigNumbers: true,
  bigNumberStrings: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  idleTimeout: 60000,
});

pool.on("error", (err) => {
  console.error("[MySQL Pool Error]:", err.message || err);
});

module.exports = pool;
