/**
 * server/repositories/productRepository.js
 * Data access repository for Products
 * Uses indexes: idx_products_active_featured, idx_products_cat_active, and ft_products_search
 */

const pool = require("../config/db");

class ProductRepository {
  /**
   * Retrieve products matching specified filters
   * @param {Object} [filters]
   * @param {number} [filters.categoryId]
   * @param {boolean} [filters.isActive=true]
   * @param {boolean} [filters.isFeatured]
   * @param {number} [filters.limit=50]
   * @param {number} [filters.offset=0]
   * @param {string} [filters.sortBy='featured'] - 'featured' | 'price_asc' | 'price_desc' | 'newest'
   * @returns {Promise<Array<Object>>}
   */
  async getAll(filters = {}) {
    const {
      categoryId,
      isActive = true,
      isFeatured,
      limit = 50,
      offset = 0,
      sortBy = "featured",
    } = filters;

    const conditions = [];
    const params = [];

    if (isActive !== undefined && isActive !== null) {
      conditions.push("p.is_active = ?");
      params.push(isActive ? 1 : 0);
    }

    if (categoryId !== undefined && categoryId !== null) {
      conditions.push("p.category_id = ?");
      params.push(categoryId);
    }

    if (isFeatured !== undefined && isFeatured !== null) {
      conditions.push("p.is_featured = ?");
      params.push(isFeatured ? 1 : 0);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    let orderBy = "p.is_featured DESC, p.stock_quantity DESC, p.id DESC";
    if (sortBy === "price_asc") {
      orderBy = "p.price ASC, p.id DESC";
    } else if (sortBy === "price_desc") {
      orderBy = "p.price DESC, p.id DESC";
    } else if (sortBy === "newest") {
      orderBy = "p.created_at DESC, p.id DESC";
    }

    const sql = `
      SELECT p.id, p.category_id, p.name, p.slug, p.description,
             p.price, p.sale_price, p.stock_quantity, p.is_active, p.is_featured,
             p.created_at,
             c.name AS category_name, c.slug AS category_slug,
             COALESCE(pi.image_url, '') AS image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    params.push(Number(limit), Number(offset));
    const [rows] = await pool.query(sql, params);
    return rows;
  }

  /**
   * Retrieve a product by primary key with all associated images and specifications
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  async getById(id) {
    const sql = `
      SELECT p.id, p.category_id, p.name, p.slug, p.description,
             p.price, p.sale_price, p.stock_quantity, p.is_active, p.is_featured,
             p.created_at,
             c.name AS category_name, c.slug AS category_slug,
             COALESCE(pi.image_url, '') AS image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
      WHERE p.id = ?
      LIMIT 1
    `;

    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return null;
    }

    const product = rows[0];

    // Fetch all gallery images
    const [images] = await pool.query(
      "SELECT id, image_url, is_primary, sort_order FROM product_images WHERE product_id = ? ORDER BY sort_order ASC, id ASC",
      [id],
    );
    product.images = images;

    // Fetch specifications
    const [specs] = await pool.query(
      "SELECT spec_key, spec_value FROM product_specs WHERE product_id = ?",
      [id],
    );
    product.specs = specs;

    return product;
  }

  /**
   * Retrieve a product by slug
   * @param {string} slug
   * @returns {Promise<Object|null>}
   */
  async getBySlug(slug) {
    const [rows] = await pool.query("SELECT id FROM products WHERE slug = ? LIMIT 1", [slug]);
    if (rows.length === 0) return null;
    return this.getById(rows[0].id);
  }

  /**
   * Natural Language Fulltext Search on product name and description
   * Utilizes the ft_products_search FULLTEXT index
   * @param {string} keyword
   * @param {number} [limit=10]
   * @returns {Promise<Array<Object>>}
   */
  async search(keyword, limit = 10) {
    const trimmed = (keyword || "").trim();
    if (!trimmed) {
      return [];
    }

    // Try fulltext match first
    try {
      const ftSql = `
        SELECT p.id, p.category_id, p.name, p.slug, p.description,
               p.price, p.sale_price, p.stock_quantity, p.is_active, p.is_featured,
               c.name AS category_name,
               COALESCE(pi.image_url, '') AS image_url,
               MATCH(p.name, p.description) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
        WHERE p.is_active = TRUE
          AND MATCH(p.name, p.description) AGAINST(? IN NATURAL LANGUAGE MODE)
        ORDER BY relevance DESC, p.is_featured DESC
        LIMIT ?
      `;

      const [rows] = await pool.query(ftSql, [trimmed, trimmed, Number(limit)]);
      if (rows.length > 0) {
        return rows;
      }
    } catch (_err) {
      // Fall through to fallback wildcard search if fulltext query encounters token constraints
    }

    // Fallback for short keywords (< 3 characters) or wildcard prefix matching
    const fallbackSql = `
      SELECT p.id, p.category_id, p.name, p.slug, p.description,
             p.price, p.sale_price, p.stock_quantity, p.is_active, p.is_featured,
             c.name AS category_name,
             COALESCE(pi.image_url, '') AS image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = TRUE
      WHERE p.is_active = TRUE
        AND (p.name LIKE ? OR p.description LIKE ?)
      ORDER BY p.is_featured DESC, p.stock_quantity DESC
      LIMIT ?
    `;

    const wildcard = `%${trimmed}%`;
    const [fallbackRows] = await pool.query(fallbackSql, [wildcard, wildcard, Number(limit)]);
    return fallbackRows;
  }

  /**
   * Create a new product
   * @param {Object} data
   * @returns {Promise<number>} Inserted product id
   */
  async create(data) {
    const {
      categoryId = null,
      name,
      slug,
      description = null,
      price,
      salePrice = null,
      stockQuantity = 0,
      isActive = true,
      isFeatured = false,
    } = data;

    const sql = `
      INSERT INTO products
        (category_id, name, slug, description, price, sale_price, stock_quantity, is_active, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [
      categoryId,
      name,
      slug,
      description,
      price,
      salePrice,
      stockQuantity,
      isActive ? 1 : 0,
      isFeatured ? 1 : 0,
    ]);

    return result.insertId;
  }

  /**
   * Update product attributes
   * @param {number} id
   * @param {Object} data
   * @returns {Promise<boolean>}
   */
  async update(id, data) {
    const fields = [];
    const params = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      params.push(data.name);
    }
    if (data.slug !== undefined) {
      fields.push("slug = ?");
      params.push(data.slug);
    }
    if (data.description !== undefined) {
      fields.push("description = ?");
      params.push(data.description);
    }
    if (data.price !== undefined) {
      fields.push("price = ?");
      params.push(data.price);
    }
    if (data.salePrice !== undefined) {
      fields.push("sale_price = ?");
      params.push(data.salePrice);
    }
    if (data.stockQuantity !== undefined) {
      fields.push("stock_quantity = ?");
      params.push(data.stockQuantity);
    }
    if (data.isActive !== undefined) {
      fields.push("is_active = ?");
      params.push(data.isActive ? 1 : 0);
    }
    if (data.isFeatured !== undefined) {
      fields.push("is_featured = ?");
      params.push(data.isFeatured ? 1 : 0);
    }
    if (data.categoryId !== undefined) {
      fields.push("category_id = ?");
      params.push(data.categoryId);
    }

    if (fields.length === 0) return false;

    params.push(id);
    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await pool.query(sql, params);
    return result.affectedRows > 0;
  }

  /**
   * Delete a product by id
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  /**
   * Count total products matching filters
   * @param {Object} [filters]
   * @returns {Promise<number>}
   */
  async count(filters = {}) {
    const conditions = [];
    const params = [];

    if (filters.isActive !== undefined && filters.isActive !== null) {
      conditions.push("is_active = ?");
      params.push(filters.isActive ? 1 : 0);
    }
    if (filters.categoryId !== undefined && filters.categoryId !== null) {
      conditions.push("category_id = ?");
      params.push(filters.categoryId);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM products ${where}`, params);
    return rows[0].total;
  }
}

module.exports = new ProductRepository();
