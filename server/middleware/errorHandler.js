/**
 * server/middleware/errorHandler.js
 * Centralized error handling middleware
 */

function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Đã xảy ra lỗi máy chủ nội bộ.";

  if (process.env.NODE_ENV !== "test") {
    console.error(`[Server Error] [${req.method}] ${req.url}:`, err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}

module.exports = errorHandler;
