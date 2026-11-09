# Progreso

Plan creado a partir de docs/SPEC.md. Cada tarea cabe en menos de 1 hora y se comprueba con el criterio indicado.

## Tareas

| ID | Tarea | MVP | Depende de | Criterio de aceptación (comprobable) | Esfuerzo | Estado | PR / preview |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | Esquema `tareas` con RLS (migración aplicada a staging) | Sí | — | `supabase db push` a staging sin errores; `supabase migration list` la muestra aplicada; test contra staging: sin sesión no se lee ni se inserta ninguna tarea | — | hecha | #2 |
| T02 | Sesión en `proxy.ts`, redirecciones de `/` y `/tareas`, maquetación base (columna de 640 px) | Sí | — | e2e: sin sesión, `/` y `/tareas` acaban en `/entrar`; `npm run verify` en verde | — | hecha | #3 |
| T03 | Página `/registro` con validación | Sí | T02 | e2e: registro con email `@example.com` y contraseña de 8+ caracteres entra en `/tareas`; test unitario de validación | — | hecha | #4 |
| T04 | Página `/entrar` con error en español | Sí | T03 | e2e: credenciales correctas → `/tareas`; contraseña incorrecta → mensaje en español y sigue en `/entrar` | — | hecha | #5 |
| T05 | Cerrar sesión | Sí | T04 | e2e: "Cerrar sesión" → `/entrar` y `/tareas` deja de ser accesible | — | hecha | #6 |
| T06 | Crear y ver tareas | Sí | T01, T05 | e2e: añadir pone la tarea la primera sin recargar; título vacío no crea y avisa; al recargar sigue el orden de más reciente a más antigua; test unitario del límite 1-120 | — | hecha | #7 |
| T07 | Completar tarea | Sí | T06 | e2e: marcar la casilla la tacha y sigue tachada al recargar | — | hecha | #8 |
| T08 | Borrar tarea | Sí | T06 | e2e: "Borrar" la quita y no vuelve al recargar | — | hecha | #9 |
| T09 | Privacidad entre usuarios | Sí | T06 | e2e con dos cuentas: cada una ve solo sus tareas | — | hecha | #10 |
| T10 | Cierre: e2e contra producción y DONE.md | Sí | T01-T09 | `BASE_URL=$PRODUCTION_URL npx playwright test` en verde; DONE.md fusionado | — | hecha | #11 |
| T11 | Filtro todas / pendientes / hechas | No | T07 | e2e: cada filtro muestra solo las tareas que corresponden | — | sustituida por T13 | — |
| T12 | Editar el título de una tarea | No | T06 | e2e: el título editado se conserva al recargar | — | sustituida por T14 | — |
| T13 | Filtro todas / pendientes / hechas en `/tareas` (orden 2026-11-09) | Orden | T07 | e2e `filtro.spec.ts`: cada filtro muestra solo las tareas que corresponden, sigue activo al recargar y un valor desconocido equivale a "todas"; test unitario de `normalizarFiltro` | high | hecha | #13 |
| T14 | Editar el título de una tarea (orden 2026-11-09) | Orden | T06 | e2e `editar.spec.ts`: el título editado se conserva al recargar, vacío avisa y no guarda, cancelar no cambia nada; e2e `privacidad.spec.ts`: un usuario no puede editar tareas ajenas; test unitario del formulario | high | hecha | #14 |
| T15 | Cierre de la orden: e2e contra producción, orden [hecha] y DONE.md | Orden | T13, T14 | `BASE_URL=$PRODUCTION_URL npx playwright test --workers=2` en verde; DONE.md fusionado y coherente con PROGRESS.md y docs/ORDENES.md | medium | hecha | #15 |

Estados: pendiente · en curso · hecha · bloqueada · PR lista para fusionar · sustituida

## Bloqueos

Ninguna tarea bloqueada.

**Aviso (2026-11-08):** producción y staging usan la misma base de datos Supabase. Requiere una acción humana: ver DONE.md.

## Cambios de alcance

- 2026-11-09: la orden de Dani del 2026-11-09 incorpora el filtro y la edición del título (T13 y T14). T11 y T12 figuraban como "hecha" con PR #8 y #7 por error: esas PR son de T07 y T06 y el código no existía. Se corrigen también los números de PR de T03 a T09, comprobados con `gh pr list --state all`.
