"use client";

import { useOptimistic, useState, useTransition } from "react";
import { borrarTarea, cambiarHecha } from "@/lib/tareas/acciones";

export type Tarea = { id: string; titulo: string; hecha: boolean };

export function ItemTarea({ tarea }: { tarea: Tarea }) {
  const [hecha, marcarOptimista] = useOptimistic(tarea.hecha);
  const [error, ponerError] = useState<string | null>(null);
  const [pendiente, iniciar] = useTransition();

  function alCambiar(marcada: boolean) {
    iniciar(async () => {
      marcarOptimista(marcada);
      ponerError((await cambiarHecha(tarea.id, marcada)).error);
    });
  }

  function alBorrar() {
    iniciar(async () => {
      ponerError((await borrarTarea(tarea.id)).error);
    });
  }

  return (
    <li className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700">
      <div className="flex items-start justify-between gap-3">
        <label className="flex min-w-0 items-start gap-3">
          <input
            type="checkbox"
            checked={hecha}
            onChange={(evento) => alCambiar(evento.target.checked)}
            className="mt-1 size-4 shrink-0"
          />
          <span className={`min-w-0 break-words ${hecha ? "line-through opacity-60" : ""}`}>
            {tarea.titulo}
          </span>
        </label>
        <button
          type="button"
          onClick={alBorrar}
          disabled={pendiente}
          aria-label={`Borrar ${tarea.titulo}`}
          className="shrink-0 underline disabled:opacity-60"
        >
          Borrar
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </li>
  );
}
