# MVP terminado

**URL de producción:** https://tareas-prueba-ten.vercel.app

Último código verificado: commit `6a02dba` de main. `BASE_URL=<producción> npx playwright test`: **36 de 36 tests en verde** (escritorio y móvil).

## ⚠️ Importante: revisar antes de usarlo de verdad

**Producción y staging comparten la misma base de datos Supabase.** Comprobado el 2026-11-08: una cuenta registrada en la URL de producción inicia sesión con las claves de staging de `.env.local`, y `migrate-prod` informó "Remote database is up to date" porque la migración ya se había aplicado a staging. Consecuencias:

- Todo lo que se aplique a staging afecta de inmediato a producción, antes de fusionar la PR.
- Los usuarios y tareas de prueba de los e2e (`e2e-*@example.com`) están en la base de datos que usa producción.

Para separarlas hay que crear otro proyecto Supabase y cambiar las variables de Vercel (Production) y el secreto `PROD_DB_URL` de GitHub. Son ajustes fuera de los límites de este agente, así que no se han tocado. Al crear el proyecto nuevo, `migrate-prod` aplicará las migraciones con el siguiente cambio en `supabase/migrations`.

## Funcionalidades y prueba que lo demuestra

| Funcionalidad | Prueba |
| --- | --- |
| F1. Registro con acceso directo a /tareas | `e2e/registro.spec.ts` |
| F1. Inicio de sesión y error en español | `e2e/entrar.spec.ts` |
| F1. Sin sesión, / y /tareas redirigen a /entrar | `e2e/redirecciones.spec.ts` |
| F1. Cerrar sesión | `e2e/salir.spec.ts` |
| F2. Crear tareas sin recargar, aviso con título vacío y orden | `e2e/tareas.spec.ts` |
| F3. Completar (tachada al recargar) | `e2e/completar.spec.ts` |
| F3. Borrar (no vuelve al recargar) | `e2e/borrar.spec.ts` |
| F4. Privacidad con dos cuentas y RLS directa | `e2e/privacidad.spec.ts`, `e2e/rls-tareas.spec.ts` |
| Validación de credenciales y título (1-120) | `src/lib/**/validacion.test.ts` |

## Tareas bloqueadas

Ninguna. Quedan pendientes las dos tareas posteriores al MVP: T11 (filtro) y T12 (editar el título).

## Decisiones más importantes (detalle en DECISIONS.md)

- Redirecciones y refresco de sesión en `src/proxy.ts`; las políticas RLS siguen siendo la barrera de seguridad.
- Los e2e crean las cuentas por la interfaz y no las borran, porque no hay clave de servicio.
- La URL del preview se lee del comentario de Vercel en la PR.
- Espera de 20 s en los e2e para los pasos con acción de servidor.

## Limitaciones observadas

- En esta máquina (3 GB de RAM), `npx playwright test` en local con muchos workers contra el servidor de desarrollo da fallos por lentitud; con `--workers=2` funciona. Los e2e contra el preview y contra producción no tienen ese problema.
- Con repeticiones masivas contra un build local, "Añadir" superó en dos ocasiones la espera de 5 s de entonces. No se pudo reproducir con trazas en el servidor (ninguna acción quedó sin terminar; máximo 1,3 s), así que la causa no está confirmada.
