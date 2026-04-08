// server.js - Express backend for Minh Aquarium
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'minh_aquarium',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper to run queries
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// ---------- API ENDPOINTS ----------

// 1. Get all active products
app.get('/api/products', async (req, res) => {
  try {
    const products = await query('SELECT * FROM products WHERE is_active = TRUE');
    res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Thiếu email hoặc mật khẩu' });
  }
  try {
    const users = await query('SELECT id, full_name, email, role FROM users WHERE email = ? AND password_hash = ?', [email, password]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, error: 'Sai email hoặc mật khẩu' });
    }
    res.json({ success: true, user: users[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2b. User Register
app.post('/api/register', async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Vui lòng nhập đầy đủ thông tin' });
  }
  try {
    const result = await query('INSERT INTO users (full_name, email, password_hash) VALUES (?,?,?)', [full_name, email, password]);
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, error: 'Email đã tồn tại' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get cart for a user (including product details)
app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await query(
      `SELECT ci.id, ci.quantity, p.id AS product_id, p.name, p.price, p.image_url
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );
    res.json({ success: true, items: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Add / update an item in the cart
app.post('/api/cart/:userId/add', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ success: false, error: 'productId and quantity required' });
  }
  try {
    // Ensure a cart exists for the user
    let carts = await query('SELECT id FROM carts WHERE user_id = ?', [userId]);
    let cartId;
    if (carts.length === 0) {
      const result = await query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
      cartId = result.insertId;
    } else {
      cartId = carts[0].id;
    }
    // Upsert cart item
    const existing = await query('SELECT id FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
    if (existing.length > 0) {
      await query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, existing[0].id]);
    } else {
      await query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)', [cartId, productId, quantity]);
    }
    res.json({ success: true, message: 'Cart updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Create an order (very simplified – assumes cart items are already validated)
app.post('/api/orders', async (req, res) => {
  const { userId, recipient_name, recipient_phone, shipping_address, payment_method, is_express_ship, note } = req.body;
  if (!userId || !recipient_name || !recipient_phone || !shipping_address || !payment_method) {
    return res.status(400).json({ success: false, error: 'Missing required order fields' });
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    // Get cart and calculate totals
    const cartRows = await connection.query(
      `SELECT ci.product_id, ci.quantity, p.price, p.name
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );
    if (cartRows[0].length === 0) {
      throw new Error('Cart is empty');
    }
    let subtotal = 0;
    cartRows[0].forEach(row => {
      subtotal += row.price * row.quantity;
    });
    const shipping_fee = is_express_ship ? 20.0 : 0.0; // example flat fee
    const total_amount = subtotal + shipping_fee;
    const order_code = 'ORD-' + Date.now();
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, order_code, subtotal, shipping_fee, total_amount, recipient_name, recipient_phone, shipping_address, payment_method, is_express_ship, payment_status, order_status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [userId, order_code, subtotal, shipping_fee, total_amount, recipient_name, recipient_phone, shipping_address, payment_method, is_express_ship, 'pending', 'pending']
    );
    const orderId = orderResult.insertId;
    // Insert order items
    const orderItemValues = cartRows[0].map(row => [orderId, row.product_id, row.quantity, row.price, row.name]);
    await connection.query(
      `INSERT INTO order_items (order_id, product_id, quantity, unit_price, product_name) VALUES ?`,
      [orderItemValues]
    );
    // Clear cart
    await connection.query('DELETE ci FROM cart_items ci JOIN carts c ON ci.cart_id = c.id WHERE c.user_id = ?', [userId]);
    await connection.commit();
    res.json({ success: true, order_id: orderId, order_code });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    connection.release();
  }
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
