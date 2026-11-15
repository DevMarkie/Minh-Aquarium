/**
 * server/services/authService.js
 * Business logic for user authentication
 */

class AuthService {
  async login({ email, password, passwordHash }) {
    if (!email) {
      throw new Error("Missing email");
    }

    return {
      success: true,
      user: {
        id: 1,
        full_name: email.split("@")[0] || "User",
        email,
        role: "customer",
      },
      token: "mock-jwt-token-" + Date.now(),
    };
  }
}

module.exports = new AuthService();
