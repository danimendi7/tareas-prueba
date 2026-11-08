export const LONGITUD_MINIMA_CONTRASENA = 8;

// Devuelve el mensaje de error, o null si las credenciales son válidas.
export function validarCredenciales(email: string, contrasena: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Introduce un email válido.";
  if (contrasena.length < LONGITUD_MINIMA_CONTRASENA) {
    return `La contraseña debe tener al menos ${LONGITUD_MINIMA_CONTRASENA} caracteres.`;
  }
  return null;
}

// Traduce los códigos de error de Supabase Auth al registrarse.
export function mensajeErrorRegistro(codigo: string | undefined): string {
  switch (codigo) {
    case "user_already_exists":
    case "email_exists":
      return "Ya existe una cuenta con ese email.";
    case "weak_password":
      return "La contraseña es demasiado débil. Prueba con otra.";
    case "email_address_invalid":
      return "Introduce un email válido.";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "Demasiados intentos. Espera unos minutos y vuelve a probar.";
    default:
      return "No se ha podido crear la cuenta. Inténtalo de nuevo.";
  }
}
