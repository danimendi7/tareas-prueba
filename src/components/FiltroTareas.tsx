import Link from "next/link";
import { enlaceFiltro, FILTROS, type Filtro } from "@/lib/tareas/filtro";

const NOMBRES: Record<Filtro, string> = {
  todas: "Todas",
  pendientes: "Pendientes",
  hechas: "Hechas",
};

export function FiltroTareas({ actual }: { actual: Filtro }) {
  return (
    <nav aria-label="Filtrar tareas" className="mt-6 flex gap-2">
      {FILTROS.map((filtro) => {
        const activo = filtro === actual;
        return (
          <Link
            key={filtro}
            href={enlaceFiltro(filtro)}
            aria-current={activo ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded px-3 ${
              activo
                ? "bg-neutral-900 font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "underline"
            }`}
          >
            {NOMBRES[filtro]}
          </Link>
        );
      })}
    </nav>
  );
}
