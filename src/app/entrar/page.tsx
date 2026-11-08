import Link from "next/link";
import { FormularioCuenta } from "@/components/FormularioCuenta";
import { entrar } from "@/lib/sesion/acciones";

export default function Entrar() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Entrar</h1>
      <FormularioCuenta accion={entrar} textoBoton="Entrar" autocompletado="current-password" />
      <p className="mt-4">
        ¿No tienes cuenta?{" "}
        <Link className="underline" href="/registro">
          Regístrate
        </Link>
      </p>
    </>
  );
}
