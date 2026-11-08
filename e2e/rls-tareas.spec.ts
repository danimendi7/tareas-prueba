import { createClient } from "@supabase/supabase-js";
import { expect, test } from "@playwright/test";

// Comprueba directamente contra Supabase que un visitante sin sesión no accede a la tabla.
function clienteAnonimo() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

test("sin sesión no se puede leer ninguna tarea", async () => {
  const { data } = await clienteAnonimo().from("tareas").select("id").limit(1);
  expect(data ?? []).toHaveLength(0);
});

test("sin sesión no se puede crear una tarea", async () => {
  const { error } = await clienteAnonimo().from("tareas").insert({ titulo: "Intento anónimo" });
  expect(error).not.toBeNull();
});
