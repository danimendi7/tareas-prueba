import { connection } from "next/server";
import { crearClienteServidor } from "@/lib/supabase/server";

export async function ListaTareas() {
  // El cliente de Supabase usa la hora actual: debe ejecutarse siempre en la petición.
  await connection();
  const supabase = await crearClienteServidor();
  const { data: tareas, error } = await supabase
    .from("tareas")
    .select("id, titulo, hecha")
    .order("creada", { ascending: false });

  if (error) {
    return (
      <p role="alert" className="mt-6 text-red-700 dark:text-red-400">
        No se han podido cargar las tareas. Recarga la página.
      </p>
    );
  }

  if (tareas.length === 0) {
    return <p className="mt-6 text-neutral-600 dark:text-neutral-400">Todavía no tienes tareas.</p>;
  }

  return (
    <ul aria-label="Lista de tareas" className="mt-6 flex flex-col gap-2">
      {tareas.map((tarea) => (
        <li key={tarea.id} className="break-words rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700">
          {tarea.titulo}
        </li>
      ))}
    </ul>
  );
}
