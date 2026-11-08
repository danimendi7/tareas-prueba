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
    </>
  );
}
