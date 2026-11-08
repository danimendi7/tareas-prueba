import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { destinoRedireccion } from "@/lib/redirecciones";

// Refresca la sesión de Supabase en cada petición y aplica las redirecciones de la SPEC.
export async function proxy(request: NextRequest) {
  let respuesta = NextResponse.next({ request });
  let cabecerasCookies: Record<string, string> = {};

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(lista, cabeceras) {
          lista.forEach(({ name, value }) => request.cookies.set(name, value));
          respuesta = NextResponse.next({ request });
          lista.forEach(({ name, value, options }) => respuesta.cookies.set(name, value, options));
          cabecerasCookies = cabeceras;
          Object.entries(cabeceras).forEach(([clave, valor]) => respuesta.headers.set(clave, valor));
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const destino = destinoRedireccion(request.nextUrl.pathname, Boolean(data?.claims));
  if (!destino) return respuesta;

  // La redirección debe conservar las cookies refrescadas de la sesión.
  const redireccion = NextResponse.redirect(new URL(destino, request.url));
  respuesta.cookies.getAll().forEach((cookie) => redireccion.cookies.set(cookie));
  Object.entries(cabecerasCookies).forEach(([clave, valor]) => redireccion.headers.set(clave, valor));
  return redireccion;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
