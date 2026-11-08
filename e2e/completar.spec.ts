import { anadirTarea, tituloUnico } from "./apoyo";
import { expect, test } from "./fixtures";

test("marcar la casilla tacha la tarea y sigue tachada al recargar", async ({ page }) => {
  await page.goto("/tareas");
  const titulo = tituloUnico("Completar");
  await anadirTarea(page, titulo);

  const casilla = page.getByRole("checkbox", { name: titulo });
  const texto = page.getByRole("listitem").filter({ hasText: titulo }).getByText(titulo);
  await expect(casilla).not.toBeChecked();
  await expect(texto).not.toHaveCSS("text-decoration-line", "line-through");

  await casilla.check();
  await expect(texto).toHaveCSS("text-decoration-line", "line-through");

  // Espera a que la acción termine antes de recargar: comprueba el dato guardado, no el optimista.
  await expect(async () => {
    await page.reload();
    await expect(page.getByRole("checkbox", { name: titulo })).toBeChecked({ timeout: 1000 });
  }).toPass({ timeout: 10_000 });
  await expect(page.getByRole("listitem").filter({ hasText: titulo }).getByText(titulo)).toHaveCSS(
    "text-decoration-line",
    "line-through",
  );
});
