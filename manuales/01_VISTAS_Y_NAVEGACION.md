# Manual 01 - Vistas y Navegacion

Version: 1.1

## 1) Explicacion no tecnica

### Que problema resuelve
Evita dos problemas operativos comunes:
- Que un usuario vea pantallas que no le sirven (ruido y confusion).
- Que un usuario sin permiso intente hacer acciones que no debe.

### Como funciona en simple
La aplicacion tiene un "portero" de entrada y un "menu inteligente":
- Portero: si no hay sesion valida, te manda a Login.
- Menu inteligente: muestra solo modulos permitidos por rol.

### Ejemplo no tecnico 1
Escenario:
- Ana (TRABAJADOR) inicia sesion.

Resultado esperado:
- Ve Inicio personal.
- Ve Tareas.
- Ve Kanban personal.
- No ve Usuarios ni Apartamentos.

### Ejemplo no tecnico 2
Escenario:
- Carlos (SUPERVISOR) inicia sesion.

Resultado esperado:
- Ve Dashboard general.
- Ve Usuarios (lectura), Tareas, Kanban y Apartamentos.

## 2) Explicacion tecnica

### Archivos clave
- src/App.jsx
- src/components/sidebar/Sidebar.jsx
- src/service/permissions.js

### Como se protege la navegacion
En src/App.jsx se usan dos wrappers:

1. RequireAuth
- Bloquea rutas privadas cuando no hay sesion valida.

2. RequireGuest
- Evita que un usuario ya autenticado vuelva a /login.

### Rutas activas
- /login
- /
- /home
- /tasks
- /users
- /apartments
- /kanban

### Layout compartido
El Layout en src/App.jsx renderiza:
- Sidebar
- Header mobile
- Outlet con la vista actual

Con esto, todas las vistas internas comparten el mismo marco de navegacion.

### Logica del menu
En src/components/sidebar/Sidebar.jsx se evalua:
- canViewUsers()
- canViewApartments()
- canViewAnyTasks()
- canViewAnyKanban()
- canViewAdminDashboard()

Con eso se define que items mostrar y como se etiqueta el primer item:
- Dashboard (admin/supervisor)
- Inicio (trabajador)

## 3) Flujo completo (paso a paso)

1. Usuario abre la app.
2. App valida token/sesion.
3. Si no es valido, redirige a /login.
4. Si es valido, entra al Layout.
5. Sidebar consulta permisos y dibuja menu.
6. Usuario navega a modulo permitido.
7. La vista aplica filtros por permisos sobre los datos.

## 4) Ejemplo tecnico guiado

### Caso: usuario no autenticado entra a /tasks
Entrada:
- URL: /tasks
- Estado: sin token valido

Salida:
- RequireAuth devuelve Navigate a /login.

### Caso: trabajador autenticado
Entrada:
- Rol detectado: TRABAJADOR

Salida en Sidebar:
- Muestra Inicio, Tareas, Kanban.
- Oculta Usuarios y Apartamentos.

## 5) Errores comunes y como detectarlos

- Error: aparece menu vacio
  - Revisar getUserRole() y currentUser en localStorage.

- Error: usuario entra a vista no esperada
  - Revisar helper de permisos usado en Sidebar.

- Error: ruta publica accidental
  - Verificar que la ruta este dentro del bloque RequireAuth.

## 6) Checklist para agregar una vista nueva

1. Crear ruta en src/App.jsx.
2. Definir permiso en src/service/permissions.js.
3. Agregar helper semantico (ejemplo: canViewReports).
4. Mostrar item en Sidebar solo con ese helper.
5. Aplicar filtro de datos por permisos dentro de la vista.
6. Agregar caso de prueba por rol.
