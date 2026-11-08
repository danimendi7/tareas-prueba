import Link from "next/link";
import { FormularioCuenta } from "@/components/FormularioCuenta";
import { registrar } from "@/lib/sesion/acciones";

export default function Registro() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Crear cuenta</h1>
      <FormularioCuenta accion={registrar} textoBoton="Registrarme" autocompletado="new-password" />
      <p className="mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link className="underline" href="/entrar">
          Entra
        </Link>
      </p>
    </>
  );
}
