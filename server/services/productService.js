/**
 * server/services/productService.js
 * Service layer for product queries, pre-indexed search caching, and database retrieval
 */

const { productRepository } = require("../repositories");

function normalizeText(value) {
  return (value || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^\w\s&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

class ProductService {
  constructor() {
    this.cachedProducts = [];
    this.searchIndex = [];
    this.cachedBuffer = null;
    this.lastCacheTime = 0;
    this.CACHE_TTL_MS = 60000; // 1 minute in-memory cache
  }

  /**
   * Format product row to guarantee 100% compatibility with frontend and API contracts
   */
  formatProduct(p) {
    const categoryName = p.category_name || p.catLabel || p.category || "Khác";
    const categorySlug = p.category_slug || p.cat || "";
    const img = p.image_url || p.image || "";

    return {
      id: p.id,
      name: p.name,
      slug: p.slug || "",
      description: p.description || "",
      price: Number(p.price || 0),
      sale_price: p.sale_price ? Number(p.sale_price) : null,
      stock_quantity: p.stock_quantity !== undefined ? p.stock_quantity : (p.stock || 0),
      stock: p.stock_quantity !== undefined ? p.stock_quantity : (p.stock || 0),
      is_active: p.is_active !== undefined ? Boolean(p.is_active) : true,
      is_featured: p.is_featured !== undefined ? Boolean(p.is_featured) : Boolean(p.featured),
      featured: p.is_featured !== undefined ? Boolean(p.is_featured) : Boolean(p.featured),
      category_id: p.category_id || null,
      category_name: categoryName,
      category_slug: categorySlug,
      cat: categorySlug,
      catLabel: categoryName,
      image_url: img,
      image: img,
      created_at: p.created_at || null,
    };
  }

  /**
   * Pre-index products for high-speed sub-millisecond AI retrieval
   */
  buildSearchIndex(products) {
    return products.map((p) => {
      const tokens = normalizeText(
        `${p.name} ${p.catLabel || ""} ${p.cat || ""} ${p.description || ""}`
      ).split(" ");
      return {
        product: p,
        tokens: new Set(tokens.filter((t) => t.length >= 2)),
        searchString: normalizeText(`${p.name} ${p.catLabel || ""}`),
      };
    });
  }

  async refreshCache() {
    try {
      const rows = await productRepository.getAll({ limit: 500, isActive: true });
      if (rows && rows.length > 0) {
        this.cachedProducts = rows.map((r) => this.formatProduct(r));
        this.searchIndex = this.buildSearchIndex(this.cachedProducts);
        const payload = JSON.stringify({
          success: true,
          count: this.cachedProducts.length,
          products: this.cachedProducts,
          data: this.cachedProducts,
        });
        this.cachedBuffer = Buffer.from(payload);
        this.lastCacheTime = Date.now();
        return;
      }
    } catch (err) {
      // Fallback if DB connection fails
      if (this.cachedProducts.length === 0) {
        console.warn("[ProductService] Database query failed, using empty or existing cache:", err.message);
      }
    }
  }

  async getCachedBuffer() {
    const isCacheExpired = Date.now() - this.lastCacheTime > this.CACHE_TTL_MS;
    if (!this.cachedBuffer || isCacheExpired) {
      await this.refreshCache();
    }
    return this.cachedBuffer;
  }

  async getAllProducts(filters = {}) {
    const isCacheExpired = Date.now() - this.lastCacheTime > this.CACHE_TTL_MS;
    if (this.cachedProducts.length === 0 || isCacheExpired) {
      await this.refreshCache();
    }

    let result = this.cachedProducts;

    if (filters.categoryId) {
      result = result.filter((p) => p.category_id === Number(filters.categoryId));
    }
    if (filters.isFeatured !== undefined) {
      result = result.filter((p) => p.featured === Boolean(filters.isFeatured));
    }

    return result;
  }

  async getProductById(id) {
    try {
      const row = await productRepository.getById(id);
      if (row) return this.formatProduct(row);
    } catch {
      // Fallback to in-memory cache lookup
    }
    return this.cachedProducts.find((p) => p.id === Number(id)) || null;
  }

  /**
   * Pre-indexed AI search retrieval for chatbot and query matching
   */
  async findRelevantForChat(userMessage, limit = 6) {
    if (this.cachedProducts.length === 0) {
      await this.refreshCache();
    }

    const stopwords = new Set([
      "toi", "minh", "ban", "shop", "va", "la", "cho", "giup", "tu", "van",
      "co", "khong", "gia", "nao", "duoc", "voi", "nhung", "cua", "cac",
    ]);

    const queryTokens = normalizeText(userMessage)
      .split(" ")
      .filter((t) => t.length >= 2 && !stopwords.has(t));

    if (queryTokens.length === 0) {
      return [];
    }

    const scored = [];
    for (const item of this.searchIndex) {
      let score = 0;
      for (const token of queryTokens) {
        if (item.tokens.has(token)) {
          score += 2;
        } else if (item.searchString.includes(token)) {
          score += 1;
        }
      }
      if (score > 0) {
        if (item.product.featured) score += 0.5;
        scored.push({ product: item.product, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.product);
  }
}

module.exports = new ProductService();
