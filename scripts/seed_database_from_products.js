const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

function slugify(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodeHtml(value) {
  return (value || "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .trim()
    .replace(/^["']|["']$/g, "");
}

function parsePrice(value) {
  return Number((value || "").replace(/[^0-9]/g, "")) || 0;
}

function parseProductsHtml() {
  const htmlPath = path.join(__dirname, "..", "src", "products.html");
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Products HTML file not found at ${htmlPath}`);
  }

  const html = fs.readFileSync(htmlPath, "utf8");
  const cardParts = html.split(/<div class="product-card"[^>]*>/).slice(1);
  const products = [];

  for (const card of cardParts) {
    const name = card.match(/<h3 class="product-name">([\s\S]*?)<\/h3>/)?.[1];
    const category = card.match(/<div class="product-cat">([\s\S]*?)<\/div>/)?.[1];
    const price = card.match(/<span class="price-current">([\s\S]*?)<\/span>/)?.[1];
    const image = card.match(/background-image:\s*url\((?:&quot;|"|')?([^"')]+)(?:&quot;|"|')?\)/)?.[1];

    if (!name || !category || !price) {
      continue;
    }

    products.push({
      name: decodeHtml(name),
      category: decodeHtml(category),
      price: parsePrice(price),
      imageUrl: decodeHtml(image || ""),
    });
  }

  return products;
}

/**
 * High-performance batched database seeder
 * Replaces N+1 sequential loops with bulk category resolution and multi-row inserts
 */
async function main() {
  const products = parseProductsHtml();
  if (products.length === 0) {
    throw new Error("No products found in src/products.html");
  }

  console.log(`[seed] Parsed ${products.length} products from HTML.`);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3307),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "minh_aquarium",
  });

  const startTime = Date.now();

  try {
    await connection.beginTransaction();

    // 1. Seed Demo User
    await connection.execute(
      `INSERT INTO users (full_name, email, password_hash, phone, address, role)
       VALUES (?, ?, ?, ?, ?, 'customer')
       ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        phone = VALUES(phone),
        address = VALUES(address),
        role = VALUES(role)`,
      [
        "Khach Demo",
        "demo@minhaquarium.local",
        "demo123",
        "0123456789",
        "Minh Aquarium",
      ],
    );

    // 2. Batch Category Upsert (Single Query)
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    const categoryPlaceholders = uniqueCategories.map(() => "(?, ?)").join(", ");
    const categoryValues = [];
    uniqueCategories.forEach((cat) => {
      categoryValues.push(cat, slugify(cat) || "category");
    });

    await connection.query(
      `INSERT INTO categories (name, slug)
       VALUES ${categoryPlaceholders}
       ON DUPLICATE KEY UPDATE name = VALUES(name)`,
      categoryValues,
    );

    // Fetch all category IDs in a single query
    const [categoryRows] = await connection.query(
      "SELECT id, name, slug FROM categories WHERE name IN (?)",
      [uniqueCategories],
    );
    const categoryMap = new Map();
    categoryRows.forEach((row) => {
      categoryMap.set(row.name, row.id);
    });

    // 3. Batch Products Upsert (Single Query)
    const productPlaceholders = [];
    const productValues = [];
    const slugs = [];

    for (const product of products) {
      const categoryId = categoryMap.get(product.category) || null;
      const slug = slugify(product.name);
      slugs.push(slug);
      const stockQuantity = 20;

      productPlaceholders.push("(?, ?, ?, ?, ?, ?, TRUE, FALSE)");
      productValues.push(
        categoryId,
        product.name,
        slug,
        `Sản phẩm ${product.name} tại Minh Aquarium.`,
        product.price,
        stockQuantity,
      );
    }

    await connection.query(
      `INSERT INTO products
        (category_id, name, slug, description, price, stock_quantity, is_active, is_featured)
       VALUES ${productPlaceholders.join(", ")}
       ON DUPLICATE KEY UPDATE
        category_id = VALUES(category_id),
        name = VALUES(name),
        description = VALUES(description),
        price = VALUES(price),
        stock_quantity = VALUES(stock_quantity),
        is_active = TRUE`,
      productValues,
    );

    // 4. Batch Resolve Product IDs (Single Query)
    const [productRows] = await connection.query(
      "SELECT id, slug FROM products WHERE slug IN (?)",
      [slugs],
    );
    const productSlugToId = new Map();
    productRows.forEach((row) => {
      productSlugToId.set(row.slug, row.id);
    });

    // 5. Batch Image Upsert (Two Queries: Delete old, Insert new multi-row)
    const productIds = Array.from(productSlugToId.values());
    if (productIds.length > 0) {
      await connection.query(
        "DELETE FROM product_images WHERE product_id IN (?)",
        [productIds],
      );
    }

    const imagePlaceholders = [];
    const imageValues = [];
    let imageCount = 0;

    for (const product of products) {
      const slug = slugify(product.name);
      const productId = productSlugToId.get(slug);
      if (productId && product.imageUrl) {
        imagePlaceholders.push("(?, ?, TRUE, 0)");
        imageValues.push(productId, product.imageUrl);
        imageCount += 1;
      }
    }

    if (imagePlaceholders.length > 0) {
      await connection.query(
        `INSERT INTO product_images (product_id, image_url, is_primary, sort_order)
         VALUES ${imagePlaceholders.join(", ")}`,
        imageValues,
      );
    }

    await connection.commit();
    const duration = Date.now() - startTime;
    console.log(
      `[seed] Batch seeding completed in ${duration}ms! Seeded ${productRows.length} products, ${imageCount} images, and ${uniqueCategories.length} categories.`,
    );
  } catch (error) {
    await connection.rollback();
    console.error("[seed] Transaction failed and rolled back:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  main,
  parseProductsHtml,
  slugify,
};
