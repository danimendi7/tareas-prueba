import { anadirTarea, tituloUnico } from "./apoyo";
import { expect, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/tareas");
});

test("añadir pone la tarea la primera de la lista sin recargar", async ({ page }) => {
  await page.evaluate(() => {
    (window as unknown as { sinRecargar: boolean }).sinRecargar = true;
  });
  const titulo = tituloUnico("Comprar pan");
  await anadirTarea(page, titulo);

  await expect(page.getByRole("listitem").first()).toContainText(titulo);
  expect(await page.evaluate(() => (window as unknown as { sinRecargar?: boolean }).sinRecargar)).toBe(true);
  await expect(page.getByLabel("Nueva tarea")).toHaveValue("");
});

test("un título vacío no crea la tarea y muestra un aviso", async ({ page }) => {
  await expect(page.getByRole("main").getByText("Cargando tareas…")).toBeHidden();
  const antes = await page.getByRole("listitem").count();

  await page.getByRole("button", { name: "Añadir" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toHaveText("Escribe un título para la tarea.");

  await page.reload();
  await expect(page.getByRole("main").getByText("Cargando tareas…")).toBeHidden();
  await expect(page.getByRole("listitem")).toHaveCount(antes);
});

test("al recargar siguen las tareas, de la más reciente a la más antigua", async ({ page }) => {
  const antigua = tituloUnico("Antigua");
  const reciente = tituloUnico("Reciente");
  await anadirTarea(page, antigua);
  await anadirTarea(page, reciente);

  await page.reload();
  await expect(page.getByRole("listitem").nth(0)).toContainText(reciente);
  await expect(page.getByRole("listitem").nth(1)).toContainText(antigua);
});
