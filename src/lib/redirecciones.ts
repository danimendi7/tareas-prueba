// Decide a dónde hay que enviar una petición según la ruta y si hay sesión.
// Devuelve null cuando la petición puede continuar.
export function destinoRedireccion(ruta: string, conSesion: boolean): string | null {
  if (ruta === "/") return conSesion ? "/tareas" : "/entrar";
  if (!conSesion && (ruta === "/tareas" || ruta.startsWith("/tareas/"))) return "/entrar";
  return null;
}
