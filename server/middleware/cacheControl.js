/**
 * server/middleware/cacheControl.js
 * Intelligent Cache-Control and HTTP headers middleware for API & static assets
 */

function cacheControlMiddleware(req, res, next) {
  const url = req.url;

  // Do not cache API responses by default to ensure real-time accuracy
  if (url.startsWith("/api/")) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    return next();
  }

  // Immutable caching for hashed assets produced by Vite (e.g. index-my9l4CGf.js)
  if (/\.(js|css|webp|png|jpg|jpeg|gif|svg|woff2?)$/i.test(url)) {
    if (/-[a-zA-Z0-9_-]{8}\./.test(url)) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
    }
  }

  next();
}

module.exports = cacheControlMiddleware;
