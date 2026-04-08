const { test, expect } = require("@playwright/test");

test("cart: add item and proceed to checkout", async ({ page }) => {
  await page.goto("/products.html");

  const firstName = (
    await page.locator(".product-card .product-name").first().textContent()
  ).trim();

  await page.locator(".btn-add-cart").first().click();
  const modal = page.locator(".custom-cart-modal-overlay.active");
  await expect(modal).toBeVisible();

  const qtyInput = page.locator("#modal-qty-input");
  await qtyInput.fill("2");
  await page.locator("#modal-btn-confirm").click();

  const badge = page.locator(".cart-btn .cart-count-badge");
  await expect(badge).toHaveText("2");

  await page.locator(".cart-btn").first().click();
  await expect(page).toHaveURL(/cart\.html/);

  await expect(
    page.locator(".page-container h4", { hasText: firstName }),
  ).toBeVisible();

  await page.locator("button[onclick='window.goToCheckout()']").click();
  await expect(page.locator("#checkout-address-input")).toBeVisible();
});
