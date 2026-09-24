const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

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

async function upsertCategory(connection, name) {
  const baseSlug = slugify(name) || "category";
  await connection.execute(
    `INSERT INTO categories (name, slug)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    [name, baseSlug],
  );

  const [rows] = await connection.execute(
    "SELECT id FROM categories WHERE slug = ? LIMIT 1",
    [baseSlug],
  );
  return rows[0].id;
}

async function main() {
  const products = parseProductsHtml();
  if (products.length === 0) {
    throw new Error("No products found in src/products.html");
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "minh_aquarium",
    multipleStatements: false,
  });

  const categoryIds = new Map();
  let insertedProducts = 0;
  let insertedImages = 0;

  try {
    await connection.beginTransaction();

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

    for (const product of products) {
      if (!categoryIds.has(product.category)) {
        categoryIds.set(
          product.category,
          await upsertCategory(connection, product.category),
        );
      }

      const categoryId = categoryIds.get(product.category);
      const slug = slugify(product.name);
      const stockQuantity = 20;

      await connection.execute(
        `INSERT INTO products
          (category_id, name, slug, description, price, stock_quantity, is_active, is_featured)
         VALUES (?, ?, ?, ?, ?, ?, TRUE, FALSE)
         ON DUPLICATE KEY UPDATE
          category_id = VALUES(category_id),
          name = VALUES(name),
          description = VALUES(description),
          price = VALUES(price),
          stock_quantity = VALUES(stock_quantity),
          is_active = TRUE`,
        [
          categoryId,
          product.name,
          slug,
          `Sản phẩm ${product.name} tại Minh Aquarium.`,
          product.price,
          stockQuantity,
        ],
      );

      const [productRows] = await connection.execute(
        "SELECT id FROM products WHERE slug = ? LIMIT 1",
        [slug],
      );
      const productId = productRows[0].id;
      insertedProducts += 1;

      if (product.imageUrl) {
        await connection.execute(
          "DELETE FROM product_images WHERE product_id = ?",
          [productId],
        );
        await connection.execute(
          `INSERT INTO product_images
            (product_id, image_url, is_primary, sort_order)
           VALUES (?, ?, TRUE, 0)`,
          [productId, product.imageUrl],
        );
        insertedImages += 1;
      }
    }

    await connection.commit();
    console.log(
      `Seeded ${insertedProducts} products, ${insertedImages} images, ${categoryIds.size} categories.`,
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
