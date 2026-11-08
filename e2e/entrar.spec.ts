import { expect, test } from "@playwright/test";
import { iniciarSesion, registrar } from "./apoyo";

test("con credenciales correctas llega a /tareas", async ({ browser, page }) => {
  const contexto = await browser.newContext();
  const cuenta = await registrar(await contexto.newPage());
  await contexto.close();

  await iniciarSesion(page, cuenta);
  await expect(page).toHaveURL(/\/tareas$/);
});

test("con contraseña incorrecta ve un error en español y sigue en /entrar", async ({ browser, page }) => {
  const contexto = await browser.newContext();
  const cuenta = await registrar(await contexto.newPage());
  await contexto.close();

  await iniciarSesion(page, { ...cuenta, contrasena: "contraseña-equivocada" });
  await expect(page.getByRole("main").getByRole("alert")).toHaveText("El email o la contraseña no son correctos.");
  await expect(page).toHaveURL(/\/entrar$/);
});

test("/entrar enlaza con /registro", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByRole("link", { name: "Regístrate" }).click();
  await expect(page).toHaveURL(/\/registro$/);
});
