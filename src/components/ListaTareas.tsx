import { connection } from "next/server";
import { FiltroTareas } from "@/components/FiltroTareas";
import { ItemTarea } from "@/components/ItemTarea";
import { normalizarFiltro, type Filtro } from "@/lib/tareas/filtro";
import { crearClienteServidor } from "@/lib/supabase/server";

const SIN_TAREAS: Record<Filtro, string> = {
  todas: "Todavía no tienes tareas.",
  pendientes: "No tienes tareas pendientes.",
  hechas: "No tienes tareas hechas.",
};

export async function ListaTareas({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // El cliente de Supabase usa la hora actual: debe ejecutarse siempre en la petición.
  await connection();
  const filtro = normalizarFiltro((await searchParams).filtro);
  const supabase = await crearClienteServidor();
  const consulta = supabase.from("tareas").select("id, titulo, hecha");
  const { data: tareas, error } = await (filtro === "todas"
    ? consulta
    : consulta.eq("hecha", filtro === "hechas")
  ).order("creada", { ascending: false });

  return (
    <>
      <FiltroTareas actual={filtro} />
      {error ? (
        <p role="alert" className="mt-6 text-red-700 dark:text-red-400">
          No se han podido cargar las tareas. Recarga la página.
        </p>
      ) : tareas.length === 0 ? (
        <p className="mt-6 text-neutral-600 dark:text-neutral-400">{SIN_TAREAS[filtro]}</p>
      ) : (
        <ul aria-label="Lista de tareas" className="mt-6 flex flex-col gap-2">
          {tareas.map((tarea) => (
            <ItemTarea key={tarea.id} tarea={tarea} />
          ))}
        </ul>
      )}
    </>
  );
}
