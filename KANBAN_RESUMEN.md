# Resumen de Implementación del Kanban - RoomOps

## 1. Qué se implementó

Se implementó un tablero Kanban funcional para gestionar tareas operativas con 4 columnas:

- Pendiente
- En Progreso
- Hecho
- Bloqueado

Cada tarjeta representa una tarea y puede moverse entre columnas mediante drag & drop. Al soltarla, se actualiza su estado en backend.

---

## 2. Stack técnico

- React (UI y estado)
- dnd-kit (drag & drop)
- CSS con Flexbox (layout estable)
- Servicios API (`taskService`, `statusService`, etc.)

Archivos principales:

- `src/components/kanban/Kanban.jsx`
- `src/components/kanban/kanban.css`
- `src/service/taskService.js`
- `src/components/task/TaskFunctions.jsx`

---

## 3. Estructura general

```txt
Kanban
 ├── DndContext
 ├── Topbar (titulo + buscador)
 └── Board
      ├── DroppableColumn (pendiente)
      │    └── DraggableCard...
      ├── DroppableColumn (progreso)
      ├── DroppableColumn (hecho)
      └── DroppableColumn (bloqueado)
```

---

## 4. Flujo de datos (resumido)

1. `useEffect` carga datos en paralelo:
   - tareas
   - apartamentos
   - usuarios
   - estados

2. Se construyen mapas con `useMemo`:
   - `apartmentNameById`
   - `userNameById`
   - `statusLabelById`

3. Se filtran tareas por texto (`searchTerm`).

4. Se agrupan en `groupedTasks` por columna visual.

5. Se renderizan columnas y tarjetas.

---

## 5. Lógica de drag & drop

`dnd-kit` usa:

- `DndContext`
- `useDraggable` (tarjetas)
- `useDroppable` (columnas)
- `PointerSensor` + `KeyboardSensor`

Flujo al mover una tarjeta:

```txt
Arrastrar card
↓
dnd-kit detecta destino
↓
handleDragEnd(event)
↓
map columna -> estado backend
↓
updateTask(id, payload)
↓
setTasks(...) local
↓
rerender
```

Si el estado destino no existe en backend, no se puede mover a esa columna.

---

## 6. Persistencia

Se actualiza con:

```js
updateTask(id, payload)
```

Endpoint:

```txt
PUT /api/v1/tasks/{id}
```

Payload incluye el objeto completo de la tarea y el nuevo `statusId` (y `estadoId` como alias).

---

## 7. Decisión clave de layout

Se cambió de Grid a Flexbox para eliminar deformación de tarjetas durante drag.

### Problema original

Con CSS Grid, al aplicar `transform` (drag), las tarjetas podían estirarse/cambiar tamaño.

### Solución aplicada

- board con `display: flex`
- columnas de ancho fijo (`320px`)
- `flex-shrink: 0` en columnas y cards
- card con `width: 100%` y `box-sizing: border-box`
- scroll horizontal con `overflow-x: auto`

Resultado: drag estable, sin estiramiento visual.

---

## 8. Estados React usados

- `tasks`
- `apartments`
- `users`
- `statuses`
- `loading`
- `searchTerm`

Optimización:

- `useMemo` para agrupaciones y mapas
- cálculo reactivo solo cuando cambian dependencias

---

## 9. Requisitos para que funcione completo

1. Deben existir en backend los estados que usa el tablero:
   - Pendiente
   - En Progreso
   - Hecho
   - Bloqueado

2. El usuario debe tener permisos de acceso (admin/supervisor).

3. El endpoint de actualización de tareas debe aceptar `statusId`.

---

## 10. Problemas comunes

- No se puede mover a Bloqueado: estado no creado en backend.
- Tarjetas deformadas: layout incorrecto (Grid o widths no fijos).
- Cambia visualmente pero no guarda: error en `updateTask`.
- Drag poco fluido: transiciones globales o re-renders excesivos.

---

## 11. Extensiones rápidas

Para agregar una nueva columna:

1. Crear estado en backend.
2. Agregar entrada en `BOARD_COLUMNS`.
3. Extender `resolveBoardColumn`.
4. Incluir nueva clave en `groupedTasks`.
5. Agregar mapeo en `columnToStatusMap`.
6. Estilo visual (dot/color) en CSS.

---

## 12. Resumen ejecutivo final

El Kanban actual de RoomOps:

- carga tareas y catálogos,
- agrupa por estado,
- renderiza en columnas,
- permite mover tareas por drag & drop,
- persiste cada cambio en backend,
- y mantiene layout estable en desktop/móvil gracias a Flexbox.

Es una implementación lista para operación diaria y fácil de extender con nuevas columnas, campos o reglas de negocio.
