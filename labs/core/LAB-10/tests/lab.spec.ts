import { test, expect } from "@playwright/test";

test("lab renders normal and incident states without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Lead the AtlasOps production game day");
  await expect(page.getByText("Operational", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Activate incident" }).click();
  await expect(page.getByText(/Incident active|Recovered/)).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});
