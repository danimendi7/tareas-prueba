import { anadirTarea, tituloUnico } from "./apoyo";
import { expect, test } from "./fixtures";

test("borrar quita la tarea y no vuelve al recargar", async ({ page }) => {
  await page.goto("/tareas");
  const titulo = tituloUnico("Borrar");
  await anadirTarea(page, titulo);

  const item = page.getByRole("listitem").filter({ hasText: titulo });
  await item.getByRole("button", { name: "Borrar" }).click();
  await expect(item).toHaveCount(0, { timeout: 20_000 });

  await page.reload();
  await expect(page.getByRole("main").getByText("Cargando tareas…")).toBeHidden();
  await expect(page.getByRole("listitem").filter({ hasText: titulo })).toHaveCount(0);
});
