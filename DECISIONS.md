# Decisiones

Registro de lo que Claude decidió por su cuenta. Una entrada por decisión, la más reciente arriba.

| Fecha | Decisión | Alternativa descartada | Motivo |
| --- | --- | --- | --- |
| 2026-11-09 | El filtro va en la URL (`/tareas?filtro=pendientes`) y se resuelve en el servidor con Supabase; al añadir una tarea con el filtro "Hechas" activo, no aparece hasta cambiar de filtro | Filtrar en el cliente con estado de React | Sobrevive a la recarga, se puede enlazar y funciona sin JavaScript; cambiar el filtro al añadir ocultaría al usuario lo que estaba mirando |
| 2026-11-09 | Crear T13 y T14 y marcar T11 y T12 como sustituidas, en lugar de reabrirlas | Reabrir T11 y T12 | Las órdenes piden ID nuevos y el historial conserva el error de registro |
| 2026-11-08 | No separar las bases de datos de producción y staging desde el agente; dejarlo como aviso en DONE.md | Cambiar las variables de Vercel o el secreto `PROD_DB_URL` | Crear otro proyecto Supabase y tocar la configuración de producción queda fuera de los límites del agente |
| 2026-11-08 | Espera de 20 s en los e2e para los pasos con acción de servidor (registro, entrar, añadir) | Dejar los 5 s por defecto | El servidor de desarrollo arranca en frío y compila cada ruta al primer uso, lo que supera los 5 s sin que sea un fallo de la app |
| 2026-11-08 | Los e2e crean las cuentas por la interfaz (/registro) y no las borran | Crearlas con la API de Supabase y borrarlas con la clave de servicio | No hay clave de servicio en .env.local y la interfaz funciona igual contra staging y producción; quedan usuarios `e2e-*@example.com` en la base de datos |
| 2026-11-08 | La URL del preview se toma del comentario de Vercel en la PR | API de deployments de GitHub | El repo no registra deployments de GitHub por rama |
| 2026-11-08 | La raíz `/` y `/tareas` se redirigen en `src/proxy.ts` con `getClaims()` | Redirigir desde las páginas | Con Cache Components una redirección dentro de Suspense no devuelve un 307 real; RLS sigue siendo la barrera de seguridad |
