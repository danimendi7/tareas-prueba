"use client";

import { useState, useTransition } from "react";
import { editarTitulo } from "@/lib/tareas/acciones";
import { LONGITUD_MAXIMA_TITULO } from "@/lib/tareas/validacion";

export function FormularioEditarTitulo({
  id,
  titulo,
  alCerrar,
}: {
  id: string;
  titulo: string;
  alCerrar: () => void;
}) {
  const [error, ponerError] = useState<string | null>(null);
  const [pendiente, iniciar] = useTransition();

  return (
    <form
      aria-label={`Editar ${titulo}`}
      onSubmit={(evento) => {
        // Sin <form action>: React vaciaría el campo y se perdería lo escrito si hay un error.
        evento.preventDefault();
        const valor = String(new FormData(evento.currentTarget).get("titulo") ?? "");
        iniciar(async () => {
          const resultado = await editarTitulo(id, valor);
          ponerError(resultado.error);
          // En una transición, para que el formulario se cierre a la vez que llega el título nuevo.
          if (!resultado.error) iniciar(alCerrar);
        });
      }}
      onKeyDown={(evento) => {
        if (evento.key === "Escape") alCerrar();
      }}
    >
      <label htmlFor={`titulo-${id}`} className="sr-only">
        {`Nuevo título de ${titulo}`}
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={`titulo-${id}`}
          name="titulo"
          type="text"
          defaultValue={titulo}
          maxLength={LONGITUD_MAXIMA_TITULO}
          autoComplete="off"
          autoFocus
          className="min-h-11 min-w-0 flex-1 basis-48 rounded border border-neutral-400 bg-transparent px-3 py-2"
        />
        <button
          type="submit"
          disabled={pendiente}
          className="min-h-11 rounded bg-neutral-900 px-4 py-2 font-medium text-white disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Guardar
        </button>
        <button type="button" onClick={alCerrar} className="min-h-11 px-2 underline">
          Cancelar
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
