import { expect, test } from "@playwright/test";
import { registrar } from "./apoyo";

test("cerrar sesión vuelve a /entrar y /tareas deja de ser accesible", async ({ page }) => {
  await registrar(page);
  await page.getByRole("button", { name: "Cerrar sesión" }).click();
  await expect(page).toHaveURL(/\/entrar$/);

  await page.goto("/tareas");
  await expect(page).toHaveURL(/\/entrar$/);
});
