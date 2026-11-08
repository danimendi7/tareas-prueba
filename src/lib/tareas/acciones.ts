"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { crearClienteServidor } from "@/lib/supabase/server";
import { validarTitulo } from "./validacion";

export type EstadoNuevaTarea = { error: string | null };

// Cada acción comprueba la sesión; RLS garantiza además que solo se tocan filas propias.
async function clienteConSesion() {
  const supabase = await crearClienteServidor();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/entrar");
  return supabase;
}

export async function crearTarea(
  _previo: EstadoNuevaTarea,
  datos: FormData,
): Promise<EstadoNuevaTarea> {
  const titulo = String(datos.get("titulo") ?? "").trim();
  const invalido = validarTitulo(titulo);
  if (invalido) return { error: invalido };

  const supabase = await clienteConSesion();
  const { error } = await supabase.from("tareas").insert({ titulo });
  if (error) return { error: "No se ha podido guardar la tarea. Inténtalo de nuevo." };

  revalidatePath("/tareas");
  return { error: null };
}

export async function cambiarHecha(id: string, hecha: boolean): Promise<{ error: string | null }> {
  const supabase = await clienteConSesion();
  const { error } = await supabase.from("tareas").update({ hecha }).eq("id", id);
  if (error) return { error: "No se ha podido actualizar la tarea. Inténtalo de nuevo." };

  revalidatePath("/tareas");
  return { error: null };
}
