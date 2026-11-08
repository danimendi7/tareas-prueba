import { expect, type Page } from "@playwright/test";

export type Cuenta = { email: string; contrasena: string };

export function cuentaAleatoria(): Cuenta {
  return { email: `e2e-${crypto.randomUUID()}@example.com`, contrasena: `Prueba-${crypto.randomUUID()}` };
}

// Las cuentas se crean siempre por la interfaz para que el test sirva contra cualquier entorno.
export async function registrar(page: Page, cuenta: Cuenta = cuentaAleatoria()): Promise<Cuenta> {
  await page.goto("/registro");
  await page.getByLabel("Email").fill(cuenta.email);
  await page.getByLabel("Contraseña").fill(cuenta.contrasena);
  await page.getByRole("button", { name: "Registrarme" }).click();
  await expect(page).toHaveURL(/\/tareas$/);
  return cuenta;
}
