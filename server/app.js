/**
 * server/app.js
 * Express Application Configuration
 * Layered modular architecture decoupled from server listening lifecycle
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const {
  STATIC_ROOT,
  DIST_PATH,
  SRC_PATH,
  HAS_DIST,
} = require("./config/env");

const cacheControl = require("./middleware/cacheControl");
const errorHandler = require("./middleware/errorHandler");
const apiRoutes = require("./routes/apiRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(cacheControl);

// Static Asset Serving with intelligent caching
app.use(express.static(STATIC_ROOT));

// Root route fallback
app.get("/", (req, res) => {
  const indexPath = HAS_DIST
    ? path.join(DIST_PATH, "index.html")
    : path.join(SRC_PATH, "index.html");
  res.sendFile(indexPath);
});

// Mount Modular API Routes
app.use("/api", apiRoutes);
app.use("/api", chatRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
