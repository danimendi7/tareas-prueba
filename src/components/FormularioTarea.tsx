"use client";

import { useActionState } from "react";
import { crearTarea } from "@/lib/tareas/acciones";
import { LONGITUD_MAXIMA_TITULO } from "@/lib/tareas/validacion";

export function FormularioTarea() {
  const [estado, enviar, pendiente] = useActionState(crearTarea, { error: null });

  return (
    <form action={enviar} className="mt-6">
      <label htmlFor="titulo">Nueva tarea</label>
      <div className="mt-1 flex gap-2">
        <input
          id="titulo"
          name="titulo"
          type="text"
          maxLength={LONGITUD_MAXIMA_TITULO}
          autoComplete="off"
          className="min-w-0 flex-1 rounded border border-neutral-400 bg-transparent px-3 py-2"
        />
        <button
          type="submit"
          disabled={pendiente}
          className="rounded bg-neutral-900 px-4 py-2 font-medium text-white disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Añadir
        </button>
      </div>
      {estado.error && (
        <p role="alert" className="mt-2 text-red-700 dark:text-red-400">
          {estado.error}
        </p>
      )}
    </form>
  );
}
