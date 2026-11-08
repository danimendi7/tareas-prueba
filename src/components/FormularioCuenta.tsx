"use client";

import { useActionState } from "react";
import type { EstadoFormulario } from "@/lib/sesion/acciones";

type Props = {
  accion: (previo: EstadoFormulario, datos: FormData) => Promise<EstadoFormulario>;
  textoBoton: string;
  autocompletado: "new-password" | "current-password";
};

const campo = "mt-1 w-full rounded border border-neutral-400 bg-transparent px-3 py-2";

export function FormularioCuenta({ accion, textoBoton, autocompletado }: Props) {
  const [estado, enviar, pendiente] = useActionState(accion, { error: null, email: "" });

  return (
    <form action={enviar} className="mt-6 flex flex-col gap-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={estado.email}
          className={campo}
        />
      </div>
      <div>
        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          name="contrasena"
          type="password"
          required
          minLength={8}
          autoComplete={autocompletado}
          className={campo}
        />
      </div>
      {estado.error && (
        <p role="alert" className="text-red-700 dark:text-red-400">
          {estado.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pendiente}
        className="rounded bg-neutral-900 px-4 py-2 font-medium text-white disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
      >
        {textoBoton}
      </button>
    </form>
  );
}
