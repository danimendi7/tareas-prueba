import Link from "next/link";

export default function Entrar() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Entrar</h1>
      <p className="mt-4">
        ¿No tienes cuenta?{" "}
        <Link className="underline" href="/registro">
          Regístrate
        </Link>
      </p>
    </>
  );
}
