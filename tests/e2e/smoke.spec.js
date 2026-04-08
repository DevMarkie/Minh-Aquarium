const { test, expect } = require("@playwright/test");

const pages = [
  "/index.html",
  "/products.html",
  "/cart.html",
  "/login.html",
  "/blog.html",
  "/services.html",
];

for (const path of pages) {
  test(`smoke: ${path} loads`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator(".site-header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });
}
