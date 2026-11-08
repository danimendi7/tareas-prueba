# Decisiones

Registro de lo que Claude decidió por su cuenta. Una entrada por decisión, la más reciente arriba.

| Fecha | Decisión | Alternativa descartada | Motivo |
| --- | --- | --- | --- |
| 2026-11-08 | Los e2e crean las cuentas por la interfaz (/registro) y no las borran | Crearlas con la API de Supabase y borrarlas con la clave de servicio | No hay clave de servicio en .env.local y la interfaz funciona igual contra staging y producción; quedan usuarios `e2e-*@example.com` en la base de datos |
| 2026-11-08 | La URL del preview se toma del comentario de Vercel en la PR | API de deployments de GitHub | El repo no registra deployments de GitHub por rama |
| 2026-11-08 | La raíz `/` y `/tareas` se redirigen en `src/proxy.ts` con `getClaims()` | Redirigir desde las páginas | Con Cache Components una redirección dentro de Suspense no devuelve un 307 real; RLS sigue siendo la barrera de seguridad |
