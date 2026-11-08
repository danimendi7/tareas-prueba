import { Suspense } from "react";
import { FormularioTarea } from "@/components/FormularioTarea";
import { ListaTareas } from "@/components/ListaTareas";
import { salir } from "@/lib/sesion/acciones";

export default function Tareas() {
  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Tareas</h1>
        <form action={salir}>
          <button type="submit" className="underline">
            Cerrar sesión
          </button>
        </form>
      </header>
      <FormularioTarea />
      <Suspense fallback={<p className="mt-6">Cargando tareas…</p>}>
        <ListaTareas />
      </Suspense>
    </>
  );
}
