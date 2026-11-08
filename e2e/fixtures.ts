import { test as base, expect } from "@playwright/test";
import { registrar, type Cuenta } from "./apoyo";

type Sesion = { cuenta: Cuenta; estado: Awaited<ReturnType<import("@playwright/test").BrowserContext["storageState"]>> };

// Una cuenta por worker: limita los registros y evita los límites de Supabase Auth.
export const test = base.extend<object, { sesion: Sesion }>({
  sesion: [
    async ({ browser }, usar, info) => {
      // En un fixture de worker hay que pasar a mano las opciones del proyecto.
      const { baseURL, extraHTTPHeaders } = info.project.use;
      const contexto = await browser.newContext({ baseURL, extraHTTPHeaders });
      const cuenta = await registrar(await contexto.newPage());
      const estado = await contexto.storageState();
      await contexto.close();
      await usar({ cuenta, estado });
    },
    { scope: "worker" },
  ],
  storageState: async ({ sesion }, usar) => {
    await usar(sesion.estado);
  },
});

export { expect };
