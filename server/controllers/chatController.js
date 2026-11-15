/**
 * server/controllers/chatController.js
 * Controller for Gemini chat assistant and conversation history
 */

const chatService = require("../services/chatService");

class ChatController {
  async handleChat(req, res, next) {
    const { message, sessionId } = req.body || {};
    const userMessage = (message || "").toString().trim();

    if (!userMessage) {
      return res.status(400).json({
        success: false,
        error: "Nội dung chat không được để trống.",
      });
    }

    if (userMessage.length > 500) {
      return res.status(400).json({
        success: false,
        error: "Tin nhắn tối đa 500 ký tự.",
      });
    }

    try {
      const response = await chatService.processMessage(userMessage, sessionId);
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getChatHistory(req, res, next) {
    const sessionId = req.params.sessionId;
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: "sessionId không hợp lệ.",
      });
    }

    try {
      const messages = chatService.getHistory(sessionId);
      res.json({
        success: true,
        messages,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChatController();
