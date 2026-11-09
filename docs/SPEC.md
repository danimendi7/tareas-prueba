# Tareas de prueba

## 1. Qué es y para quién
Aplicación mínima de lista de tareas para validar de punta a punta el sistema autónomo: cuentas de usuario, base de datos con seguridad por usuario (RLS), previews de Vercel, migraciones y producción. La usa Dani para comprobar que todo el circuito funciona.

## 2. MVP: funcionalidades con criterios de aceptación

### F1. Registro, inicio y cierre de sesión (email y contraseña)
- Dado un visitante en /registro, cuando se registra con un email válido y una contraseña de al menos 8 caracteres, entonces entra directamente en /tareas.
- Dado un usuario registrado en /entrar, cuando inicia sesión con sus credenciales, entonces llega a /tareas.
- Dado un usuario en /entrar, cuando introduce una contraseña incorrecta, entonces ve un mensaje de error en español y sigue en /entrar.
- Dado un visitante sin sesión, cuando abre /tareas, entonces se le redirige a /entrar.
- Dado un usuario en /tareas, cuando pulsa "Cerrar sesión", entonces vuelve a /entrar y /tareas deja de ser accesible.

### F2. Crear y ver tareas
- Dado un usuario en /tareas, cuando escribe un título de 1 a 120 caracteres y pulsa "Añadir", entonces la tarea aparece la primera de la lista sin recargar la página.
- Dado un usuario en /tareas, cuando intenta añadir una tarea con el título vacío, entonces no se crea y ve un aviso.
- Dado un usuario con tareas, cuando recarga la página, entonces sigue viendo sus tareas, de la más reciente a la más antigua.

### F3. Completar y borrar
- Dado un usuario con una tarea pendiente, cuando marca su casilla, entonces la tarea aparece tachada y sigue así al recargar.
- Dado un usuario con una tarea, cuando pulsa "Borrar", entonces desaparece y no vuelve al recargar.

### F4. Privacidad
- Dados dos usuarios distintos, cuando cada uno abre /tareas, entonces solo ve sus propias tareas. Debe comprobarse con un test e2e que usa dos cuentas y con políticas RLS en la tabla.

## 3. Ampliaciones tras el MVP (orden de Dani del 2026-11-09)

### F5. Filtrar por estado
- Dado un usuario en /tareas, cuando elige "Todas", "Pendientes" o "Hechas", entonces la lista muestra solo las tareas de ese estado y el filtro activo se indica de forma visible y accesible.
- Dado un usuario con un filtro activo, cuando recarga la página, entonces el filtro sigue activo (va en la URL: `/tareas?filtro=pendientes`).
- Dado un valor de filtro desconocido en la URL, entonces se muestran todas las tareas.
- Dado un filtro sin resultados, entonces se ve un mensaje que lo indica y se puede cambiar de filtro.

### F6. Editar el título
- Dado un usuario con una tarea, cuando pulsa "Editar", cambia el título y pulsa "Guardar", entonces ve el título nuevo y se conserva al recargar.
- Dado un usuario editando, cuando deja el título vacío o supera 120 caracteres, entonces no se guarda y ve un aviso.
- Dado un usuario editando, cuando pulsa "Cancelar", entonces el título no cambia.
- Dados dos usuarios distintos, ninguno puede editar las tareas del otro (RLS).

## 4. Datos: entidades y campos principales
- tareas: id (uuid), user_id (referencia a auth.users), titulo (texto, 1-120), hecha (booleano, por defecto falso), creada (fecha y hora, por defecto ahora).

## 5. Pantallas y navegación
- / → redirige a /tareas si hay sesión, o a /entrar si no.
- /entrar → formulario de inicio de sesión y enlace a /registro.
- /registro → formulario de registro y enlace a /entrar.
- /tareas → formulario para añadir, filtro por estado, lista de tareas con edición del título y botón "Cerrar sesión".

## 6. Usuarios y permisos
- Cualquiera puede registrarse.
- Cada usuario solo puede ver, crear, modificar y borrar sus propias tareas.
- Los tests e2e crean usuarios con emails aleatorios del dominio example.com (la confirmación de email está desactivada en Supabase).

## 7. Fuera de alcance
Recuperar contraseña, inicio de sesión con Google u otros, envío de emails, compartir tareas, fechas límite, etiquetas y selector de modo oscuro.

## 8. Diseño
Limpio y sobrio: una sola columna centrada de 640 px como máximo, buena lectura en móvil, estilos por defecto de Tailwind, sin librerías de componentes.
