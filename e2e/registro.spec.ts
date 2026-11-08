import { expect, test } from "@playwright/test";
import { registrar } from "./apoyo";

test("registrarse con datos válidos entra directamente en /tareas", async ({ page }) => {
  await registrar(page);
  await expect(page.getByRole("heading", { name: "Tareas" })).toBeVisible();
});

test("/registro enlaza con /entrar", async ({ page }) => {
  await page.goto("/registro");
  await page.getByRole("link", { name: "Entra" }).click();
  await expect(page).toHaveURL(/\/entrar$/);
});
