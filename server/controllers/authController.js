/**
 * server/controllers/authController.js
 * Controller for user authentication
 */

const authService = require("../services/authService");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password, passwordHash } = req.body || {};
      if (!email) {
        return res.status(400).json({ success: false, error: "Missing email" });
      }
      const result = await authService.login({ email, password, passwordHash });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
