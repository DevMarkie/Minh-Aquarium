const { test, expect } = require("@playwright/test");

function normalize(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
}

test("products: search filters cards", async ({ page }) => {
  await page.goto("/products.html");

  const cards = page.locator(".product-card");
  await expect(cards.first()).toBeVisible();

  await page.locator(".header-main .search-input").fill("Betta");

  const visibleNames = page.locator(".product-card:visible .product-name");
  const names = await visibleNames.allTextContents();

  expect(names.length).toBeGreaterThan(0);
  for (const name of names) {
    expect(normalize(name)).toContain("betta");
  }
});

test("products: all cards are visible before filters are changed", async ({
  page,
}) => {
  await page.goto("/products.html");

  const total = await page.locator(".product-card").count();
  const visible = await page.locator(".product-card:visible").count();

  expect(total).toBeGreaterThan(100);
  expect(visible).toBe(total);
  await expect(page.locator(".page-subtitle")).toContainText(
    `Tìm thấy ${total} sản phẩm`,
  );
});

test("products: category filter and clear filter work", async ({ page }) => {
  await page.goto("/products.html");

  await page
    .locator(".checkbox-list label")
    .filter({ hasText: "Thức Ăn" })
    .first()
    .click();

  const visibleCategories = await page
    .locator(".product-card:visible .product-cat")
    .allTextContents();

  expect(visibleCategories.length).toBeGreaterThan(0);
  for (const category of visibleCategories) {
    expect(normalize(category)).toContain("thuc an");
  }

  await page.locator(".btn-clear-filter").click();
  const total = await page.locator(".product-card").count();
  await expect(page.locator(".product-card:visible")).toHaveCount(total);
});
