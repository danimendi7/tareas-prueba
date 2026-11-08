"use client";

import { useOptimistic, useState, useTransition } from "react";
import { cambiarHecha } from "@/lib/tareas/acciones";

export type Tarea = { id: string; titulo: string; hecha: boolean };

export function ItemTarea({ tarea }: { tarea: Tarea }) {
  const [hecha, marcarOptimista] = useOptimistic(tarea.hecha);
  const [error, ponerError] = useState<string | null>(null);
  const [, iniciar] = useTransition();

  function alCambiar(marcada: boolean) {
    iniciar(async () => {
      marcarOptimista(marcada);
      ponerError((await cambiarHecha(tarea.id, marcada)).error);
    });
  }

  return (
    <li className="rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700">
      <label className="flex items-start gap-3">
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
      {error && (
        <p role="alert" className="mt-2 text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </li>
  );
}
