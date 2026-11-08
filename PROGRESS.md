# Progreso

Plan creado a partir de docs/SPEC.md. Cada tarea cabe en menos de 1 hora y se comprueba con el criterio indicado.

## Tareas

| ID | Tarea | MVP | Depende de | Criterio de aceptación (comprobable) | Estado | PR / preview |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | Esquema `tareas` con RLS (migración aplicada a staging) | Sí | — | `supabase db push` a staging sin errores; `supabase migration list` la muestra aplicada; test contra staging: sin sesión no se lee ni se inserta ninguna tarea | hecha | #2 |
| T02 | Sesión en `proxy.ts`, redirecciones de `/` y `/tareas`, maquetación base (columna de 640 px) | Sí | — | e2e: sin sesión, `/` y `/tareas` acaban en `/entrar`; `npm run verify` en verde | pendiente | |
| T03 | Página `/registro` con validación | Sí | T02 | e2e: registro con email `@example.com` y contraseña de 8+ caracteres entra en `/tareas`; test unitario de validación | pendiente | |
| T04 | Página `/entrar` con error en español | Sí | T03 | e2e: credenciales correctas → `/tareas`; contraseña incorrecta → mensaje en español y sigue en `/entrar` | pendiente | |
| T05 | Cerrar sesión | Sí | T04 | e2e: "Cerrar sesión" → `/entrar` y `/tareas` deja de ser accesible | pendiente | |
| T06 | Crear y ver tareas | Sí | T01, T05 | e2e: añadir pone la tarea la primera sin recargar; título vacío no crea y avisa; al recargar sigue el orden de más reciente a más antigua; test unitario del límite 1-120 | pendiente | |
| T07 | Completar tarea | Sí | T06 | e2e: marcar la casilla la tacha y sigue tachada al recargar | pendiente | |
| T08 | Borrar tarea | Sí | T06 | e2e: "Borrar" la quita y no vuelve al recargar | pendiente | |
| T09 | Privacidad entre usuarios | Sí | T06 | e2e con dos cuentas: cada una ve solo sus tareas | pendiente | |
| T10 | Cierre: e2e contra producción y DONE.md | Sí | T01-T09 | `BASE_URL=$PRODUCTION_URL npx playwright test` en verde; DONE.md fusionado | pendiente | |
| T11 | Filtro todas / pendientes / hechas | No | T07 | e2e: cada filtro muestra solo las tareas que corresponden | pendiente | |
| T12 | Editar el título de una tarea | No | T06 | e2e: el título editado se conserva al recargar | pendiente | |

Estados: pendiente · en curso · hecha · bloqueada · PR lista para fusionar

## Bloqueos

## Cambios de alcance
