import Link from "next/link";

// src/proxy.ts redirige esta ruta; esto solo se ve si el proxy no llegara a ejecutarse.
export default function Inicio() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Tareas</h1>
      <p className="mt-4">
        <Link className="underline" href="/entrar">
          Entrar
        </Link>
      </p>
    </>
  );
}
