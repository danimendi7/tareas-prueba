import { expect, test } from "@playwright/test";

test("sin sesión, la raíz lleva a /entrar", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/entrar$/);
});

test("sin sesión, /tareas lleva a /entrar", async ({ page }) => {
  await page.goto("/tareas");
  await expect(page).toHaveURL(/\/entrar$/);
});
