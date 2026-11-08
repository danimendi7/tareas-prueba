import { createClient } from "@supabase/supabase-js";
import { expect, test } from "@playwright/test";
import { anadirTarea, cuentaAleatoria, registrar, tituloUnico } from "./apoyo";

test("cada usuario solo ve sus propias tareas", async ({ browser }) => {
  const contextoA = await browser.newContext();
  const contextoB = await browser.newContext();
  const paginaA = await contextoA.newPage();
  const paginaB = await contextoB.newPage();
  await registrar(paginaA);
  await registrar(paginaB);

  const tituloA = tituloUnico("De A");
  const tituloB = tituloUnico("De B");
  await anadirTarea(paginaA, tituloA);
  await anadirTarea(paginaB, tituloB);

  await paginaA.reload();
  await paginaB.reload();
  await expect(paginaA.getByRole("listitem").filter({ hasText: tituloA })).toBeVisible();
  await expect(paginaA.getByRole("listitem")).toHaveCount(1);
  await expect(paginaB.getByRole("listitem").filter({ hasText: tituloB })).toBeVisible();
  await expect(paginaB.getByRole("listitem")).toHaveCount(1);

  await contextoA.close();
  await contextoB.close();
});

// Ataca directamente la API de Supabase de staging para comprobar las políticas RLS.
test("RLS impide leer, modificar o borrar las tareas de otro usuario", async () => {
  const crearCliente = () =>
    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
  const alta = async () => {
    const cliente = crearCliente();
    const { email, contrasena } = cuentaAleatoria();
    const { data, error } = await cliente.auth.signUp({ email, password: contrasena });
    expect(error).toBeNull();
    return { cliente, id: data.user!.id };
  };
  const a = await alta();
  const b = await alta();

  const { data: tarea, error } = await a.cliente
    .from("tareas")
    .insert({ titulo: "Privada" })
    .select("id")
    .single();
  expect(error).toBeNull();

  const lectura = await b.cliente.from("tareas").select("id").eq("id", tarea!.id);
  expect(lectura.data).toEqual([]);

  const cambio = await b.cliente.from("tareas").update({ titulo: "Robada" }).eq("id", tarea!.id).select("id");
  expect(cambio.data).toEqual([]);

  const borrado = await b.cliente.from("tareas").delete().eq("id", tarea!.id).select("id");
  expect(borrado.data).toEqual([]);

  const suplantar = await b.cliente.from("tareas").insert({ titulo: "Ajena", user_id: a.id });
  expect(suplantar.error).not.toBeNull();

  const propia = await a.cliente.from("tareas").select("titulo").eq("id", tarea!.id).single();
  expect(propia.data?.titulo).toBe("Privada");
});
