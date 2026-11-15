/**
 * server/middleware/rateLimiter.js
 * Bounded sliding-window rate limiter with automatic TTL expiration to prevent memory leaks
 */

const { CHAT_RATE_LIMIT_PER_MINUTE } = require("../config/env");

class BoundedRateLimiter {
  constructor(maxIps = 5000, ttlMs = 60000) {
    this.maxIps = maxIps;
    this.ttlMs = ttlMs;
    this.ipMap = new Map();

    // Periodic cleanup to eliminate memory leaks from stale IPs
    this.cleanupTimer = setInterval(() => {
      this.purgeExpired();
    }, ttlMs);

    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  purgeExpired() {
    const now = Date.now();
    const cutoff = now - this.ttlMs;
    for (const [ip, timestamps] of this.ipMap.entries()) {
      const active = timestamps.filter((t) => t >= cutoff);
      if (active.length === 0) {
        this.ipMap.delete(ip);
      } else {
        this.ipMap.set(ip, active);
      }
    }
  }

  isLimited(ip, limit = CHAT_RATE_LIMIT_PER_MINUTE) {
    const now = Date.now();
    const cutoff = now - this.ttlMs;

    let timestamps = this.ipMap.get(ip) || [];
    timestamps = timestamps.filter((t) => t >= cutoff);

    if (timestamps.length >= limit) {
      this.ipMap.set(ip, timestamps);
      return true;
    }

    // Bounded map eviction if capacity exceeded
    if (this.ipMap.size >= this.maxIps && !this.ipMap.has(ip)) {
      const oldestKey = this.ipMap.keys().next().value;
      if (oldestKey) this.ipMap.delete(oldestKey);
    }

    timestamps.push(now);
    this.ipMap.set(ip, timestamps);
    return false;
  }
}

const limiter = new BoundedRateLimiter();

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

function chatRateLimiter(req, res, next) {
  const ip = getClientIp(req);
  if (limiter.isLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: "Bạn gửi quá nhanh. Vui lòng thử lại sau 1 phút.",
    });
  }
  next();
}

module.exports = {
  chatRateLimiter,
  BoundedRateLimiter,
  getClientIp,
};
