const { test, expect } = require("@playwright/test");

async function mockFirebaseEmailAuth(page) {
  const firebaseUsers = new Map();

  await page.route("**/api/login", async (route) => {
    throw new Error(`Backend login should not be called: ${route.request().url()}`);
  });
  await page.route("**/api/register", async (route) => {
    throw new Error(
      `Backend register should not be called: ${route.request().url()}`,
    );
  });
  await page.route("**/api/auth/firebase", async (route) => {
    const authHeader = route.request().headers().authorization || "";
    expect(authHeader).toMatch(/^Bearer token-/);
    const email = authHeader.replace(/^Bearer token-/, "");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        user: {
          id: 10,
          uid: `uid-${email}`,
          email,
          role: "customer",
          provider: "firebase",
        },
      }),
    });
  });

  await page.route(
    "**/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*",
    async (route) => {
      const body = JSON.parse(route.request().postData() || "{}");
      firebaseUsers.set(body.email, `uid-${body.email}`);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          kind: "identitytoolkit#VerifyPasswordResponse",
          localId: `uid-${body.email}`,
          email: body.email,
          displayName: "",
          idToken: `token-${body.email}`,
          registered: true,
          refreshToken: `refresh-${body.email}`,
          expiresIn: "3600",
        }),
      });
    },
  );

  await page.route(
    "**/identitytoolkit.googleapis.com/v1/accounts:signUp*",
    async (route) => {
      const body = JSON.parse(route.request().postData() || "{}");
      firebaseUsers.set(body.email, `uid-${body.email}`);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          kind: "identitytoolkit#SignupNewUserResponse",
          localId: `uid-${body.email}`,
          email: body.email,
          idToken: `token-${body.email}`,
          refreshToken: `refresh-${body.email}`,
          expiresIn: "3600",
        }),
      });
    },
  );

  await page.route(
    "**/identitytoolkit.googleapis.com/v1/accounts:lookup*",
    async (route) => {
      const body = JSON.parse(route.request().postData() || "{}");
      const email = String(body.idToken || "").replace("token-", "");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          kind: "identitytoolkit#GetAccountInfoResponse",
          users: [
            {
              localId: firebaseUsers.get(email) || `uid-${email}`,
              email,
              emailVerified: false,
              providerUserInfo: [{ providerId: "password", email }],
            },
          ],
        }),
      });
    },
  );
}

test("login: toggle to register hides remember row", async ({ page }) => {
  await page.goto("/login.html");

  const rememberRow = page.locator("#auth-remember-row");
  await expect(rememberRow).toBeVisible();

  await page.locator("#auth-toggle-link").click();
  await expect(rememberRow).toBeHidden();

  await expect(page.locator("#auth-email")).toBeVisible();
  await expect(page.locator("#auth-password")).toBeVisible();
});

test("login: Firebase email login stores user and updates header", async ({
  page,
}) => {
  await mockFirebaseEmailAuth(page);
  page.on("dialog", (dialog) => dialog.accept());

  await page.goto("/login.html");
  await page.locator("#auth-email").fill("demo@minhaquarium.local");
  await page.locator("#auth-password").fill("demo123");
  await page.locator("#auth-form").evaluate((form) => form.requestSubmit());
  await expect(page).toHaveURL(/index\.html/);

  await expect(page.locator(".btn-login").first()).toContainText("demo");
});

test("login: Firebase email register creates a session", async ({ page }) => {
  await mockFirebaseEmailAuth(page);
  page.on("dialog", (dialog) => dialog.accept());

  await page.goto("/login.html");
  await page.locator("#auth-toggle-link").click();
  await page.locator("#auth-email").fill("new-user@minhaquarium.local");
  await page.locator("#auth-password").fill("demo123");
  await page.locator("#auth-form").evaluate((form) => form.requestSubmit());
  await expect(page).toHaveURL(/index\.html/);

  await expect(page.locator(".btn-login").first()).toContainText("new-user");
});
