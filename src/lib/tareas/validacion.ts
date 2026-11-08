export const LONGITUD_MAXIMA_TITULO = 120;

// Devuelve el mensaje de error, o null si el título (ya sin espacios sobrantes) es válido.
export function validarTitulo(titulo: string): string | null {
  if (titulo.length === 0) return "Escribe un título para la tarea.";
  if (titulo.length > LONGITUD_MAXIMA_TITULO) {
    return `El título no puede superar los ${LONGITUD_MAXIMA_TITULO} caracteres.`;
  }
  return null;
}
