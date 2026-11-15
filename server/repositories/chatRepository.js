/**
 * server/repositories/chatRepository.js
 * Data access repository for Chat Sessions and Messages
 * Supports 64-bit BIGINT session IDs (Date.now() epoch values)
 * Uses indexes: idx_messages_session_sent, idx_messages_sent_at
 */

const pool = require("../config/db");

function encodeRoleContent(role, text) {
  const normalizedRole = (role || "user").toUpperCase();
  return `[${normalizedRole}]: ${text}`;
}

function parseRoleContent(rawContent) {
  const match = (rawContent || "").match(/^\[(USER|ASSISTANT|SYSTEM|STAFF)\]:\s*([\s\S]*)$/i);
  if (!match) {
    return { role: "assistant", text: rawContent || "" };
  }
  return {
    role: match[1].toLowerCase(),
    text: match[2],
  };
}

class ChatRepository {
  /**
   * Create or ensure a chat session exists
   * Can accept a custom BIGINT sessionId (e.g. Date.now()) or auto-generate
   * @param {number|string} [sessionId]
   * @param {number|null} [userId=null]
   * @param {number|null} [staffId=null]
   * @returns {Promise<string>} sessionId as string
   */
  async createSession(sessionId = null, userId = null, staffId = null) {
    if (sessionId) {
      const parsedId = BigInt(sessionId).toString();
      const sql = `
        INSERT INTO chat_sessions (id, user_id, staff_id)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          user_id = COALESCE(VALUES(user_id), user_id),
          staff_id = COALESCE(VALUES(staff_id), staff_id)
      `;
      await pool.query(sql, [parsedId, userId, staffId]);
      return parsedId;
    }

    const sql = "INSERT INTO chat_sessions (user_id, staff_id) VALUES (?, ?)";
    const [result] = await pool.query(sql, [userId, staffId]);
    return result.insertId.toString();
  }

  /**
   * Retrieve session metadata
   * @param {number|string} sessionId
   * @returns {Promise<Object|null>}
   */
  async getSessionById(sessionId) {
    const parsedId = BigInt(sessionId).toString();
    const [rows] = await pool.query(
      "SELECT id, user_id, staff_id, status, created_at FROM chat_sessions WHERE id = ? LIMIT 1",
      [parsedId],
    );
    return rows[0] || null;
  }

  /**
   * Store a message in a chat session
   * Automatically ensures session exists prior to message insertion
   * @param {number|string} sessionId
   * @param {number|null} senderId
   * @param {string} message
   * @param {string} [role='user'] - 'user' | 'assistant' | 'system'
   * @returns {Promise<number>} Inserted message id
   */
  async saveMessage(sessionId, senderId, message, role = "user") {
    const parsedSessionId = BigInt(sessionId).toString();

    // Ensure session exists
    await this.createSession(parsedSessionId, senderId);

    const formattedContent = encodeRoleContent(role, message);
    const sql = `
      INSERT INTO chat_messages (session_id, sender_id, content, is_read)
      VALUES (?, ?, ?, FALSE)
    `;

    const [result] = await pool.query(sql, [parsedSessionId, senderId, formattedContent]);
    return result.insertId;
  }

  /**
   * Retrieve message history for a session ordered chronologically
   * Utilizes idx_messages_session_sent index
   * @param {number|string} sessionId
   * @param {number} [limit=50]
   * @returns {Promise<Array<Object>>}
   */
  async getHistory(sessionId, limit = 50) {
    const parsedSessionId = BigInt(sessionId).toString();

    const sql = `
      SELECT id, session_id, sender_id, content, is_read, sent_at
      FROM chat_messages
      WHERE session_id = ?
      ORDER BY sent_at ASC, id ASC
      LIMIT ?
    `;

    const [rows] = await pool.query(sql, [parsedSessionId, Number(limit)]);
    return rows.map((row) => {
      const parsed = parseRoleContent(row.content);
      return {
        id: row.id,
        sessionId: row.session_id.toString(),
        senderId: row.sender_id,
        role: parsed.role,
        text: parsed.text,
        sentAt: row.sent_at,
        isRead: Boolean(row.is_read),
      };
    });
  }

  /**
   * Delete messages older than specified retention days
   * Utilizes idx_messages_sent_at index
   * @param {number} [retentionDays=30]
   * @returns {Promise<number>} Number of deleted messages
   */
  async cleanupOldMessages(retentionDays = 30) {
    const days = parseInt(retentionDays, 10) || 30;
    const sql = "DELETE FROM chat_messages WHERE sent_at < DATE_SUB(NOW(), INTERVAL ? DAY)";
    const [result] = await pool.query(sql, [days]);
    return result.affectedRows;
  }
}

module.exports = new ChatRepository();
