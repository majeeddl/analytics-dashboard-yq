import { test, expect } from "@playwright/test";

test("user can log in and view dashboard", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  // Fill the form
  await page.fill('input[name="email"]', "admin@example.com");
  await page.fill('input[name="password"]', "password");

  // Submit
  await page.click('button:has-text("Login")');

  // Expect redirection to dashboard
  await expect(page).toHaveURL(/dashboard/);

  // Check for charts and table
  await expect(page.locator("text=YQ Analytics")).toBeVisible();
});
