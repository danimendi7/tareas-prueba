import { anadirTarea, registrar, tituloUnico } from "./apoyo";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

function tarea(page: Page, titulo: string) {
  return page.getByRole("listitem").filter({ hasText: titulo });
}

// Crea una tarea pendiente y otra hecha, y espera a que la hecha quede guardada.
async function prepararTareas(page: Page) {
  const pendiente = tituloUnico("Filtro pendiente");
  const hecha = tituloUnico("Filtro hecha");
  await page.goto("/tareas");
  await anadirTarea(page, pendiente);
  await anadirTarea(page, hecha);
  await page.getByRole("checkbox", { name: hecha }).check();
  await expect(async () => {
    await page.reload();
    await expect(page.getByRole("checkbox", { name: hecha })).toBeChecked({ timeout: 1000 });
  }).toPass({ timeout: 10_000 });
  return { pendiente, hecha };
}

test("cada filtro muestra solo sus tareas y sigue activo al recargar", async ({ page }) => {
  const { pendiente, hecha } = await prepararTareas(page);

  await page.getByRole("link", { name: "Pendientes" }).click();
  await expect(page).toHaveURL(/\/tareas\?filtro=pendientes$/);
  await expect(page.getByRole("link", { name: "Pendientes" })).toHaveAttribute("aria-current", "page");
  await expect(tarea(page, pendiente)).toBeVisible();
  await expect(tarea(page, hecha)).toHaveCount(0);

  await page.reload();
  await expect(page.getByRole("link", { name: "Pendientes" })).toHaveAttribute("aria-current", "page");
  await expect(tarea(page, pendiente)).toBeVisible();
  await expect(tarea(page, hecha)).toHaveCount(0);

  await page.getByRole("link", { name: "Hechas" }).click();
  await expect(page).toHaveURL(/\/tareas\?filtro=hechas$/);
  await expect(tarea(page, hecha)).toBeVisible();
  await expect(tarea(page, pendiente)).toHaveCount(0);

  await page.getByRole("link", { name: "Todas" }).click();
  await expect(page).toHaveURL(/\/tareas$/);
  await expect(tarea(page, hecha)).toBeVisible();
  await expect(tarea(page, pendiente)).toBeVisible();
});

test("un filtro desconocido en la URL muestra todas las tareas", async ({ page }) => {
  const { pendiente, hecha } = await prepararTareas(page);

  await page.goto("/tareas?filtro=inventado");
  await expect(page.getByRole("link", { name: "Todas" })).toHaveAttribute("aria-current", "page");
  await expect(tarea(page, pendiente)).toBeVisible();
  await expect(tarea(page, hecha)).toBeVisible();
});

test("al completar una tarea con el filtro Pendientes, sale de la lista", async ({ page }) => {
  const titulo = tituloUnico("Sale del filtro");
  await page.goto("/tareas?filtro=pendientes");
  await anadirTarea(page, titulo);

  await page.getByRole("checkbox", { name: titulo }).check();
  await expect(tarea(page, titulo)).toHaveCount(0, { timeout: 20_000 });
});

test("un filtro sin resultados lo indica y permite cambiar de filtro", async ({ browser }) => {
  const contexto = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  const page = await contexto.newPage();
  await registrar(page);

  await page.goto("/tareas?filtro=hechas");
  await expect(page.getByText("No tienes tareas hechas.")).toBeVisible();
  await page.getByRole("link", { name: "Todas" }).click();
  await expect(page.getByText("Todavía no tienes tareas.")).toBeVisible();

  await contexto.close();
});
