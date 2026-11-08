"use server";

import { redirect } from "next/navigation";
import { crearClienteServidor } from "@/lib/supabase/server";
import { mensajeErrorEntrada, mensajeErrorRegistro, validarCredenciales } from "./validacion";

export type EstadoFormulario = { error: string | null; email: string };

function leerCredenciales(datos: FormData) {
  return {
    email: String(datos.get("email") ?? "").trim(),
    contrasena: String(datos.get("contrasena") ?? ""),
  };
}

export async function registrar(
  _previo: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  const { email, contrasena } = leerCredenciales(datos);
  const invalido = validarCredenciales(email, contrasena);
  if (invalido) return { error: invalido, email };

  const supabase = await crearClienteServidor();
  const { data, error } = await supabase.auth.signUp({ email, password: contrasena });
  if (error) return { error: mensajeErrorRegistro(error.code), email };
  if (!data.session) return { error: mensajeErrorRegistro(undefined), email };

  redirect("/tareas");
}

export async function entrar(
  _previo: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  const { email, contrasena } = leerCredenciales(datos);

  const supabase = await crearClienteServidor();
  const { error } = await supabase.auth.signInWithPassword({ email, password: contrasena });
  if (error) return { error: mensajeErrorEntrada(error.code), email };

  redirect("/tareas");
}

export async function salir(): Promise<void> {
  const supabase = await crearClienteServidor();
  await supabase.auth.signOut();
  redirect("/entrar");
}
