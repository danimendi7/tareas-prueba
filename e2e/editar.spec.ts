import type { Page } from "@playwright/test";
import { anadirTarea, tituloUnico } from "./apoyo";
import { expect, test } from "./fixtures";

function item(page: Page, titulo: string) {
  return page.getByRole("listitem").filter({ hasText: titulo });
}

async function abrirEdicion(page: Page, titulo: string) {
  await page.getByRole("button", { name: `Editar ${titulo}` }).click();
  return page.getByRole("textbox", { name: `Nuevo título de ${titulo}` });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/tareas");
});

test("el título editado se ve al guardar y se conserva al recargar", async ({ page }) => {
  const titulo = tituloUnico("Original");
  const nuevo = tituloUnico("Editado");
  await anadirTarea(page, titulo);

  const campo = await abrirEdicion(page, titulo);
  await expect(campo).toHaveValue(titulo);
  await campo.fill(nuevo);
  await page.getByRole("button", { name: "Guardar" }).click();

  await expect(item(page, nuevo)).toBeVisible({ timeout: 20_000 });
  await expect(item(page, titulo)).toHaveCount(0);

  await page.reload();
  await expect(item(page, nuevo)).toBeVisible();
  await expect(item(page, titulo)).toHaveCount(0);
});

test("Intro guarda el título editado", async ({ page }) => {
  const titulo = tituloUnico("Con intro");
  const nuevo = tituloUnico("Guardado con intro");
  await anadirTarea(page, titulo);

  const campo = await abrirEdicion(page, titulo);
  await campo.fill(nuevo);
  await campo.press("Enter");

  await expect(item(page, nuevo)).toBeVisible({ timeout: 20_000 });
});

test("un título vacío avisa y no se guarda", async ({ page }) => {
  const titulo = tituloUnico("No vaciar");
  await anadirTarea(page, titulo);

  const campo = await abrirEdicion(page, titulo);
  await campo.fill("   ");
  await page.getByRole("button", { name: "Guardar" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Escribe un título" })).toBeVisible({
    timeout: 20_000,
  });

  await page.reload();
  await expect(item(page, titulo)).toBeVisible();
});

test("Cancelar no cambia el título y devuelve el foco a Editar", async ({ page }) => {
  const titulo = tituloUnico("Sin cambios");
  await anadirTarea(page, titulo);

  const campo = await abrirEdicion(page, titulo);
  await campo.fill(tituloUnico("Descartado"));
  await page.getByRole("button", { name: "Cancelar" }).click();

  await expect(item(page, titulo)).toBeVisible();
  await expect(page.getByRole("button", { name: `Editar ${titulo}` })).toBeFocused();

  await page.reload();
  await expect(item(page, titulo)).toBeVisible();
});
