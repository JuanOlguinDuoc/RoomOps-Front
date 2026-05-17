# Manual de Usuario - RoomOps Front (Guía Específica por Rol)

**Versión:** 2.0 (Granular)  
**Fecha:** 2026-05-14  
**Público:** Usuarios finales (ADMIN, SUPERVISOR, TRABAJADOR) y equipo de soporte  
**Descripción:** Este manual es extremadamente específico. Cada acción incluye pasos numerados, nombres exactos de botones, campos de formulario, lo que verás en pantalla, y mensajes de notificación esperados.

---

## SECCIÓN COMÚN - Acceso al Sistema

### 1.1 | INICIAR SESIÓN (Para todos los roles)

**Ubicación:** Pantalla de login  
**Duración:** 2-3 minutos

#### Pasos exactos:

1. **Abre tu navegador** (Chrome, Edge, Firefox recomendado)
2. **Escribe la URL** de la aplicación en la barra de direcciones
3. **Espera a que cargue** la pantalla de login (verás el logo de RoomOps y dos campos de texto)
4. **Haz clic en el campo de correo** (primer campo de texto gris)
5. **Escribe tu correo de usuario** (ej: juan@roomops.com)
6. **Haz clic en el campo de contraseña** (segundo campo de texto gris, bajo el correo)
7. **Escribe tu contraseña** (verás puntos en lugar de caracteres)
8. **Haz clic en el botón azul "Iniciar sesión"** (botón grande en la parte inferior)
9. **Espera de 1-2 segundos**

**Lo que deberías ver:**
- El botón "Iniciar sesión" se pone gris y aparece un pequeño indicador de carga
- La página se actualiza automáticamente
- Eres redirigido a la pantalla de **Inicio** (Home/Dashboard)
- En la esquina superior derecha verás un **toast de éxito** (notificación verde) diciendo "Sesión iniciada correctamente" o similar

**Errores comunes y solución:**

| Error | Solución |
|-------|----------|
| "Usuario o contraseña incorrectos" | Verifica mayúsculas, espacios extras, y que el correo sea el correcto. Intenta de nuevo. |
| "Usuario inactivo" | Contacta soporte. Tu cuenta está desactivada. |
| "No hay conexión" | Revisa tu conexión a internet. Recarga la página (F5). |

---

### 1.2 | CERRAR SESIÓN (Para todos los roles)

**Ubicación:** Desde cualquier pantalla del sistema  
**Duración:** 10-15 segundos

#### Pasos exactos:

1. **Mira el menú lateral izquierdo** (barra gris/oscura en el lado izquierdo de la pantalla)
2. **Desplázate hacia el final del menú** (si el menú es largo, haz scroll hacia abajo)
3. **Busca un elemento que diga "Cerrar sesión"** o un icono de salida (puerta/flecha)
4. **Haz clic en "Cerrar sesión"**
5. **Aparecerá un cuadro de confirmación** con la pregunta "¿Estás seguro de que deseas cerrar sesión?"
6. **Haz clic en el botón "Confirmar"** o "Aceptar" (botón rojo)
7. **Espera 1 segundo**

**Lo que deberías ver:**
- Se cierra la sesión inmediatamente
- Eres redirigido a la pantalla de login
- Verás un **toast de éxito** (notificación) confiriendo el cierre

**Nota importante:** Si cierras el navegador sin hacer logout, tu sesión seguirá activa durante 24 horas. Luego vencerá automáticamente.

---

## SECCIÓN ROL: ADMIN (Administrador)

**Permiso total del sistema.** Puedes crear, editar y eliminar todos los elementos (usuarios, tareas, apartamentos, etc.)

### 2.1 | ACCIONES PRINCIPALES DEL ADMIN

#### 2.1.1 | Ver Dashboard General (ADMIN)

**Ubicación:** Menú lateral > "Inicio" o "Dashboard"  
**Duración:** 1-2 minutos  
**¿Para qué sirve?** Ver resumen global: métricas de tareas, gráfico de estados, tareas urgentes, etc.

##### Pasos:

1. **Haz clic en "Inicio"** en el menú lateral izquierdo
2. **Espera a que cargue la página** (2-3 segundos)
3. **Verás 4-5 tarjetas en el Dashboard:**
   - **"Total de tareas"** (número grande)
   - **"Tareas en progreso"** (número)
   - **"Tareas completadas"** (número)
   - **"Gráfico de estados"** (gráfico de pastel o barras)
   - **"Tareas urgentes"** (lista de tareas con fecha roja)

##### Lo que verás en pantalla:

```
┌─────────────────────────────────────────────────────┐
│ Dashboard General - ADMIN                             │
├─────────────────────────────────────────────────────┤
│ [Total: 42]  [Progreso: 18]  [Completadas: 24]      │
│                                                       │
│ Gráfico de Estados:   [GRÁFICO PASTEL]               │
│  ├─ Pendiente: 5                                     │
│  ├─ En progreso: 18                                  │
│  ├─ Completado: 24                                   │
│  └─ Bloqueado: 1                                     │
│                                                       │
│ Tareas Urgentes (próximas 24h):                      │
│  ├─ Aseo Apto 301 (HOY 18:00)  [Ver detalle]         │
│  ├─ Mantencion Apto 401 (HOY 15:30)  [Ver detalle]   │
│  └─ Repaso Apto 201 (MAÑANA 08:00)  [Ver detalle]    │
└─────────────────────────────────────────────────────┘
```

---

#### 2.1.2 | Crear Nuevo Usuario (ADMIN)

**Ubicación:** Menú lateral > "Usuarios" > Botón "Crear usuario"  
**Duración:** 3-5 minutos  
**¿Para qué sirve?** Agregar un nuevo trabajador, supervisor o admin al sistema

##### Pasos:

1. **Haz clic en "Usuarios"** en el menú lateral
2. **Espera a que cargue la lista de usuarios** (tabla con todos los usuarios actuales)
3. **Busca el botón "Crear usuario"** o **"+"** en la parte superior derecha de la tabla
4. **Haz clic en él**
5. **Se abrirá un modal/ventana emergente** con el formulario de nuevo usuario
6. **Rellena los campos obligatorios:**
   - **Nombre:** (ej: "Juan Pérez") - texto completo
   - **Correo:** (ej: "juan@roomops.com") - debe ser único y válido
   - **Contraseña:** (ej: "MiSegura123") - mínimo 8 caracteres recomendado
   - **Rol:** (dropdown/selector) - elige "ADMIN", "SUPERVISOR" o "TRABAJADOR"
   - **Activo:** (checkbox) - marca la casilla para que el usuario esté activo
7. **Haz clic en el botón "Guardar"** o **"Crear"** (botón azul grande al final del modal)
8. **Espera 1-2 segundos**

**Lo que deberías ver:**
- El modal se cierra automáticamente
- Aparece una **notificación verde en la esquina superior derecha** que dice "Usuario creado exitosamente"
- Vuelves a la lista de usuarios
- El nuevo usuario aparece al final de la tabla (o al inicio, dependiendo del orden)

**Campos del formulario en detalle:**

```
┌─────────────────────────────────┐
│ Crear Nuevo Usuario             │
├─────────────────────────────────┤
│ Nombre:                         │
│ [____________________________]   │
│                                 │
│ Correo:                         │
│ [____________________________]   │
│                                 │
│ Contraseña:                     │
│ [____________________________]   │
│                                 │
│ Rol:                            │
│ [Seleccionar ▼]                 │
│  ├─ ADMIN                       │
│  ├─ SUPERVISOR                  │
│  └─ TRABAJADOR                  │
│                                 │
│ ☑ Activo                        │
│                                 │
│ [Cancelar]  [Guardar]           │
└─────────────────────────────────┘
```

**Validaciones:**
- Si dejas un campo vacío: aparece mensaje rojo "Campo obligatorio"
- Si el correo ya existe: aparece "El correo ya está registrado"
- Si la contraseña es muy corta: aparece "Contraseña debe tener mínimo 8 caracteres"

---

#### 2.1.3 | Editar Usuario Existente (ADMIN)

**Ubicación:** Menú lateral > "Usuarios" > [Buscar usuario en tabla] > Botón "Editar"  
**Duración:** 2-4 minutos

##### Pasos:

1. **Haz clic en "Usuarios"** en el menú lateral
2. **Localiza al usuario en la tabla** (búsqueda opcional: escribe nombre en el campo de búsqueda)
3. **En la fila del usuario, busca un botón de edición** (icono de lápiz o "Editar")
4. **Haz clic en "Editar"**
5. **Se abrirá un modal con los datos del usuario ya rellenados**
6. **Modifica los campos que necesites:**
   - Nombre
   - Correo
   - Rol (cambiar si es necesario)
   - Contraseña (déjalo vacío si no quieres cambiarla)
   - Activo (marca/desmarca según necesite)
7. **Haz clic en "Guardar cambios"** (botón azul)
8. **Espera 1-2 segundos**

**Lo que deberías ver:**
- Notificación verde: "Usuario actualizado exitosamente"
- El modal se cierra
- Vuelves a la lista de usuarios con los cambios reflejados

---

#### 2.1.4 | Desactivar/Activar Usuario (ADMIN)

**Ubicación:** Menú lateral > "Usuarios" > [En tabla] > Botón "Toggle" o "Activar/Desactivar"  
**Duración:** 10 segundos

##### Pasos:

1. **Haz clic en "Usuarios"**
2. **Localiza el usuario en la tabla**
3. **Busca un toggle (interruptor) o botón** que diga "Desactivar" o "Activar" en la fila del usuario
4. **Haz clic en él**
5. **Aparecerá un cuadro de confirmación:** "¿Desactivar usuario [nombre]? Ya no podrá iniciar sesión."
6. **Haz clic en "Confirmar"** (botón rojo)

**Lo que deberías ver:**
- Notificación verde: "Usuario desactivado" o "Usuario activado"
- En la tabla, el usuario mostrará estado como "Inactivo" o un icono de candado si está desactivado

---

#### 2.1.5 | Crear Nueva Tarea (ADMIN)

**Ubicación:** Menú lateral > "Tareas" > Botón "Crear tarea"  
**Duración:** 5-7 minutos

##### Pasos:

1. **Haz clic en "Tareas"** en el menú lateral
2. **Busca el botón "Crear tarea"** o **"+"** en la parte superior derecha
3. **Haz clic en él**
4. **Se abrirá un modal con el formulario de nueva tarea**
5. **Rellena los campos:**
   - **Apartamento:** (dropdown) - selecciona el número de apto (ej: 301, 302, etc.)
   - **Tipo de tarea:** (dropdown) - "MANTENCION", "ASEO" o "REPASO"
   - **Asignado a:** (dropdown) - selecciona el trabajador o supervisor responsable
   - **Descripción:** (texto largo) - describe qué hay que hacer (ej: "Limpiar baño, cambiar toallas, etc.")
   - **Fecha:** (selector de fecha) - selecciona la fecha de ejecución
   - **Estado:** (dropdown) - por defecto "Pendiente"
6. **Haz clic en "Crear"** (botón azul)

**Lo que deberías ver:**
- Modal se cierra
- Notificación verde: "Tarea creada exitosamente"
- La tarea aparece en la lista y/o en el Kanban

**Reglas automáticas (según tipo de tarea):**
- Si tipo = "MANTENCION" → prioridad = ALTA, hora límite = 15:00
- Si tipo = "ASEO" → prioridad = MEDIA, hora límite = 18:00
- Si tipo = "REPASO" → prioridad = BAJA, hora límite = 16:00

---

#### 2.1.6 | Editar Tarea Existente (ADMIN)

**Ubicación:** Menú lateral > "Tareas" > [Hacer clic en la tarea] > Botón "Editar"  
**Duración:** 3-5 minutos

##### Pasos:

1. **Haz clic en "Tareas"**
2. **Localiza la tarea en la lista** (o en el Kanban)
3. **Haz clic en la tarea** para abrir su detalle
4. **Se abrirá un panel lateral** con información de la tarea
5. **Busca un botón "Editar"** o un icono de lápiz
6. **Haz clic en "Editar"**
7. **Los campos ahora son editables** (si estaban bloqueados, ahora cambiarán de color)
8. **Modifica lo que necesites:**
   - Apartamento
   - Tipo
   - Asignado a
   - Descripción
   - Fecha
   - Estado
9. **Haz clic en "Guardar cambios"** (botón azul grande)

**Lo que deberías ver:**
- Notificación verde: "Tarea actualizada"
- El panel se actualiza con los nuevos datos

---

#### 2.1.7 | Ver Detalle de Tarea y Checklist (ADMIN)

**Ubicación:** Menú lateral > "Tareas" > Haz clic en cualquier tarea  
**Duración:** 2-3 minutos

##### Pasos:

1. **Haz clic en "Tareas"**
2. **Verás una lista o tabla de tareas**
3. **Busca una tarea y haz clic en ella**
4. **Se abrirá un panel lateral (TaskDetailPanel) con:**
   - **Información superior:** Apartamento, Asignado a, Tipo, Fecha, Hora límite
   - **Descripción:** Lo que hay que hacer
   - **Checklist:** Lista de items (sub-tareas) con checkboxes
5. **Observa el estado de cada item:**
   - Si hay un cuadrado gris = "Pendiente" (sin empezar)
   - Si hay un cuadrado azul/verde = "Completado" (hecho)
   - Si hay un cuadrado rojo = "Bloqueado" (no se puede hacer, hay problema)

##### Estados del Checklist en detalle:

```
Checklist de "Aseo Apto 301":
┌─ □ Limpiar baño (Pendiente)
├─ ✓ Cambiar toallas (Completado)
├─ ✗ Vaciar basura (Bloqueado - Sin bolsas disponibles)
└─ □ Limpiar cocina (Pendiente)

Total: 4 items
Completados: 1
Pendientes: 2
Bloqueados: 1
Progreso: 25%
```

**Como cambiar estado de un item:**
1. **Haz clic en el checkbox del item**
2. **Se abrirá un pequeño menú emergente** con opciones:
   - "Pendiente" (cuadrado gris)
   - "Completado" (checkmark verde)
   - "Bloqueado" (X roja)
3. **Selecciona el nuevo estado**
4. **Si seleccionas "Bloqueado", aparecerá un campo** donde puedes escribir la razón/nota (ej: "Sin bolsas")
5. **El item cambia de color inmediatamente**

**Guardar cambios:**
1. **Después de cambiar estados, busca el botón "Guardar cambios"** (botón azul) al final del panel
2. **Haz clic en "Guardar cambios"**
3. **Espera 1-2 segundos**

**Lo que deberías ver:**
- Notificación verde: "Cambios guardados" o "Checklist actualizado"
- Si vuelves a abrir la tarea, los cambios estarán allí

---

#### 2.1.8 | Ver Vista Kanban (ADMIN)

**Ubicación:** Menú lateral > "Kanban"  
**Duración:** 1-2 minutos  
**¿Para qué sirve?** Ver todas las tareas organizadas por columnas de estado de forma visual

##### Pasos:

1. **Haz clic en "Kanban"** en el menú lateral
2. **Espera a que cargue**
3. **Verás 4 columnas principales:**
   - **"Pendiente"** - tareas sin empezar
   - **"En progreso"** - tareas en curso
   - **"Completado"** - tareas terminadas
   - **"Bloqueado"** - tareas detenidas por problemas

##### Visualización:

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Pendiente  │ En Progreso │  Completado │  Bloqueado  │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ ┌─────────┐ │ ┌─────────┐ │ ┌─────────┐ │ ┌─────────┐ │
│ │ Aseo301 │ │ │Mant.401 │ │ │Repaso201│ │ │Aseo501  │ │
│ │18:00    │ │ │15:00    │ │ │16:00    │ │ │Sin stock│ │
│ └─────────┘ │ └─────────┘ │ └─────────┘ │ └─────────┘ │
│             │             │             │             │
│ ┌─────────┐ │             │ ┌─────────┐ │             │
│ │Repaso301│ │             │ │Aseo302  │ │             │
│ │16:00    │ │             │ │18:00    │ │             │
│ └─────────┘ │             │ └─────────┘ │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Como cambiar estado de una tarea (Drag & Drop):**
1. **En el Kanban, cada tarea es una "tarjeta"**
2. **Haz clic y mantén presionada una tarjeta**
3. **Arrastra (drag) la tarjeta a otra columna** (ej: de "Pendiente" a "En progreso")
4. **Suelta el mouse**
5. **La tarea se actualiza automáticamente** en 1-2 segundos

**Lo que deberías ver:**
- La tarjeta se mueve a la nueva columna
- Notificación verde: "Tarea actualizada"

---

#### 2.1.9 | Ver y Administrar Apartamentos (ADMIN)

**Ubicación:** Menú lateral > "Apartamentos"  
**Duración:** 2-3 minutos

##### Pasos para ver:

1. **Haz clic en "Apartamentos"** en el menú lateral
2. **Verás una tabla/lista con todos los apartamentos**
3. **Columnas típicas:**
   - Número de apto
   - Piso
   - Tipo (ej: "Estudio", "1 Dormitorio")
   - Estado (Disponible / Ocupado / Mantenimiento)
   - Acciones

##### Crear nuevo apartamento:

1. **En la tabla, busca botón "Crear apartamento"** o **"+"**
2. **Haz clic en él**
3. **Se abrirá un modal**
4. **Rellena:**
   - **Número:** (ej: "301")
   - **Piso:** (ej: "3")
   - **Tipo:** (dropdown) - "Estudio", "1 Dormitorio", "2 Dormitorios", etc.
   - **Estado:** (dropdown) - "Disponible", "Ocupado", "Mantenimiento"
5. **Haz clic en "Crear"**

**Lo que deberías ver:**
- Notificación verde: "Apartamento creado exitosamente"
- El nuevo apto aparece en la tabla

---

#### 2.1.10 | Filtrar y Buscar Tareas (ADMIN)

**Ubicación:** Menú lateral > "Tareas"  
**Duración:** 1-2 minutos

##### Pasos:

1. **Haz clic en "Tareas"**
2. **Verás una o más barras de filtro en la parte superior:**
   - **Campo "Buscar"** - escribe nombre o descripción
   - **Filtro "Apartamento"** - dropdown para seleccionar apto específico
   - **Filtro "Estado"** - dropdown (Pendiente, En progreso, etc.)
   - **Filtro "Tipo"** - dropdown (Mantencion, Aseo, Repaso)
   - **Filtro "Asignado a"** - dropdown (nombre del trabajador)
   - **Filtro "Fecha"** - selector de rango de fechas
3. **Selecciona los filtros que quieras** (puedes combinadores)
4. **La tabla se actualiza automáticamente** mostrando solo tareas que coincidan

##### Ejemplo de filtrado:

```
Buscar: [___________]
Apartamento: [301 ▼]
Estado: [Pendiente ▼]
Tipo: [ASEO ▼]
Asignado a: [Juan ▼]
Fecha: [Desde 2026-05-14 Hasta 2026-05-20]

[Aplicar filtros]  [Limpiar]
```

4. **Haz clic en "Limpiar"** si quieres volver a ver todas las tareas

---

### 2.2 | FLUJO COMPLETO: ADMIN COMIENZA SU DÍA

**Scenario:** Es lunes 8:00 AM, eres ADMIN. Necesitas revisar el estado general, ver tareas urgentes y redistribuir carga.

1. **Inicia sesión** (ver sección 1.1)
2. **Haz clic en "Inicio"** (Dashboard general)
3. **Observa las 4-5 tarjetas** de métricas:
   - ¿Cuántas tareas hay en total?
   - ¿Cuántas están pendientes?
   - ¿Hay tareas bloqueadas?
4. **Mira la sección "Tareas urgentes"** (próximas 24h):
   - Si hay tareas urgentes (rojo o naranja), observa cuáles son
5. **Haz clic en "Tareas"** en el menú lateral
6. **Aplica filtro por "Estado"** = "Pendiente" para ver qué falta hacer
7. **Si hay muchas tareas pendientes en un trabajador**, considera crear una nueva tarea o redistribuir
8. **Haz clic en "Kanban"** para ver la carga visual
9. **Si una columna está muy llena (ej: muchas tareas en "Pendiente"), haz clic en una tarea**
10. **Abre el detalle, edita si es necesario** y cambia su estado
11. **Antes de terminar tu turno, haz logout** (ver sección 1.2)

---

## SECCIÓN ROL: SUPERVISOR (Supervisor)

**Permisos limitados:** Puedes crear y editar tareas, cambiar estados, ver usuarios en lectura, pero NO puedes crear/eliminar usuarios ni apartamentos.

### 3.1 | ACCIONES PRINCIPALES DEL SUPERVISOR

#### 3.1.1 | Ver Dashboard General (SUPERVISOR)

**Ubicación:** Menú lateral > "Inicio"  
**Duración:** 1-2 minutos  
**¿Para qué sirve?** Ver resumen de tareas y carga general (similar a ADMIN pero sin algunos detalles)

##### Pasos:

1. **Haz clic en "Inicio"** en el menú lateral
2. **Espera a que cargue**
3. **Verás tarjetas con:**
   - Total de tareas
   - Tareas en progreso
   - Tareas completadas
   - Gráfico de estados
   - Tareas urgentes

**Diferencia respecto a ADMIN:**
- No puedes ver datos de rentabilidad o reportes avanzados
- Solo ves resumen operativo

---

#### 3.1.2 | Ver Lista de Usuarios (SUPERVISOR - Lectura)

**Ubicación:** Menú lateral > "Usuarios"  
**Duración:** 1-2 minutos  
**¿Para qué sirve?** Ver quiénes son los trabajadores y supervisores (NO puedes crear/editar/eliminar)

##### Pasos:

1. **Haz clic en "Usuarios"** en el menú lateral
2. **Verás una tabla con todos los usuarios**
3. **Puedes:**
   - Ver nombre, correo, rol
   - Buscar un usuario específico (campo de búsqueda)
   - Ver si está activo o inactivo
4. **NO verás:**
   - Botones para crear, editar o eliminar
   - (Si hay controles de edición, no te permitirán hacer nada - aparecerá un mensaje "No tienes permisos")

---

#### 3.1.3 | Crear Nueva Tarea (SUPERVISOR)

**Ubicación:** Menú lateral > "Tareas" > Botón "Crear tarea"  
**Duración:** 5-7 minutos

##### Pasos (idéntico a ADMIN):

1. **Haz clic en "Tareas"**
2. **Busca el botón "Crear tarea"** o **"+"**
3. **Haz clic en él**
4. **Se abrirá un modal**
5. **Rellena los campos:**
   - **Apartamento:** (dropdown)
   - **Tipo de tarea:** "MANTENCION", "ASEO" o "REPASO"
   - **Asignado a:** Selecciona a cuál trabajador
   - **Descripción:** Detalles de la tarea
   - **Fecha:** Selecciona fecha
6. **Haz clic en "Crear"**

**Lo que deberías ver:**
- Notificación verde: "Tarea creada exitosamente"

---

#### 3.1.4 | Editar Tarea Existente (SUPERVISOR)

**Ubicación:** Menú lateral > "Tareas" > Busca tarea > Haz clic > "Editar"  
**Duración:** 3-5 minutos

##### Pasos (idéntico a ADMIN):

1. **Haz clic en "Tareas"**
2. **Busca la tarea**
3. **Haz clic en la tarea**
4. **Se abrirá el panel lateral**
5. **Haz clic en "Editar"**
6. **Modifica los campos necesarios**
7. **Haz clic en "Guardar cambios"**

---

#### 3.1.5 | Ver Detalle de Tarea y Actualizar Checklist (SUPERVISOR)

**Ubicación:** Menú lateral > "Tareas" > Haz clic en una tarea  
**Duración:** 3-5 minutos

##### Pasos:

1. **Haz clic en "Tareas"**
2. **Localiza una tarea en la lista**
3. **Haz clic en la tarea** para abrir su panel lateral
4. **Verás el checklist con items**
5. **Haz clic en un checkbox** del checklist
6. **Selecciona el nuevo estado:**
   - "Pendiente"
   - "Completado"
   - "Bloqueado"
7. **Si seleccionas "Bloqueado", escribe la razón** en el campo de nota
   - Ej: "Aguardando repuesto", "Sin suministros", etc.
8. **Haz clic en "Guardar cambios"** (botón azul grande)

**Lo que deberías ver:**
- El estado del item cambia de color inmediatamente
- Notificación verde: "Cambios guardados"

**Tip importante:** Como SUPERVISOR, tu responsabilidad es mantener el checklist actualizado en **tiempo real** mientras los trabajadores ejecutan las tareas. Coordina con ellos.

---

#### 3.1.6 | Cambiar Estado de Tarea (SUPERVISOR)

**Ubicación:** Menú lateral > "Tareas" o "Kanban"  
**Duración:** 1-2 minutos

##### Opción A - Desde la tabla de Tareas:

1. **Haz clic en "Tareas"**
2. **Localiza la tarea en la tabla**
3. **Busca una columna "Estado"** que muestre botones o dropdown
4. **Haz clic en el estado actual** (ej: "Pendiente")
5. **Se abrirá un dropdown con opciones:**
   - Pendiente
   - En progreso
   - Completado
   - Bloqueado
6. **Selecciona el nuevo estado**
7. **La tarea se actualiza automáticamente** en 1-2 segundos

##### Opción B - Desde el Kanban:

1. **Haz clic en "Kanban"** en el menú lateral
2. **Verás 4 columnas (Pendiente, En progreso, Completado, Bloqueado)**
3. **Busca la tarjeta de la tarea que quieres mover**
4. **Haz clic y mantén presionada la tarjeta**
5. **Arrastra (drag) la tarjeta a otra columna**
6. **Suelta el mouse**

**Lo que deberías ver:**
- La tarjeta se mueve a la nueva columna
- Notificación verde: "Tarea actualizada"

---

#### 3.1.7 | Usar Filtros en Tareas (SUPERVISOR)

**Ubicación:** Menú lateral > "Tareas" > Barra de filtros  
**Duración:** 1-2 minutos

**Nota:** Como SUPERVISOR, típicamente quieres filtrar por:
- Trabajador específico (para ver su carga)
- Estado "Bloqueado" (para detectar problemas)
- Fecha del turno actual

##### Pasos:

1. **Haz clic en "Tareas"**
2. **Verás barra de filtros con opciones:**
   - **Apartamento:** Selecciona apto específico
   - **Estado:** Ej: "Bloqueado" para ver tareas con problemas
   - **Tipo:** "ASEO", "MANTENCION", "REPASO"
   - **Asignado a:** Nombre del trabajador
   - **Fecha:** Rango de fechas (ej: HOY)
3. **Selecciona los filtros deseados**
4. **La tabla se actualiza automáticamente**
5. **Cuando quieras limpiar filtros, haz clic en "Limpiar"** o **"Reset"**

**Ejemplo de uso:**
- Filtro: Asignado a = "Juan" + Estado = "Bloqueado"
- Resultado: Ves todas las tareas bloqueadas de Juan. Así sabes dónde él necesita ayuda.

---

#### 3.1.8 | Ver Vista Kanban (SUPERVISOR)

**Ubicación:** Menú lateral > "Kanban"  
**Duración:** 1-2 minutos

##### Pasos:

1. **Haz clic en "Kanban"**
2. **Verás 4 columnas:** Pendiente, En progreso, Completado, Bloqueado
3. **Cada tarjeta muestra:**
   - Número de apartamento
   - Tipo de tarea
   - Hora límite
   - Quien está asignado (opcional)
4. **Si una columna tiene muchas tarjetas (ej: muchas en "Bloqueado"), toma nota para investigar**
5. **Haz clic en una tarjeta** para ver su detalle y resolver el bloqueo

**Tip:** El Kanban es excelente para ver distribución de carga de forma visual. Si una columna está muy llena, hay problema de capacidad.

---

### 3.2 | FLUJO COMPLETO: SUPERVISOR COMIENZA SU TURNO

**Scenario:** Es martes 14:30, eres SUPERVISOR. Necesitas revisar tareas del turno y coordinar con trabajadores.

1. **Inicia sesión** (ver sección 1.1)
2. **Haz clic en "Inicio"** - revisa resumen de tareas
3. **Haz clic en "Kanban"** - observa visual de estados
   - ¿Hay muchas tareas bloqueadas?
   - ¿Alguna columna está sobrecargada?
4. **Haz clic en "Tareas"** - filtra por:
   - Fecha = HOY
   - Estado = "Bloqueado" (para ver problemas)
5. **Si hay tareas bloqueadas:**
   - Haz clic en cada una
   - Lee la nota/razón del bloqueo
   - Toma acciones (ej: conseguir suministro, reasignar, etc.)
6. **Coordina con trabajadores:**
   - Asigna tareas nuevas si es necesario
   - Actualiza estados del checklist en tiempo real
7. **Antes de terminar, haz logout**

---

## SECCIÓN ROL: TRABAJADOR (Trabajador/Operario)

**Permisos mínimos (lectura + ejecución):** Solo ves tus tareas asignadas. Puedes editar checklist de tus tareas y cambiar su estado. NO puedes crear tareas, editar apartamentos, ni ver otros usuarios.

### 4.1 | ACCIONES PRINCIPALES DEL TRABAJADOR

#### 4.1.1 | Ver Dashboard Personal (TRABAJADOR)

**Ubicación:** Menú lateral > "Inicio"  
**Duración:** 1-2 minutos  
**¿Para qué sirve?** Ver resumen de TUS tareas asignadas: próxima urgente, progreso, tareas recientes

##### Pasos:

1. **Haz clic en "Inicio"** en el menú lateral
2. **Espera a que cargue**
3. **Verás tarjetas personalizadas para TI:**
   - **"Tus tareas pendientes"** - número de tareas sin empezar
   - **"Progreso de hoy"** - barra de porcentaje (cuánto completaste vs total)
   - **"Próxima tarea urgente"** - tarjeta roja/naranja con la tarea más urgente
   - **"Tareas recientes"** - lista de últimas tareas que hiciste

##### Visualización:

```
┌─────────────────────────────────────┐
│ Dashboard Personal - TRABAJADOR      │
├─────────────────────────────────────┤
│ Tus tareas pendientes: 3             │
│ Progreso de hoy: [████░░░░] 40%      │
│                                      │
│ Próxima Tarea Urgente:              │
│ ┌──────────────────────────────────┐ │
│ │ Aseo Apto 301 - ASEO             │ │
│ │ Límite: HOY 18:00 (1h 30min)     │ │
│ │ [Ver detalle]  [Editar checklist]│ │
│ └──────────────────────────────────┘ │
│                                      │
│ Tareas Recientes:                   │
│ ✓ Repaso Apto 201 (Completado)      │
│ ✓ Aseo Apto 302 (Completado)        │
│ ✓ Mantencion Apto 101 (Completado)  │
└─────────────────────────────────────┘
```

**Tips:**
- El botón **"Ver detalle"** te lleva al panel de detalle
- El botón **"Editar checklist"** abre el checklist directamente sin paso intermediario

---

#### 4.1.2 | Ver Tus Tareas Asignadas (TRABAJADOR)

**Ubicación:** Menú lateral > "Tareas"  
**Duración:** 1-2 minutos

##### Pasos:

1. **Haz clic en "Tareas"** en el menú lateral
2. **AUTOMÁTICAMENTE, solo ves TUS tareas** (el sistema filtra por ti)
3. **Verás una lista/tabla con tus tareas:**
   - Apartamento
   - Tipo de tarea
   - Fecha de ejecución
   - Hora límite
   - Estado actual
   - Descripción breve
4. **Puedes aplicar filtros adicionales:**
   - Filtro "Estado" - para ver solo "Pendientes" o solo "En progreso"
   - Filtro "Fecha" - para ver tareas de un día específico
5. **Haz clic en cualquier tarea** para ver su detalle completo

**Nota importante:** Como TRABAJADOR, NO verás tareas de otros compañeros. Solo las tuyas.

---

#### 4.1.3 | Abrir Detalle de Tarea y Ver Checklist (TRABAJADOR)

**Ubicación:** Menú lateral > "Tareas" > Haz clic en una tarea  
**Duración:** 2-3 minutos

##### Pasos:

1. **Haz clic en "Tareas"**
2. **Localiza una tarea en la lista** (ej: "Aseo Apto 301")
3. **Haz clic en la tarea**
4. **Se abrirá un panel lateral** (TaskDetailPanel) con toda la información:

```
┌─────────────────────────────────────────┐
│ Detalle de Tarea - Aseo Apto 301        │
├─────────────────────────────────────────┤
│ Apartamento: 301                        │
│ Tipo: ASEO (MEDIA)                      │
│ Asignado a: Tu nombre                   │
│ Fecha: 2026-05-14                       │
│ Hora límite: 18:00 (2h 30min)           │
│                                         │
│ Descripción:                            │
│ Limpiar baño, cambiar toallas,          │
│ vaciar basura, limpiar pisos            │
│                                         │
│ CHECKLIST:                              │
│ ┌─ □ Limpiar baño                       │
│ ├─ □ Cambiar toallas                    │
│ ├─ □ Vaciar basura                      │
│ └─ □ Limpiar pisos                      │
│                                         │
│ Estado general: PENDIENTE (0/4 items)   │
│                                         │
│ [Guardar cambios]                       │
└─────────────────────────────────────────┘
```

---

#### 4.1.4 | Actualizar Checklist de tu Tarea (TRABAJADOR)

**Ubicación:** Menú lateral > "Tareas" > [Tarea] > Checklist  
**Duración:** 5-15 minutos (mientras ejecutas la tarea)

**¡IMPORTANTE!** Como TRABAJADOR, debes actualizar el checklist **mientras ejecutas la tarea en tiempo real**. No al final del día.

##### Pasos:

1. **Abre el detalle de tu tarea** (ver sección 4.1.3)
2. **Verás la lista de checklist items**
3. **Cuando COMPLETES un item físicamente, en la pantalla:**
   - **Haz clic en el checkbox** del item
   - **Se abrirá un pequeño menú con opciones:**
     - ☑ Completado (verde/azul)
     - ☐ Pendiente (gris)
     - ✗ Bloqueado (rojo)
4. **Selecciona "Completado"**
5. **El item cambia de color a verde/azul inmediatamente**
6. **Repite con cada item conforme lo hagas**
7. **Observa la barra de progreso** que se va llenando (ej: 1/4, 2/4, 3/4, 4/4)

##### Ejemplo en tiempo real:

```
Estás en el Apto 301. Comienzas a limpiar.

Tiempo: 14:30
□ Limpiar baño ← EMPIEZAS AQUÍ
○ Cambiar toallas
○ Vaciar basura
○ Limpiar pisos
Progreso: 0/4

Tiempo: 14:45
✓ Limpiar baño ← COMPLETADO (hiciste clic)
□ Cambiar toallas ← AHORA AQUÍ
○ Vaciar basura
○ Limpiar pisos
Progreso: 1/4

Tiempo: 15:15
✓ Limpiar baño
✓ Cambiar toallas ← COMPLETADO
□ Vaciar basura ← AHORA AQUÍ
○ Limpiar pisos
Progreso: 2/4

Y así hasta completar...

Tiempo: 16:30
✓ Limpiar baño
✓ Cambiar toallas
✓ Vaciar basura
✓ Limpiar pisos ← COMPLETADO
Progreso: 4/4 ✓ TODO LISTO
```

---

#### 4.1.5 | Marcar Item como BLOQUEADO (Si hay problema) (TRABAJADOR)

**Ubicación:** Durante la ejecución de tarea > Checklist  
**Duración:** 30-60 segundos

**¿Para qué?** Si hay un problema y NO PUEDES completar un item, lo marcas como "Bloqueado" y dejas una nota para tu supervisor.

##### Pasos:

1. **Estás ejecutando la tarea, pero encuentras un problema**
   - Ej: Falta suministro, hay daño a reparar, etc.
2. **En el checklist, haz clic en el item problemático**
3. **Se abre el menú emergente**
4. **Selecciona "Bloqueado"**
5. **Aparecerá un campo de texto** donde puedes escribir la razón
6. **Escribe una nota CLARA Y BREVE:**
   - ✅ "Sin bolsas de basura disponibles"
   - ✅ "Fregadero roto, necesita reparación"
   - ✅ "Toallas no disponibles en almacén"
   - ❌ No escribas: "problema" o "no se puede"
7. **El item cambia a rojo** con la nota guardada
8. **Continúa con otros items si puedes**

##### Ejemplo:

```
Estás limpiando el Apto 301.

✓ Limpiar baño
✓ Cambiar toallas
✗ Vaciar basura ← BLOQUEADO
  Nota: "No hay bolsas de basura"
□ Limpiar pisos ← Continúas con esto

Luego tu SUPERVISOR verá la nota y tomará acción.
```

---

#### 4.1.6 | Guardar Cambios del Checklist (TRABAJADOR)

**Ubicación:** Menú lateral > "Tareas" > [Tarea] > Botón "Guardar cambios"  
**Duración:** 2-3 segundos

**¡MUY IMPORTANTE!** Después de actualizar items del checklist, **DEBES presionar "Guardar cambios"** para que los cambios se guarden en el servidor. Si no haces clic, los cambios no persisten si cierras la sesión.

##### Pasos:

1. **Después de cambiar estados de items en el checklist**
2. **Busca el botón azul grande "Guardar cambios"** (está al final del panel)
3. **Haz clic en él**
4. **Espera 1-2 segundos**
5. **Deberías ver una NOTIFICACIÓN VERDE** en la esquina superior derecha que dice:
   - "Cambios guardados exitosamente"
   - "Checklist actualizado"
   - O simplemente "✓ Guardado"

##### Qué pasa si NO haces clic en "Guardar":

- ❌ Los cambios desaparecen si te desconectas
- ❌ Tu supervisor no verá las actualizaciones
- ❌ La tarea seguirá apareciendo como "sin completar"

##### Qué pasa si SÍ haces clic en "Guardar":

- ✅ Los cambios se guardan en el servidor
- ✅ Si vuelves a abrir la tarea, los cambios están ahí
- ✅ Tu supervisor ve las actualizaciones en tiempo real
- ✅ El Dashboard muestra tu progreso correcto

**Tip:** Haz clic en "Guardar cambios" **después de cada item importante** o al menos **al final de la tarea**.

---

#### 4.1.7 | Ver Estado General de tu Tarea (TRABAJADOR)

**Ubicación:** Detalle de Tarea > Barra de progreso  
**Duración:** 10 segundos

**¿Para qué?** Ver de un vistazo cuánto completaste vs cuánto falta.

##### Lo que verás:

```
CHECKLIST:
□ Limpiar baño
□ Cambiar toallas
□ Vaciar basura
□ Limpiar pisos

Estado general: PENDIENTE (0/4 items)
[████████░░░░░░░░░░░░] 0%

---

(Después de completar 2 items)

✓ Limpiar baño
✓ Cambiar toallas
□ Vaciar basura
□ Limpiar pisos

Estado general: EN PROGRESO (2/4 items)
[████████████████░░░░] 50%

---

(Después de completar todos)

✓ Limpiar baño
✓ Cambiar toallas
✓ Vaciar basura
✓ Limpiar pisos

Estado general: COMPLETADO (4/4 items)
[████████████████████] 100% ✓
```

---

#### 4.1.8 | Ver Tu Kanban Personal (TRABAJADOR)

**Ubicación:** Menú lateral > "Kanban"  
**Duración:** 1-2 minutos

##### Pasos:

1. **Haz clic en "Kanban"**
2. **Verás 4 columnas**, pero SOLO tus tareas:
   - Pendiente (tus tareas sin empezar)
   - En progreso (tus tareas en curso)
   - Completado (tus tareas terminadas)
   - Bloqueado (tus tareas con problemas)
3. **Cada tarjeta muestra:**
   - Apartamento
   - Tipo de tarea
   - Hora límite
4. **Puedes arrastrar tarjetas entre columnas** (Drag & Drop) para cambiar estado
5. **O haz clic en una tarjeta** para ver su detalle

---

#### 4.1.9 | Cambiar Estado de tu Tarea (TRABAJADOR)

**Ubicación:** Kanban o Detalle de Tarea  
**Duración:** 1-2 minutos

**¿Cómo cambias el estado PRINCIPAL de la tarea?** (No confundir con cambiar items del checklist)

##### Opción A - Desde el Detalle:

1. **Abre el detalle de la tarea** (ver sección 4.1.3)
2. **Busca un campo "Estado de tarea"** o **"Status"** (diferente del checklist)
3. **Haz clic en el estado actual** (ej: "Pendiente")
4. **Se abrirá un dropdown con opciones:**
   - Pendiente
   - En progreso
   - Completado
   - Bloqueado
5. **Selecciona el nuevo estado**
6. **Haz clic en "Guardar cambios"**

##### Opción B - Desde el Kanban:

1. **Haz clic en "Kanban"**
2. **Busca tu tarea en una columna**
3. **Haz clic y mantén presionada la tarjeta**
4. **Arrastra a otra columna**
5. **Suelta el mouse**
6. **La tarea se actualiza automáticamente**

**Nota:** Típicamente, cambias el estado principal cuando:
- Empiezas la tarea: "Pendiente" → "En progreso"
- Terminas la tarea: "En progreso" → "Completado"
- Hay problema: "En progreso" → "Bloqueado"

---

### 4.2 | FLUJO COMPLETO: TRABAJADOR COMIENZA SU TURNO

**Scenario:** Es miércoles 14:00, eres TRABAJADOR. Comienza tu turno de tarde.

1. **Inicia sesión** (ver sección 1.1)
2. **Haz clic en "Inicio"** - ves tu Dashboard personal
   - Verás "Proxima tarea urgente" destacada en rojo
   - Verás tu barra de "Progreso de hoy"
3. **Haz clic en "Ver detalle"** de la tarea urgente
4. **Se abre el panel de detalle**
5. **Lees la descripción y el checklist**
6. **Bajas al Apto 301 y comienzas la tarea física**
7. **Mientras ejecutas, abres el panel en tu celular o tablet**
8. **Cada vez que completas un item, actualizas el checklist:**
   - Haz clic en checkbox
   - Selecciona "Completado"
   - El item se marca verde
9. **Si hay problema (ej: no hay toallas), lo marcas "Bloqueado" con nota**
10. **Cuando terminas todos los items (o tareas bloqueadas), haz clic en "Guardar cambios"**
11. **Verifica notificación verde "Cambios guardados"**
12. **Cambias el estado de la tarea a "Completado"** (desde Detalle o Kanban)
13. **Regresas al Dashboard y ves que la próxima tarea urgente cambió**
14. **Repites el proceso con la siguiente tarea**
15. **Al final del turno, haz logout**

---

## SECCIÓN COMÚN - Solución de Problemas

### 5.1 | Problema: "No puedo iniciar sesión"

**Síntomas:**
- Botón "Iniciar sesión" no responde
- Aparece mensaje "Usuario o contraseña incorrectos"
- Aparece mensaje "Usuario inactivo"

**Soluciones:**

| Paso | Acción |
|------|--------|
| 1 | Verifica que escribiste el correo **exactamente** como fue creado (mayúsculas, sin espacios) |
| 2 | Verifica que la contraseña es **exacta** (sin espacios al inicio o final) |
| 3 | Intenta **recargar la página** (F5 o Cmd+R en Mac) |
| 4 | Borrar **cookies y caché del navegador**: Ctrl+Shift+Delete (Chrome) o Cmd+Shift+Delete (Mac) |
| 5 | Si aún no funciona, **reporta a soporte** con: correo usado, hora del intento, captura de error |

**Contacto de soporte:** email@roomops.com o teléfono (si aplica)

---

### 5.2 | Problema: "No veo mis tareas asignadas" (TRABAJADOR)

**Síntomas:**
- Entro a "Tareas" pero aparece lista vacía
- No hay tareas en Dashboard

**Soluciones:**

| Paso | Acción |
|------|--------|
| 1 | Verifica que tu sesión está activa (¿ves tu nombre en la esquina superior derecha?) |
| 2 | Recarga la página (F5) |
| 3 | Revisa que **realmente tienes tareas asignadas** (pregunta a supervisor) |
| 4 | Si el supervisor asignó una tarea hace poco, espera 1-2 minutos a que se sincronice |
| 5 | Si persiste, **reporta a soporte** |

---

### 5.3 | Problema: "Actualicé el checklist pero no se guardó"

**Síntomas:**
- Cambio estado de un item (checkbox pasa a verde)
- Cierro la tarea o recargo la página
- El item vuelve a estar pendiente (gris)

**Soluciones:**

| Paso | Acción |
|------|--------|
| 1 | **IMPORTANTE:** Después de cambiar items, **DEBES hacer clic en "Guardar cambios"** (botón azul grande) |
| 2 | Si ya hiciste clic, espera a ver notificación verde de confirmación |
| 3 | Verifica conexión a internet (¿tienes conexión activa?) |
| 4 | Recarga la página (F5) y abre la tarea de nuevo |
| 5 | Si los cambios siguen sin guardar, **reporta a soporte** con: hora del intento, número de tarea, captura de pantalla |

**Nota clave:** Sin el botón "Guardar cambios", nada persiste. Esto es normal y por diseño.

---

### 5.4 | Problema: "No veo un módulo en el menú" (ej: no veo "Usuarios")

**Síntomas:**
- El menú lateral no muestra cierta sección (Usuarios, Apartamentos, etc.)
- Intento forzar la URL y aparece "No tienes permisos"

**Soluciones:**

| Paso | Acción |
|------|--------|
| 1 | Verifica tu **rol actual** (esquina superior derecha o perfil) |
| 2 | Recuerda que cada rol ve módulos diferentes: |
| | - ADMIN: ve TODO (Inicio, Tareas, Kanban, Usuarios, Apartamentos) |
| | - SUPERVISOR: ve Inicio, Tareas, Kanban, Usuarios (lectura) |
| | - TRABAJADOR: ve Inicio, Tareas, Kanban |
| 3 | Si crees que debería ver un módulo, **contacta al ADMIN** para que revise permisos |
| 4 | No intentes forzar URLs manualmente (no funcionará) |

---

### 5.5 | Problema: "Cambié algo pero los otros usuarios no lo ven"

**Síntomas:**
- Actualizo una tarea pero mi supervisor no ve los cambios
- Cambio el estado de un item pero el ADMIN ve el anterior

**Soluciones:**

| Paso | Acción |
|------|--------|
| 1 | **Primero,** verifica que **hiciste clic en "Guardar cambios"** y viste notificación verde |
| 2 | Si otros usuarios ven versión antigua, espera **2-3 minutos** a que se sincronice |
| 3 | Pide al otro usuario que **recargue la página** (F5) |
| 4 | Si persiste después de 5 minutos, puede ser problema de sincronización. **Reporta a soporte.** |

---

## SECCIÓN COMÚN - Buenas Prácticas

### 6.1 | Checklist de Seguridad

- [ ] **No compartas tu contraseña** con nadie (ni admin)
- [ ] **Cierra sesión** al final del turno o si vas a alejarte de la computadora
- [ ] **No dejes sesión abierta en computadoras públicas**
- [ ] Si olvidas tu contraseña, **contacta admin** para reset
- [ ] **Usa HTTPS** (la URL debe empezar con "https://")

---

### 6.2 | Mejores Prácticas de Uso

#### Para ADMIN:

- Revisa Dashboard al inicio del día (5 min)
- Distribuye carga de tareas de forma equilibrada
- Revisa tareas bloqueadas diariamente
- Mantén usuarios y apartamentos actualizados
- Haz backups de datos si corresponde

#### Para SUPERVISOR:

- Coordina con trabajadores en tiempo real
- Actualiza checklist mientras se ejecutan tareas
- Detecta y resuelve bloqueos rápidamente
- Mantén registro de problemas recurrentes
- Reporta al ADMIN problemas de capacidad

#### Para TRABAJADOR:

- **Actualiza checklist EN VIVO**, no al final
- Marca bloqueos con notas claras
- Haz clic en "Guardar cambios" al terminar
- Informa al supervisor de cualquier problema
- No crees tareas (eso lo hace supervisor/admin)

---

### 6.3 | Horarios y Prioridades

**Prioridades automáticas por tipo de tarea:**

| Tipo | Prioridad | Hora Límite | Ejemplo de Urgencia |
|------|-----------|-------------|-------------------|
| MANTENCION | ALTA | 15:00 | Urgencia del día |
| ASEO | MEDIA | 18:00 | Importante |
| REPASO | BAJA | 16:00 | Mejora continua |

**Estrategia de ejecución sugerida:**

1. Completa MANTENCION primero (ALTA prioridad)
2. Luego ASEO (MEDIA)
3. Al final REPASO (BAJA)

---

## SECCIÓN COMÚN - Contacto y Escalación

### 7.1 | ¿Cuándo contactar a soporte?

**Contacta si:**
- No puedes iniciar sesión y ya verificaste usuario/contraseña
- Cambios no se guardan aunque presionaste "Guardar cambios"
- Ve tarea que no debería ver, o no ve tarea que debería ver
- El sistema está lento o no responde
- Ves mensaje de error técnico
- Desaparece información que antes estaba guardada

**NO contactes si:**
- Olvidaste presionar "Guardar cambios" (revisa primero)
- No ves un módulo (revisa tu rol)
- La tarea se ve diferente en otro dispositivo (recarga página)

### 7.2 | Información a incluir en reporte

```
Asunto: [INCIDENTE / PREGUNTA] - Breve descripción

Cuerpo:
- Tu nombre y rol: ___________
- Fecha y hora del problema: ___________
- Módulo afectado: ___________
- Pasos exactos que hiciste:
  1. ___________
  2. ___________
  3. ___________
- Resultado esperado: ___________
- Resultado real/error: ___________
- Captura de pantalla (si aplica): [adjuntar]
- Navegador usado: ___________
- ¿Problema persiste?: SÍ / NO
```

---

## Resumen Final y Mapeo Rápido

### Matriz de Acciones por Rol

```
┌─────────────────────┬──────────┬────────────┬──────────┐
│ Acción              │ ADMIN    │ SUPERVISOR │ TRABAJADOR│
├─────────────────────┼──────────┼────────────┼──────────┤
│ Ver Dashboard       │ ✓ global │ ✓ global   │ ✓ personal│
│ Crear usuario       │ ✓        │ ✗          │ ✗         │
│ Editar usuario      │ ✓        │ ✗          │ ✗         │
│ Ver usuarios        │ ✓        │ ✓ lectura  │ ✗         │
│ Crear tarea         │ ✓        │ ✓          │ ✗         │
│ Editar tarea        │ ✓ todas  │ ✓ todas    │ ✗         │
│ Ver tarea           │ ✓ todas  │ ✓ todas    │ ✓ suyas   │
│ Editar checklist    │ ✓        │ ✓          │ ✓ suyas   │
│ Cambiar estado tarea│ ✓        │ ✓          │ ✓ suyas   │
│ Ver Kanban          │ ✓ global │ ✓ global   │ ✓ personal│
│ Crear apartamento   │ ✓        │ ✗          │ ✗         │
│ Ver apartamentos    │ ✓        │ ✓          │ ✓ lectura │
└─────────────────────┴──────────┴────────────┴──────────┘
```

---

**Fin del Manual**

*Versión 2.0 - Manual granular por rol*  
*Última actualización: 2026-05-14*  
*Próxima revisión: 2026-06-14*

## 5) Navegacion general

El menu lateral muestra las secciones segun tu rol.

Secciones posibles:
- Inicio o Dashboard
- Tareas
- Kanban
- Usuarios
- Apartamentos

Nota:
- Si no ves un modulo, normalmente es porque tu rol no tiene permiso.

## 6) Modulos del sistema (uso general)

### 6.1 Inicio / Dashboard

Para que sirve:
- Ver resumen del trabajo actual.

Que puedes hacer:
- Revisar estado general o personal segun rol.
- Abrir tareas destacadas.

### 6.2 Tareas

Para que sirve:
- Ver y gestionar tareas.

Acciones comunes:
- Buscar tareas.
- Filtrar tareas.
- Abrir detalle de tarea.
- Editar checklist si tu rol lo permite.

### 6.3 Kanban

Para que sirve:
- Ver tareas por columnas de estado (Pendiente, En progreso, Hecho, Bloqueado).

Acciones comunes:
- Revisar carga de trabajo visual.
- Cambiar estado cuando el rol lo permita.

### 6.4 Usuarios

Para que sirve:
- Ver o administrar cuentas de usuarios (segun rol).

### 6.5 Apartamentos

Para que sirve:
- Ver o administrar apartamentos (segun rol).

## 7) Uso del detalle de tarea y checklist

1. Entrar a una tarea desde Home, Tareas o Kanban.
2. Revisar informacion: apartamento, asignado, fecha, hora limite.
3. En Checklist:
   - Cambiar estados de pendientes.
   - Agregar observacion cuando un item quede bloqueado.
4. Presionar Guardar cambios.

Resultado esperado:
- El sistema confirma guardado.
- Si vuelves a abrir la tarea, los cambios siguen guardados.

## 8) Reglas operativas basicas

- Mantencion: prioridad alta.
- Aseo: prioridad media.
- Repaso: prioridad baja.

Estas reglas ayudan a ordenar y priorizar tareas del dia.

## 9) Problemas comunes y solucion rapida

### Problema: No puedo entrar

Revisar:
1. Correo y contrasena.
2. Conexion a internet.
3. Si tu cuenta esta activa.

### Problema: No veo un modulo

Revisar:
1. Si corresponde a tu rol.
2. Si la sesion sigue activa.

### Problema: No me guarda checklist

Revisar:
1. Que hayas presionado Guardar cambios.
2. Mensajes de exito o error en pantalla.
3. Si persiste, reportar a soporte con hora y tarea afectada.

## 10) Buenas practicas de uso

1. Cerrar sesion al terminar turno.
2. Mantener checklist actualizado en el momento real de la tarea.
3. Registrar bloqueos con nota clara y breve.
4. No compartir credenciales.

## 11) Contacto de soporte

Al reportar un problema, incluir:
- Rol de usuario.
- Modulo donde ocurrio.
- Pasos realizados.
- Resultado esperado y resultado obtenido.
- Captura de pantalla (si aplica).

---

## Anexo A - Guia por rol ADMIN

### Que puede hacer ADMIN

- Ver dashboard general.
- Gestionar usuarios.
- Gestionar apartamentos.
- Gestionar tareas globales.
- Usar kanban completo.

### Flujo recomendado diario

1. Revisar Dashboard general.
2. Ver tareas bloqueadas y pendientes.
3. Asignar o reasignar tareas.
4. Validar capacidad de equipo.
5. Revisar usuarios y permisos si hay cambios de personal.

### Ejemplo rapido

Escenario:
- Hay muchas tareas pendientes y pocas en progreso.

Accion esperada:
- Revisar asignaciones y redistribuir carga.

---

## Anexo B - Guia por rol SUPERVISOR

### Que puede hacer SUPERVISOR

- Ver dashboard general.
- Ver usuarios en modo lectura.
- Operar tareas y checklist.
- Usar kanban operativo.

### Flujo recomendado diario

1. Revisar tareas pendientes del turno.
2. Priorizar urgentes por fecha y estado.
3. Dar seguimiento a bloqueadas.
4. Verificar avance por trabajador.

### Ejemplo rapido

Escenario:
- Una tarea queda BLOQUEADA por falta de insumo.

Accion esperada:
- Registrar observacion en checklist.
- Coordinar solucion.
- Dar seguimiento hasta liberar bloqueo.

---

## Anexo C - Guia por rol TRABAJADOR

### Que puede hacer TRABAJADOR

- Ver inicio personal.
- Ver solo tareas asignadas a su usuario.
- Actualizar checklist de sus tareas.
- Usar kanban personal.

### Flujo recomendado diario

1. Entrar a Inicio personal.
2. Revisar Proxima tarea urgente.
3. Ejecutar tarea y actualizar checklist en tiempo real.
4. Marcar avances (Pendiente, Completado o Bloqueado).
5. Pasar a la siguiente tarea.

### Ejemplo rapido

Escenario:
- Durante Aseo no hay toallas disponibles.

Accion esperada:
- Marcar item como BLOQUEADO.
- Escribir nota breve: "Sin stock de toallas".
- Guardar cambios.
- Continuar con otros pendientes posibles.

---

## 12) Resumen final

- Cada rol tiene una vista y acciones distintas.
- El sistema esta pensado para reducir errores y ordenar la operacion.
- El checklist actualizado es la base para una buena coordinacion.
