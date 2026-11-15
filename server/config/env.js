/**
 * server/config/env.js
 * Centralized environment configuration and paths
 */

const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const projectRoot = path.resolve(__dirname, "..", "..");
const distPath = path.join(projectRoot, "dist");
const srcPath = path.join(projectRoot, "src");
const hasDist = fs.existsSync(distPath);
const staticRoot = hasDist ? distPath : srcPath;
const docsPath = path.join(projectRoot, "docs", "nd.text");

let businessContext = "";
if (fs.existsSync(docsPath)) {
  try {
    businessContext = fs.readFileSync(docsPath, "utf8");
  } catch (err) {
    console.warn("Could not read docs/nd.text:", err.message);
  }
}

module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 3307,
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "minh_aquarium",
  DB_CONNECTION_LIMIT: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,

  // Gemini AI
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-1.5-flash",

  // Chat Configuration
  CHAT_RATE_LIMIT_PER_MINUTE:
    parseInt(process.env.CHAT_RATE_LIMIT_PER_MINUTE || "12", 10) || 12,
  CHAT_RETENTION_DAYS:
    parseInt(process.env.CHAT_RETENTION_DAYS || "30", 10) || 30,
  STAFF_PHONE: process.env.STAFF_PHONE || "0123456789",
  STAFF_ZALO_LINK: process.env.STAFF_ZALO_LINK || "",

  // Paths
  PROJECT_ROOT: projectRoot,
  DIST_PATH: distPath,
  SRC_PATH: srcPath,
  HAS_DIST: hasDist,
  STATIC_ROOT: staticRoot,
  DOCS_PATH: docsPath,
  BUSINESS_CONTEXT: businessContext,
};
