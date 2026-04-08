const { test, expect } = require("@playwright/test");

test("login: toggle to register hides remember row", async ({ page }) => {
  await page.goto("/login.html");

  const rememberRow = page.locator("#auth-remember-row");
  await expect(rememberRow).toBeVisible();

  await page.locator("#auth-toggle-link").click();
  await expect(rememberRow).toBeHidden();

  await expect(page.locator("#auth-email")).toBeVisible();
  await expect(page.locator("#auth-password")).toBeVisible();
});
