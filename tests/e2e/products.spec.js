const { test, expect } = require("@playwright/test");

function normalize(value) {
  return (value || "").toLowerCase().replace(/\s+/g, " ").trim();
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
