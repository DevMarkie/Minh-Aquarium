/**
 * server/routes/chatRoutes.js
 * Modular routes for AI chatbot and chat session history
 */

const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");
const { chatRateLimiter } = require("../middleware/rateLimiter");

// Chat Assistant endpoints (support both /chatbot and /chat)
router.post(["/chatbot", "/chat"], chatRateLimiter, (req, res, next) =>
  chatController.handleChat(req, res, next)
);

// Session conversation history
router.get("/chatbot/history/:sessionId", (req, res, next) =>
  chatController.getChatHistory(req, res, next)
);

module.exports = router;
