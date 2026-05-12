# Manual Completo del Tablero Kanban - RoomOps

**Versión:** 1.0  
**Fecha de creación:** Mayo 2026  
**Audiencia:** Desarrolladores junior, nuevos en el proyecto, y personas no técnicas  
**Propósito:** Documentación exhaustiva del sistema Kanban del proyecto RoomOps

---

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Arquitectura General](#2-arquitectura-general)
3. [Flujo Completo de Datos](#3-flujo-completo-de-datos)
4. [Componentes Principales](#4-componentes-principales)
5. [Explicación de dnd-kit](#5-explicación-de-dnd-kit)
6. [Explicación del CSS](#6-explicación-del-css)
7. [Sistema de Agrupación (groupedTasks)](#7-sistema-de-agrupación-groupedtasks)
8. [Drag & Drop en Detalle](#8-drag--drop-en-detalle)
9. [Estado Global (React State)](#9-estado-global-react-state)
10. [Problemas Comunes y Soluciones](#10-problemas-comunes-y-soluciones)
11. [Cómo Agregar Nuevas Columnas](#11-cómo-agregar-nuevas-columnas)
12. [Cómo Agregar Campos a las Tarjetas](#12-cómo-agregar-nuevos-campos-a-las-tarjetas)
13. [Persistencia de Datos](#13-persistencia-de-datos)
14. [Mejoras Futuras](#14-posibles-mejoras-futuras)
15. [Convenciones del Proyecto](#15-convenciones-del-proyecto)
16. [Resumen Ejecutivo](#16-resumen-ejecutivo)

---

## 1. Introducción

### ¿Qué es el Tablero Kanban?

Un **Kanban** es un método visual de gestión de tareas. Imagina un pizarrón donde colocas tarjetas (representando tareas) en diferentes columnas según su estado:

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  PENDIENTE  │ EN PROGRESO │    HECHO    │  BLOQUEADO  │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ Tarea 1     │ Tarea 2     │ Tarea 3     │ Tarea 4     │
│ Tarea 5     │             │ Tarea 6     │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

En RoomOps, cada tarjeta representa una **tarea de mantenimiento o limpieza** en un apartamento específico.

### Para Qué Sirve en RoomOps

El tablero Kanban en RoomOps permite:

- **Visualizar el estado** de todas las tareas de mantenimiento
- **Organizar por estado:** Desde tareas pendientes hasta completadas
- **Asignar responsables** y hacer seguimiento
- **Actualizar estados** arrastrando tarjetas de columna en columna
- **Filtrar rápidamente** por nombre de tarea, apartamento o tipo
- **Ver detalles** de cada tarea (fecha, checklist, apartamento, tipo)

### Problema que Resuelve

**Sin Kanban:**
- Los supervisores tenían que revisar una lista larga de tareas
- No era claro qué tareas estaban pendientes, en progreso o completadas
- Actualizar estados requería navegar a otra pantalla
- Difícil ver el progreso general de las tareas

**Con Kanban:**
- Vista clara y visual del estado de todo
- Actualización rápida: solo arrastra y suelta
- Organización intuitiva: columnas = estados
- Mejor comunicación entre equipos

### Cómo Ayuda a la Gestión Operativa

1. **Transparencia:** Todos ven el estado actual en tiempo real
2. **Eficiencia:** Actualizar estados es rápido y visual
3. **Priorización:** Fácil ver dónde se concentran las tareas
4. **Responsabilidad:** Cada tarea tiene contexto completo (quién, cuándo, dónde)
5. **Trazabilidad:** Se guardan cambios en el backend automáticamente

---

## 2. Arquitectura General

### Estructura de Componentes

El Kanban está organizado en componentes React reutilizables:

```
RoomOps-Front/
├── src/
│   ├── components/
│   │   ├── kanban/
│   │   │   ├── Kanban.jsx          (componente principal)
│   │   │   └── kanban.css          (estilos)
│   │   └── task/
│   │       └── TaskFunctions.jsx   (funciones helper)
│   └── service/
│       ├── taskService.js          (API de tareas)
│       ├── statusService.js        (API de estados)
│       ├── api.js                  (cliente HTTP)
│       └── localStorage.js         (gestión local)
```

### Árbol de Componentes

La estructura jerárquica del Kanban es:

```
<Kanban> (componente raíz)
  ├── <DndContext> (contenedor para drag & drop)
  │   ├── <DroppableColumn> (columna: PENDIENTE)
  │   │   ├── <DraggableCard> (tarjeta 1)
  │   │   ├── <DraggableCard> (tarjeta 2)
  │   │   └── <DraggableCard> (tarjeta N)
  │   ├── <DroppableColumn> (columna: EN PROGRESO)
  │   │   ├── <DraggableCard> (tarjeta 1)
  │   │   └── <DraggableCard> (tarjeta N)
  │   ├── <DroppableColumn> (columna: HECHO)
  │   │   └── <DraggableCard> (tarjeta 1)
  │   └── <DroppableColumn> (columna: BLOQUEADO)
  │       └── (vacío)
  └── <header className="kanban-topbar">
      ├── <h1> Título "Kanban"
      └── <SearchInput> Buscador de tareas
```

### Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18+ | Framework UI |
| **Vite** | 8+ | Bundler y dev server |
| **@dnd-kit** | latest | Drag & drop |
| **Lucide React** | latest | Iconografía |
| **CSS Flexbox** | - | Layout responsive |
| **Axios** | latest | Peticiones HTTP |

### Flujo General del Tablero

```
┌──────────────┐
│  Página carga│
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ useEffect() se ejecuta   │
│ - Fetch tareas           │
│ - Fetch apartamentos     │
│ - Fetch usuarios         │
│ - Fetch estados          │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Datos en localStorage    │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ groupedTasks useMemo()   │
│ Agrupa tareas por estado │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Renderiza DroppableColumn│
│ para cada estado         │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Usuario interactúa:      │
│ - Busca                  │
│ - Arrastra tarjeta       │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ handleDragEnd()          │
│ - Valida movimiento      │
│ - Actualiza backend      │
│ - Actualiza local state  │
└──────────────────────────┘
```

---

## 3. Flujo Completo de Datos

### Paso 1: Carga Inicial de Datos

Cuando el Kanban monta por primera vez, `useEffect()` ejecuta:

```javascript
useEffect(() => {
  const refreshBoard = async () => {
    setLoading(true);

    // Cargar en paralelo (Promise.allSettled maneja errores)
    const [tasksResult, apartmentsResult, usersResult, statusesResult] = 
      await Promise.allSettled([
        getTasks(),           // Trae todas las tareas desde backend
        getApartments(),      // Trae apartamentos
        getUsers(),           // Trae usuarios
        getStatuses()         // Trae estados (Pendiente, En Progreso, etc)
      ]);

    // Si falla una petición, usa localStorage como fallback
    if (tasksResult.status === 'fulfilled') {
      setTasks(Array.isArray(tasksResult.value) ? tasksResult.value : []);
    } else {
      setTasks(getLocalTasks()); // Fallback a localStorage
    }

    // ... lo mismo para otros datos ...
    setLoading(false);
  };

  refreshBoard();
}, []); // [] = ejecutar una sola vez al montar
```

**¿Por qué `Promise.allSettled`?**
- Carga todos los datos EN PARALELO (más rápido)
- Si UNA petición falla, las otras siguen cargando
- Manejo elegante de errores con fallbacks

### Paso 2: Transformación de Datos en Mapas

Después de cargar, los datos se convierten en mapas (diccionarios) para búsquedas rápidas:

```javascript
// Crear un mapa: apartmentId -> nombre del apartamento
const apartmentNameById = useMemo(() => {
  const map = new Map();
  apartments.forEach((apt) => {
    map.set(Number(apt.id), apt.nombre || `Apto ${apt.id}`);
  });
  return map;
}, [apartments]);

// Uso: apartmentNameById.get(123) retorna "Apto 5B"

// Igual con usuarios
const userNameById = useMemo(() => {
  const map = new Map();
  users.forEach((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.trim();
    map.set(Number(user.id), fullName || user.email);
  });
  return map;
}, [users]);

// Y con estados
const statusLabelById = useMemo(() => {
  const map = new Map();
  statuses.forEach((status) => {
    map.set(Number(status.id), status.nombre);
  });
  return map;
}, [statuses]);
```

**¿Por qué mapas?**
- O(1) búsqueda: `map.get(123)` es instantáneo
- Sin loops innecesarios
- Mejor performance en listas grandes

### Paso 3: Filtrado de Tareas

El usuario escribe en el buscador:

```javascript
const filteredTasks = useMemo(() => {
  const term = normalizeText(searchTerm); // Convierte a minúsculas, quita acentos
  if (!term) return tasks; // Si está vacío, retorna todo

  return tasks.filter((task) => {
    // Extrae datos de la tarea
    const apartmentId = getTaskApartmentId(task);
    const apartmentName = apartmentNameById.get(Number(apartmentId)) || 'Sin apto';
    const title = task?.titulo || '';
    const description = task?.descripcion || '';
    
    // Crea un string con todos los datos para buscar
    const searchableText = normalizeText(
      `${title} ${description} ${task.tipo} ${apartmentName}`
    );
    
    // Si coincide con el término, incluye la tarea
    return searchableText.includes(term);
  });
}, [tasks, searchTerm, apartmentNameById]);
```

**Normalización de texto:**
```javascript
const normalizeText = (value = '') => {
  return String(value)
    .normalize('NFD')                    // Separa acentos
    .replace(/[\u0300-\u036f]/g, '')    // Elimina acentos
    .toLowerCase()                       // Minúsculas
    .trim()                              // Sin espacios
};

// Ejemplo:
normalizeText("Reparación de PUERTA") 
// Resultado: "reparacion de puerta"
// Búsqueda "puerta" ENCONTRARÁ la tarea ✓
```

### Paso 4: Agrupación por Estado

Las tareas filtradas se agrupan en columnas:

```javascript
const groupedTasks = useMemo(() => {
  const grouped = {
    pendiente: [],
    progreso: [],
    hecho: [],
    bloqueado: []
  };

  filteredTasks.forEach((task) => {
    // Obtén el ID del estado de la tarea
    const statusId = getTaskStatusId(task);
    
    // Obtén el nombre del estado desde el mapa
    const statusLabel = statusLabelById.get(Number(statusId)) || 'Pendiente';
    
    // Convierte nombre a clave de columna
    // "En Progreso" -> "progreso"
    const column = resolveBoardColumn(statusLabel);
    
    // Agrega la tarea a su columna
    grouped[column].push(task);
  });

  return grouped;
}, [filteredTasks, statusLabelById]);

// Resultado:
// {
//   pendiente: [tarea1, tarea2],
//   progreso: [tarea3],
//   hecho: [tarea4, tarea5],
//   bloqueado: []
// }
```

**Función `resolveBoardColumn`:**
```javascript
const resolveBoardColumn = (statusLabel = '') => {
  const normalized = normalizeText(statusLabel);

  if (normalized.includes('bloque')) return 'bloqueado';
  if (normalized.includes('progreso') || normalized.includes('curso')) 
    return 'progreso';
  if (normalized.includes('hecho') || normalized.includes('complet')) 
    return 'hecho';
  if (normalized.includes('pendiente') || normalized.includes('por hacer')) 
    return 'pendiente';

  return 'pendiente'; // Default
};

// Ejemplos:
resolveBoardColumn('Pendiente')      // ✓ 'pendiente'
resolveBoardColumn('En Progreso')    // ✓ 'progreso'
resolveBoardColumn('Hecho')          // ✓ 'hecho'
resolveBoardColumn('Bloqueado')      // ✓ 'bloqueado'
```

### Paso 5: Renderizado de Columnas

Para cada estado, renderiza un `DroppableColumn`:

```javascript
{BOARD_COLUMNS.map((column) => {
  const items = groupedTasks[column.key]; // Obtén tareas de esa columna
  
  return (
    <DroppableColumn
      key={column.key}
      column={column}
      items={items}
      apartmentNameById={apartmentNameById}
    />
  );
})}

// Constante BOARD_COLUMNS define las 4 columnas:
const BOARD_COLUMNS = [
  { key: 'pendiente', label: 'PENDIENTE', dotClass: 'dot-pending' },
  { key: 'progreso', label: 'EN PROGRESO', dotClass: 'dot-progress' },
  { key: 'hecho', label: 'HECHO', dotClass: 'dot-done' },
  { key: 'bloqueado', label: 'BLOQUEADO', dotClass: 'dot-blocked' }
];
```

### Paso 6: Renderizado de Tarjetas

Dentro de `DroppableColumn`, se renderizan `DraggableCard`:

```javascript
function DroppableColumn({ column, items, apartmentNameById }) {
  return (
    <article className="kanban-column">
      {/* Header de la columna */}
      <header className="kanban-column-header">
        <span className={`kanban-dot ${column.dotClass}`} />
        <h2>{column.label}</h2>
        <span className="count">{items.length}</span>
      </header>

      {/* Cuerpo: contiene las tarjetas */}
      <div className="kanban-column-body">
        {items.map((task) => (
          <DraggableCard
            key={task.id}
            task={task}
            apartmentNameById={apartmentNameById}
          />
        ))}
      </div>
    </article>
  );
}
```

### Paso 7: Actualización (Drag & Drop)

Cuando el usuario arrastra una tarjeta:

```javascript
const handleDragEnd = async (event) => {
  const { active, over } = event;

  // Extrae el ID de la tarjeta arrastra
  const draggedTaskId = Number(active?.data?.current?.taskId);
  const draggedTask = tasks.find((t) => Number(t.id) === draggedTaskId);

  // Extrae la columna destino
  const targetColumnKey = over?.data?.current?.columnKey;

  // Mapea "progreso" -> "En Progreso"
  const columnToStatusMap = {
    pendiente: 'Pendiente',
    progreso: 'En Progreso',
    hecho: 'Hecho',
    bloqueado: 'Bloqueado'
  };

  const newStatusName = columnToStatusMap[targetColumnKey];

  // Busca el estado correspondiente en el backend
  const newStatus = statuses.find((s) => 
    resolveBoardColumn(s.nombre) === targetColumnKey
  );

  // Prepara el payload para actualizar
  const updatedTask = {
    titulo: draggedTask.titulo,
    descripcion: draggedTask.descripcion,
    tipo: draggedTask.tipo,
    prioridad: draggedTask.prioridad,
    fecha: draggedTask.fecha,
    dueTime: draggedTask.dueTime,
    apartmentId: draggedTask.apartmentId,
    assignedUserId: draggedTask.assignedUserId,
    statusId: newStatus.id,      // CAMBIO PRINCIPAL
    estadoId: newStatus.id,      // Alias del backend
    checklist: draggedTask.checklist
  };

  // Envía al backend
  try {
    await updateTask(draggedTask.id, updatedTask);

    // Actualiza el estado local (optimista)
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        Number(t.id) === draggedTaskId
          ? { ...t, statusId: newStatus.id, estadoId: newStatus.id }
          : t
      )
    );
  } catch (error) {
    console.error('Error al actualizar:', error);
  }
};
```

### Resumen del Flujo Completo

```
USUARIO ABRE KANBAN
        ↓
   useEffect()
        ↓
   Carga datos (tareas, apartamentos, usuarios, estados)
        ↓
   Crea mapas de búsqueda rápida
        ↓
   Renderiza columnas y tarjetas
        ↓
   USUARIO BUSCA O ARRASTRA
        ↓
   Filtra tareas (searchTerm)
        ↓
   Agrupa por estado (groupedTasks)
        ↓
   Re-renderiza columnas
        ↓
   Si ARRASTRA:
        ├─ handleDragEnd() detecta movimiento
        ├─ updateTask() al backend
        ├─ setTasks() actualiza local
        └─ React re-renderiza
```

---

## 4. Componentes Principales

### Componente `Kanban` (Principal)

**Ubicación:** `src/components/kanban/Kanban.jsx`

**Propósito:** Contenedor principal que orquesta todo el tablero.

**Responsabilidades:**
- Carga datos iniciales
- Gestiona estado global
- Coordina drag & drop
- Filtra y agrupa tareas
- Maneja búsquedas

**Estructura resumida:**

```javascript
export default function Kanban() {
  // VERIFICAR PERMISOS
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (!isAdmin && !isSupervisor) return <Navigate to="/" />;

  // ESTADO
  const [tasks, setTasks] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // SENSORES PARA DRAG
  const sensors = useSensors(
    useSensor(PointerSensor, { distance: 8 }),  // Mouse/touch
    useSensor(KeyboardSensor)                    // Teclado
  );

  // CARGAR DATOS
  useEffect(() => { /* ... */ }, []);

  // MAPAS
  const apartmentNameById = useMemo(() => { /* ... */ }, [apartments]);
  const userNameById = useMemo(() => { /* ... */ }, [users]);
  const statusLabelById = useMemo(() => { /* ... */ }, [statuses]);

  // FILTRADO Y AGRUPACIÓN
  const filteredTasks = useMemo(() => { /* ... */ }, [tasks, searchTerm]);
  const groupedTasks = useMemo(() => { /* ... */ }, [filteredTasks]);

  // HANDLERS
  const handleDragEnd = async (event) => { /* ... */ };

  // RENDER
  return (
    <DndContext onDragEnd={handleDragEnd} {...}>
      <div className="kanban-view">
        {/* Topbar con título y búsqueda */}
        {/* Columnas draggable */}
      </div>
    </DndContext>
  );
}
```

### Componente `DroppableColumn` (Columnas)

**Ubicación:** Dentro de `Kanban.jsx`

**Propósito:** Representa una columna del tablero (estado).

**Responsabilidades:**
- Actúa como zona droppable
- Renderiza header de columna
- Renderiza tarjetas
- Muestra feedback visual cuando se arrastra encima

**Código:**

```javascript
function DroppableColumn({ column, items, apartmentNameById }) {
  // useDroppable hace que esta zona pueda recibir tarjetas arrastradas
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.key}`,
    data: {
      type: 'column',
      columnKey: column.key  // "pendiente", "progreso", etc
    }
  });

  return (
    <article className="kanban-column" ref={setNodeRef}>
      {/* Header con ícono de color, nombre, contador */}
      <header className="kanban-column-header">
        <div className="kanban-column-title-wrap">
          <span className={`kanban-dot ${column.dotClass}`} />
          <h2 className="kanban-column-title">{column.label}</h2>
          <span className="kanban-column-count">{items.length}</span>
        </div>
      </header>

      {/* Body: área donde se renderizan tarjetas */}
      <div className={`kanban-column-body ${isOver ? 'is-over' : ''}`}>
        {items.length === 0 ? (
          <p className="kanban-empty">Sin tareas</p>
        ) : (
          items.map((task) => (
            <DraggableCard
              key={task.id}
              task={task}
              apartmentNameById={apartmentNameById}
            />
          ))
        )}
      </div>
    </article>
  );
}
```

**Props:**
- `column`: Objeto con `{ key, label, dotClass }`
- `items`: Array de tareas a mostrar
- `apartmentNameById`: Map para obtener nombres

**Estilos clave:**
- `width: 320px` - Ancho fijo para columna
- `flex-shrink: 0` - No se comprime con flex
- `is-over` - Añade background cuando arrastra encima

### Componente `DraggableCard` (Tarjetas)

**Ubicación:** Dentro de `Kanban.jsx`

**Propósito:** Representa una tarjeta de tarea individual y es draggable.

**Responsabilidades:**
- Muestra información de la tarea
- Permite ser arrastrada
- Aplica efectos visuales
- Muestra progreso del checklist

**Código:**

```javascript
function DraggableCard({ task, apartmentNameById }) {
  // useDraggable hace que esta tarjeta pueda ser arrastrada
  const {
    attributes,      // Atributos HTML para drag (data-*)
    listeners,       // Event listeners (onPointerDown, etc)
    setNodeRef,      // Ref al elemento draggable
    transform,       // Transformación CSS durante drag
    transition,      // Transición CSS
    isDragging       // Boolean: ¿está siendo arrastrada?
  } = useDraggable({
    id: `task-${task.id}`,
    data: {
      type: 'task',
      taskId: Number(task.id)
    }
  });

  // Aplica transformación durante drag
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,  // 50% opacidad al arrastrar
    width: '100%'                    // Ancho estable
  };

  // Extrae datos para mostrar
  const apartmentId = getTaskApartmentId(task);
  const apartmentName = apartmentId != null 
    ? (apartmentNameById.get(Number(apartmentId)) || `Apto ${apartmentId}`)
    : 'Sin apto';
  const dateLabel = getTaskDate(task);
  const typeLabel = getTaskType(task);
  const checklistProgress = getChecklistProgress(task);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}  // Añade atributos HTML
      {...listeners}   // Añade event listeners
      className="kanban-card"
    >
      {/* Header: Chip de apartamento + Tipo */}
      <div className="kanban-card-header">
        <span className="kanban-chip">
          {apartmentName.toUpperCase()}
        </span>
        <span className="kanban-type">
          {typeLabel || 'Sin tipo'}
        </span>
      </div>

      {/* Título de la tarea */}
      <h3 className="kanban-card-title">
        {task.titulo || 'Tarea sin título'}
      </h3>

      {/* Footer: Fecha + Checklist */}
      <div className="kanban-card-footer">
        <span className="kanban-date">
          <CalendarDays size={13} />
          {dateLabel || 'Sin fecha'}
        </span>
        <span className="kanban-checklist">
          <ListChecks size={13} />
          {checklistProgress.completed}/{checklistProgress.total || 0}
        </span>
      </div>
    </div>
  );
}
```

**Props:**
- `task`: Objeto de tarea completo
- `apartmentNameById`: Map de IDs a nombres

**Estructura visual:**

```
┌─────────────────────────┐
│ APT 5B      │   ASEO    │  ← card-header (chip + type)
├─────────────────────────┤
│ Limpiar baño            │  ← card-title
├─────────────────────────┤
│ 📅 2026-05-11 │ ☑ 2/4   │  ← card-footer (date + checklist)
└─────────────────────────┘
```

**Clases CSS importantes:**
- `.kanban-card` - Contenedor principal
- `.kanban-card:hover` - Efecto al pasar mouse
- `.kanban-card[style*="opacity: 0.5"]` - Estado arrastrado

---

## 5. Explicación de dnd-kit

### ¿Qué es dnd-kit?

**dnd-kit** es una librería JavaScript moderna para implementar **drag & drop** (arrastrar y soltar).

**Propósito:** Permitir que el usuario arrastra elementos en la interfaz y ejecute acciones.

**Por qué dnd-kit y no jQuery drag o similares:**
- ✅ Construida para React moderno
- ✅ Performance optimizado
- ✅ Accesibilidad (soporte teclado)
- ✅ Flexible: funciona con cualquier tipo de layout
- ✅ Sin dependencias pesadas
- ✅ API clara y documentada

### Conceptos Clave

#### 1. **DndContext**

Es el contenedor que habilita drag & drop. TODO lo draggable debe estar dentro de un `DndContext`.

```javascript
<DndContext
  sensors={sensors}                    // Detectores de drag
  collisionDetection={closestCorners}  // Algoritmo de colisión
  onDragEnd={handleDragEnd}            // Callback cuando suelta
>
  {/* Aquí van componentes draggables y droppables */}
</DndContext>
```

**Propiedades:**
- `sensors`: Array de sensores (PointerSensor, KeyboardSensor, etc)
- `collisionDetection`: Cómo determina qué zona está "debajo" del cursor
- `onDragEnd`: Callback ejecutado cuando suelta el elemento
- `onDragStart`: Callback opcional cuando comienza el drag
- `onDragMove`: Callback opcional mientras se arrastra

#### 2. **useDraggable Hook**

Hace un elemento "draggable" (que puede ser arrastrado).

```javascript
const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
  isOver,
  node
} = useDraggable({
  id: 'task-123',              // ID único
  data: { type: 'task', ... }  // Data personalizado
  disabled: false              // Desactivar si es necesario
});
```

**Return values:**

| Propiedad | Tipo | Propósito |
|-----------|------|----------|
| `attributes` | Object | Atributos HTML (`role`, `data-*`, etc) |
| `listeners` | Object | Event listeners (`onPointerDown`, etc) |
| `setNodeRef` | Function | Ref que conecta con el DOM |
| `transform` | Object | Transformación durante drag |
| `transition` | String | CSS transition |
| `isDragging` | Boolean | ¿Se está arrastrando ahora? |
| `isOver` | Boolean | ¿Hay elemento siendo arrastrado encima? |
| `node` | HTMLElement | El elemento DOM |

**Cómo usarla:**

```javascript
function DraggableCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = 
    useDraggable({ id: `task-${task.id}` });

  return (
    <div
      ref={setNodeRef}            // Conecta el ref
      style={{
        transform: CSS.Transform.toString(transform),  // Aplica transformación
        opacity: isDragging ? 0.5 : 1                  // Visual feedback
      }}
      {...attributes}   // Añade role, data-*, etc
      {...listeners}    // Añade event listeners
    >
      {task.titulo}
    </div>
  );
}
```

#### 3. **useDroppable Hook**

Hace un elemento "droppable" (que puede recibir elementos arrastrados).

```javascript
const { setNodeRef, isOver, active } = useDroppable({
  id: 'column-pendiente',        // ID único
  data: { type: 'column', ... }  // Data personalizado
  disabled: false                // Desactivar si es necesario
});
```

**Return values:**

| Propiedad | Tipo | Propósito |
|-----------|------|----------|
| `setNodeRef` | Function | Ref que conecta con el DOM |
| `isOver` | Boolean | ¿Hay elemento siendo arrastrado ENCIMA? |
| `active` | Object | Elemento siendo arrastrado (o null) |
| `node` | HTMLElement | El elemento DOM |

**Cómo usarla:**

```javascript
function DroppableColumn({ column }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.key}`,
    data: { columnKey: column.key }
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? 'lightblue' : 'white'  // Visual feedback
      }}
    >
      {/* Tareas de esta columna */}
    </div>
  );
}
```

#### 4. **Sensores**

Un sensor detecta **cuándo el usuario intenta hacer drag**. dnd-kit incluye varios:

```javascript
const sensors = useSensors(
  useSensor(PointerSensor, { distance: 8 }),  // Mouse/touch con 8px threshold
  useSensor(KeyboardSensor)                    // Teclado (Enter, flechas)
);

<DndContext sensors={sensors} {...}>
  {/* ... */}
</DndContext>
```

**PointerSensor:**
- Detecta mouse y touch
- `distance: 8` - Debe mover 8px antes de considerar drag

**KeyboardSensor:**
- Permite drag con teclado
- Útil para accesibilidad

#### 5. **Collision Detection**

Determina **qué zona está "debajo" del cursor** mientras se arrastra.

```javascript
import { closestCorners, rectIntersection } from '@dnd-kit/core';

<DndContext collisionDetection={closestCorners} {...}>
```

**Algoritmos disponibles:**
- `closestCorners` - Usa esquinas del elemento (recomendado)
- `closestCenter` - Usa el centro
- `rectIntersection` - Cualquier intersección
- `pointerWithin` - Intersección simple

En RoomOps usamos `closestCorners` porque es intuitivo para columnas.

### Flujo Completo del Drag & Drop

```
1. USUARIO PRESIONA MOUSE EN TARJETA
   └─> PointerSensor detecta movimiento > 8px
   └─> useDraggable.isDragging = true

2. USUARIO ARRASTRA (move mouse)
   └─> DndContext actualiza transform
   └─> CSS aplica translate() (mueve visualmente)
   └─> closestCorners calcula qué zona está debajo
   └─> useDroppable.isOver actualiza en esa zona

3. USUARIO SUELTA (mouse up)
   └─> DndContext llama a onDragEnd(event)
   └─> handleDragEnd recibe active + over
   └─> Validamos y actualizamos backend
   └─> setTasks() actualiza estado local
   └─> React re-renderiza

4. ANIMACIÓN DE REGRESO (opcional)
   └─> Si usas transition, regresa suavemente
```

### Ventajas de dnd-kit vs Alternativas

| Feature | dnd-kit | jQuery UI | React Beautiful | React DnD |
|---------|---------|-----------|-----------------|-----------|
| React 18+ | ✅ | ❌ | ✅ | ⚠️ |
| Performance | ✅ | ❌ | ✅ | ⚠️ |
| Accesibilidad | ✅ | ❌ | ⚠️ | ✅ |
| Bundle size | ✅ | ❌ | ⚠️ | ⚠️ |
| API moderna | ✅ | ❌ | ✅ | ✅ |
| Soporte | ✅ | ❌ | ✅ | ✅ |

---

## 6. Explicación del CSS

### Layout: ¿Por Qué Flexbox en Lugar de Grid?

**Problema original (con Grid):**

```css
.kanban-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  // 4 columnas iguales
  gap: 1rem;
}
```

Cuando dnd-kit aplica `transform: translate(X, Y)`, **Grid proporciona espacio extra** a otras columnas. Esto causa:
- Columnas se expanden/contraen
- Tarjetas se deforman (stretch)
- Layout "rebota"

**Solución (con Flexbox):**

```css
.kanban-board {
  display: flex;         // Flex en lugar de grid
  gap: 1rem;
  overflow-x: auto;      // Scroll horizontal
  overflow-y: hidden;    // Sin scroll vertical
  align-items: flex-start;
}

.kanban-column {
  width: 320px;          // Ancho FIJO
  min-width: 320px;
  flex-shrink: 0;        // NO se comprime
}
```

**Por qué funciona:**
- `width: 320px` + `flex-shrink: 0` = columna nunca cambia tamaño
- dnd-kit aplica `transform` SIN afectar layout
- El scroll horizontal maneja overflow

### Estructura CSS del Kanban

#### 1. Container Principal (`.kanban-view`)

```css
.kanban-view {
  width: 100%;
  height: calc(100svh - 4.5rem);     /* Altura: viewport - topbar */
  display: flex;
  flex-direction: column;            /* Vertical: topbar + board */
  min-height: 0;                     /* Importante para flex overflow */
  overflow: hidden;                  /* Clip contenido */
  border-radius: 14px;
  border: 1px solid #d9e1ea;
  background: #f3f6fa;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}
```

#### 2. Topbar (`.kanban-topbar`)

```css
.kanban-topbar {
  flex: 0 0 auto;                    /* No se expande */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.1rem;
  background: #f8fbff;
  border-bottom: 1px solid #e0e7ef;
}
```

**Componentes:**
- Título "Kanban"
- Buscador de tareas

#### 3. Board (`.kanban-board`)

```css
.kanban-board {
  flex: 1;                           /* Expande para llenar espacio */
  min-height: 0;                     /* Permite scroll */
  display: flex;                     /* Horizontal */
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;                  /* Scroll horizontal si necesario */
  overflow-y: hidden;                /* Sin scroll vertical */
  align-items: flex-start;           /* Columnas alineadas al top */
}
```

**¿Por qué `min-height: 0`?**
```
Sin min-height: 0
- Flex no calcula height correctamente
- overflow no funciona

Con min-height: 0
- Flex respeta altura computada
- overflow-x: auto funciona perfectamente
```

#### 4. Columna (`.kanban-column`)

```css
.kanban-column {
  width: 320px;
  min-width: 320px;                  /* FIJO: 320px siempre */
  flex-shrink: 0;                    /* NO se comprime */
}
```

#### 5. Header de Columna (`.kanban-column-header`)

```css
.kanban-column-header {
  position: sticky;                  /* Se queda en top al scroll */
  top: 0;
  z-index: 2;                        /* Encima del contenido */
  margin-bottom: 0.75rem;
  padding: 0.8rem 0.55rem;
  border-radius: 0.8rem;
  background: #e8edf3;
  border: 1px solid #dde4ec;
}
```

**Componentes:**
- Punto de color (`.kanban-dot`)
- Nombre de estado (`.kanban-column-title`)
- Contador de tareas (`.kanban-column-count`)

#### 6. Body de Columna (`.kanban-column-body`)

```css
.kanban-column-body {
  display: flex;
  flex-direction: column;            /* Vertical: tarjetas en columna */
  gap: 0.75rem;                      /* Espacio entre tarjetas */
  min-height: 60px;                  /* Zona droppable mínima */
}

.kanban-column-body.is-over {
  background: rgba(79, 131, 219, 0.08);  /* Highlight al dragging */
  border-radius: 0.7rem;
}
```

#### 7. Tarjeta (`.kanban-card`)

```css
.kanban-card {
  width: 100%;                       /* Llena columna */
  box-sizing: border-box;            /* Width = padding incluido */
  flex-shrink: 0;                    /* NO se comprime */
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #ffffff;
  padding: 0.9rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  
  /* Drag & Drop */
  cursor: grab;
  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease;
}

.kanban-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.kanban-card:active {
  cursor: grabbing;
}
```

**Por qué `width: 100%` + `box-sizing: border-box`?**
```
Sin estas propiedades:
- Padding → tarjeta se expande
- Diferentes tamaños visualmente
- Inconsistente

Con estas:
- Padding incluido en 100%
- Todas las tarjetas: 100% - padding
- Consistente y predecible
```

#### 8. Estructura Interna de Tarjeta

```css
.kanban-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.kanban-chip {
  display: inline-block;
  max-width: 68%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.25rem 0.55rem;
  border-radius: 0.3rem;
  background: #def5f3;
  color: #22a7a0;
  font-size: 0.7rem;
  font-weight: 700;
}

.kanban-card-title {
  margin: 0;
  font-size: 0.95rem;
  color: #1f2937;
  font-weight: 700;
  line-height: 1.3;
  word-break: break-word;           /* Rompe palabras largas */
}

.kanban-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  padding-top: 0.65rem;
  border-top: 1px solid #f0f4f8;
}

.kanban-date,
.kanban-checklist {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
}
```

### Scroll Horizontal

```css
.kanban-board {
  overflow-x: auto;   /* Aparece cuando necesario */
  overflow-y: hidden; /* Nunca aparece */
}
```

**Cómo funciona:**
1. Board tiene `display: flex` (horizontal)
2. Columnas tienen `flex-shrink: 0` (no se comprimen)
3. Si columnas > viewport, scroll aparece automáticamente

**Comportamiento responsivo:**

```css
@media (max-width: 1200px) {
  /* No aplica en Kanban (mantiene flexbox) */
}

@media (max-width: 800px) {
  .kanban-board {
    /* Sigue siendo flex, solo se reduce viewport */
  }
  .kanban-column {
    min-width: 0;  /* Permite encoger en móvil */
  }
}
```

---

## 7. Sistema de Agrupación (groupedTasks)

### ¿Qué es groupedTasks?

Es un objeto que agrupa tareas por su estado:

```javascript
{
  pendiente: [tarea1, tarea2, tarea5],
  progreso: [tarea3],
  hecho: [tarea4, tarea6],
  bloqueado: []
}
```

### Creación de groupedTasks

```javascript
const groupedTasks = useMemo(() => {
  // 1. Crear estructura vacía
  const grouped = {
    pendiente: [],
    progreso: [],
    hecho: [],
    bloqueado: []
  };

  // 2. Iterar tareas filtradas
  filteredTasks.forEach((task) => {
    // 3. Obtén status ID de la tarea
    const statusId = getTaskStatusId(task);
    
    // 4. Obtén nombre del estado desde el mapa
    const statusLabel = statusLabelById.get(Number(statusId)) || 'Pendiente';
    
    // 5. Convierte nombre a clave de columna
    // "En Progreso" -> "progreso"
    const column = resolveBoardColumn(statusLabel);
    
    // 6. Agrega tarea al array de su columna
    grouped[column].push(task);
  });

  return grouped;

  // Dependencias: re-calcula si estas cambian
}, [filteredTasks, statusLabelById]);
```

### ¿Por Qué useMemo?

**Sin useMemo:**
```javascript
// ❌ MALO: se ejecuta CADA render
const groupedTasks = {};
filteredTasks.forEach(task => {
  // ...
});
```

Problemas:
- Se recalcula en CADA render (sin razón)
- Si `filteredTasks` no cambió, mismo resultado
- Desperdicia CPU y memoria

**Con useMemo:**
```javascript
// ✅ BUENO: solo si dependencias cambian
const groupedTasks = useMemo(() => {
  // Solo se ejecuta si filteredTasks o statusLabelById cambian
}, [filteredTasks, statusLabelById]);
```

Ventajas:
- React memoriza el resultado
- Solo recalcula si dependencias cambian
- Mejor performance

### Mapeo de Estados

El sistema mapea estados backend → columnas visuales:

**En el backend:**
```json
{
  "id": 1,
  "nombre": "Pendiente"
}
```

**En el frontend:**
```javascript
// 1. Se busca por nombre (case-insensitive)
const statusLabel = statusLabelById.get(statusId);  // "Pendiente"

// 2. Se normaliza y se busca patrón
const column = resolveBoardColumn(statusLabel);     // "pendiente"

// 3. Se agrupa
grouped[column].push(task);  // grouped.pendiente = [...]
```

**Función resolveBoardColumn:**

```javascript
const resolveBoardColumn = (statusLabel = '') => {
  const normalized = normalizeText(statusLabel);
  
  // Busca palabras clave flexibles
  if (normalized.includes('bloque')) return 'bloqueado';
  if (normalized.includes('progreso') || normalized.includes('curso'))
    return 'progreso';
  if (normalized.includes('hecho') || normalized.includes('complet'))
    return 'hecho';
  if (normalized.includes('pendiente') || normalized.includes('por hacer'))
    return 'pendiente';
  
  return 'pendiente';  // Default
};
```

**¿Por qué búsqueda de palabras clave?**
- El backend puede tener nombres variados
- "En Progreso", "En curso", "Progreso" → todos válidos
- Más flexible y robusto

### Cómo Se Usa en Render

```javascript
{BOARD_COLUMNS.map((column) => {
  // Obtén tareas de esta columna
  const items = groupedTasks[column.key];  // [tarea1, tarea2, ...]
  
  return (
    <DroppableColumn
      key={column.key}
      column={column}
      items={items}  // Pasa tareas agrupadas
      apartmentNameById={apartmentNameById}
    />
  );
})}
```

### Flujo Completo

```
Usuario cambia searchTerm
        ↓
filteredTasks se actualiza (filtrar por término)
        ↓
useMemo detecta cambio en filteredTasks
        ↓
groupedTasks se recalcula (reagrupar)
        ↓
React re-renderiza solo las columnas necesarias
        ↓
Usuario ve cambios actualizados
```

---

## 8. Drag & Drop en Detalle

### Evento: Cuando Usuario Intenta Arrastrar

```javascript
// Sensores detectan intento de drag
const sensors = useSensors(
  useSensor(PointerSensor, { distance: 8 }),  // Mover 8px
  useSensor(KeyboardSensor)                    // O tecla Enter
);

// Cuando se detecta:
// 1. useDraggable.isDragging = true en tarjeta
// 2. DndContext.onDragStart() se ejecuta (opcional)
// 3. Comienza tracking de posición
```

### Evento: Mientras Arrastra

```javascript
// DndContext actualiza:
// - transform: posición del cursor relativa a inicio
// - collisionDetection: calcula qué zona está debajo
// - useDroppable.isOver: actualiza en esa zona

// CSS aplica automáticamente:
// <div style="transform: translate(150px, -30px)">

// React re-renderiza (optimizado):
// - No componentes completos
// - Solo transforms CSS (rápido)
```

### Evento: Suelta (onDragEnd)

Cuando usuario suelta, `onDragEnd(event)` se ejecuta con:

```javascript
const handleDragEnd = async (event) => {
  const { active, over } = event;
  
  // active:
  // {
  //   id: "task-123",
  //   data: { type: 'task', taskId: 123 }
  // }
  
  // over:
  // {
  //   id: "column-progreso",
  //   data: { type: 'column', columnKey: 'progreso' }
  // }
```

**Paso 1: Validación**

```javascript
// ¿Hay elemento siendo arrastrado?
if (!over) return;

// ¿Es válido el elemento?
const draggedTaskId = Number(active?.data?.current?.taskId);
if (!draggedTaskId) return;

// ¿Se encontró la tarea?
const draggedTask = tasks.find((t) => Number(t.id) === draggedTaskId);
if (!draggedTask) return;

// ¿Hay zona válida?
const targetColumnKey = over?.data?.current?.columnKey;
if (!targetColumnKey) return;

// ¿Se movió realmente?
const currentColumnKey = getTaskColumnKey(draggedTask);
if (currentColumnKey === targetColumnKey) return;  // Misma columna
```

**Paso 2: Mapeo de Estado**

```javascript
// Convierte "progreso" -> "En Progreso"
const columnToStatusMap = {
  pendiente: 'Pendiente',
  progreso: 'En Progreso',
  hecho: 'Hecho',
  bloqueado: 'Bloqueado'
};

const newStatusName = columnToStatusMap[targetColumnKey];
if (!newStatusName) return;

// Busca el estado en la lista del backend
const newStatus = statuses.find((s) =>
  resolveBoardColumn(s.nombre) === targetColumnKey ||
  normalizeText(s.nombre) === normalizeText(newStatusName)
);

if (!newStatus) return;  // No existe ese estado
```

**Paso 3: Preparar Payload**

```javascript
const updatedTask = {
  titulo: draggedTask?.titulo || '',
  descripcion: draggedTask?.descripcion || '',
  tipo: getTaskType(draggedTask) || '',
  prioridad: draggedTask?.prioridad ?? '',
  fecha: getTaskDate(draggedTask) || null,
  dueTime: getTaskDueTime(draggedTask) || null,
  apartmentId: getTaskApartmentId(draggedTask),
  assignedUserId: getTaskAssignedUserId(draggedTask),
  statusId: newStatus.id,        // CAMBIO: nuevo estado
  estadoId: newStatus.id,        // Alias del backend
  checklist: draggedTask?.checklist ?? []
};
```

**Paso 4: Actualizar Backend**

```javascript
try {
  // Envía PUT a /api/v1/tasks/{id}
  await updateTask(draggedTask.id, updatedTask);
  
  console.log('✓ Tarea actualizada en backend');
} catch (error) {
  console.error('✗ Error al actualizar:', error);
  return;  // No actualizar local si falló
}
```

**Paso 5: Actualizar Estado Local**

```javascript
// Actualización optimista: React re-renderiza al instante
setTasks((prevTasks) =>
  prevTasks.map((t) =>
    Number(t.id) === draggedTaskId
      ? { ...t, statusId: newStatus.id, estadoId: newStatus.id }  // Actualiza
      : t  // Sin cambios
  )
);

// React re-renderiza:
// - groupedTasks recalcula (memo detecta cambio en tasks)
// - Tarjeta se mueve a nueva columna
// - Visual feedback al instante
```

### Flujo Visual Completo

```
┌─────────────────────────────────────────────────┐
│ USUARIO PRESIONA SOBRE TARJETA                  │
│ └─ PointerSensor inicia (si move > 8px)         │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ useDraggable.isDragging = true                  │
│ └─ Tarjeta: opacity = 0.5                       │
│ └─ Cursor = grabbing                            │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ USUARIO ARRASTRA (move mouse)                   │
│ └─ DndContext actualiza transform               │
│ └─ CSS: translate(150px, 20px)                  │
│ └─ Tarjeta se mueve visualmente                 │
│ └─ closestCorners calcula zona debajo           │
│ └─ useDroppable.isOver = true en esa zona       │
│ └─ Columna: background highlight                │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ USUARIO SUELTA (mouse up)                       │
│ └─ onDragEnd(event) se ejecuta                  │
│ └─ active = tarjeta                             │
│ └─ over = columna destino                       │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ handleDragEnd() valida y actualiza              │
│ ├─ Verifica movimiento válido                   │
│ ├─ Mapea estado: "progreso" -> "En Progreso"    │
│ ├─ Busca Estado en statuses[]                   │
│ ├─ Prepara payload con cambio                   │
│ └─ updateTask() al backend                      │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ Backend responde ✓                              │
│ └─ HTTP 200 OK                                  │
│ └─ Base de datos actualizada                    │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ setTasks() actualiza estado local                │
│ └─ groupedTasks recalcula (useMemo)             │
│ └─ Tarjeta se re-agrupa                         │
│ └─ React re-renderiza columnas                  │
│ └─ Visual: tarjeta está en nueva columna        │
└─────────────────────────────────────────────────┘
```

### Casos de Error

**Caso 1: Estado destino no existe**
```javascript
// Si columna "bloqueado" no tiene estado en backend
const newStatus = statuses.find(...);
if (!newStatus) return;  // Cancela silenciosamente

// Usuario: "¿Por qué no se movió?"
// Solución: crear estado en backend
```

**Caso 2: Error de red**
```javascript
try {
  await updateTask(...);
} catch (error) {
  console.error('Error:', error);
  return;  // No actualiza local
}

// Tarjeta no se mueve
// Usuario debe reintentar o recargar
```

**Caso 3: Permisos insuficientes**
```javascript
// Backend responde 403 Forbidden
// handleDragEnd() cancela
// Tarjeta no se mueve
```

---

## 9. Estado Global (React State)

### Estados Usados

| Estado | Tipo | Propósito |
|--------|------|----------|
| `tasks` | Array | Todas las tareas cargadas |
| `apartments` | Array | Todos los apartamentos |
| `users` | Array | Todos los usuarios |
| `statuses` | Array | Todos los estados |
| `loading` | Boolean | Indicador de carga |
| `searchTerm` | String | Término de búsqueda actual |

### 1. useState: `tasks`

```javascript
const [tasks, setTasks] = useState([]);

// Uso:
// - Leer: tasks.map(...)
// - Actualizar: setTasks([...tasks, newTask])
// - Modificar: setTasks(tasks.map(t => t.id === id ? {...t, ...updates} : t))

// Cuando se actualiza:
// 1. groupedTasks se recalcula
// 2. Columnas se re-renderizan
// 3. Tarjetas se re-agrupan

// Ejemplo: cuando arrastra
setTasks((prevTasks) =>
  prevTasks.map((t) =>
    Number(t.id) === draggedTaskId
      ? { ...t, statusId: newStatus.id }  // Actualiza
      : t
  )
);
```

### 2. useState: `apartments`, `users`, `statuses`

```javascript
const [apartments, setApartments] = useState([]);
const [users, setUsers] = useState([]);
const [statuses, setStatuses] = useState([]);

// Se cargan UNA sola vez en useEffect
// No cambian durante la sesión (generalmente)

// Usados para:
// - Mapear IDs a nombres
// - Validar estados existentes
// - Mostrar información completa
```

### 3. useState: `loading`

```javascript
const [loading, setLoading] = useState(false);

// Uso:
setLoading(true);   // Comienza a cargar
// ... hacer petición ...
setLoading(false);  // Termina de cargar

// En el render:
{loading ? (
  <div className="kanban-loading">Cargando tablero...</div>
) : (
  <section className="kanban-board">{/* ... */}</section>
)}
```

### 4. useState: `searchTerm`

```javascript
const [searchTerm, setSearchTerm] = useState('');

// Actualiza cuando usuario escribe
<input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

// Usado en filteredTasks:
const filteredTasks = useMemo(() => {
  const term = normalizeText(searchTerm);
  if (!term) return tasks;  // Si vacío, todo
  
  return tasks.filter(task => {
    // ... verificar si coincide ...
  });
}, [tasks, searchTerm]);
```

### 5. useMemo: Cálculos Costosos

```javascript
// Mapas de búsqueda rápida
const apartmentNameById = useMemo(() => {
  const map = new Map();
  apartments.forEach((apt) => {
    map.set(Number(apt.id), apt.nombre);
  });
  return map;
}, [apartments]);  // Solo recalcula si apartments cambia

// Agrupación de tareas
const groupedTasks = useMemo(() => {
  const grouped = { pendiente: [], progreso: [], hecho: [], bloqueado: [] };
  
  filteredTasks.forEach((task) => {
    const statusId = getTaskStatusId(task);
    const statusLabel = statusLabelById.get(Number(statusId));
    const column = resolveBoardColumn(statusLabel);
    grouped[column].push(task);
  });
  
  return grouped;
}, [filteredTasks, statusLabelById]);  // Dependencias
```

**¿Cuándo usar useMemo?**
- Cálculos complejos (loops, transformaciones)
- Datos que se pasan a muchos componentes
- Para estabilidad de referencias en dependencias

**¿Cuándo NO usar?**
- Cálculos simples (sum, concat, etc)
- Valores primitivos
- Cuando costo > beneficio

### 6. useEffect: Cargar Datos

```javascript
useEffect(() => {
  const refreshBoard = async () => {
    setLoading(true);

    const [tasksResult, apartmentsResult, usersResult, statusesResult] = 
      await Promise.allSettled([
        getTasks(),
        getApartments(),
        getUsers(),
        getStatuses()
      ]);

    // Actualizar states con resultados
    if (tasksResult.status === 'fulfilled') {
      setTasks(Array.isArray(tasksResult.value) ? tasksResult.value : []);
    } else {
      setTasks(getLocalTasks());  // Fallback
    }

    // ... lo mismo para otros ...

    setLoading(false);
  };

  refreshBoard();
}, []);  // [] = ejecutar una sola vez al montar
```

### 7. useSensors: Configuración de Drag

```javascript
const sensors = useSensors(
  useSensor(PointerSensor, { distance: 8 }),
  useSensor(KeyboardSensor)
);

<DndContext sensors={sensors} {...}>
```

**PointerSensor:**
- Detecta mouse y touch
- `distance: 8` = debe mover 8px antes de iniciar drag
- Previene clics accidentales

**KeyboardSensor:**
- Permite mover con teclado
- Accesibilidad: Tab + Space/Enter

---

## 10. Problemas Comunes y Soluciones

### Problema 1: Tarjetas Se Deforman Durante Drag

**Síntoma:**
- Tarjeta se estira verticalmente
- Cambia de ancho
- Se ve deformada mientras se arrastra

**Causa:**
```css
/* ❌ MALO: Grid con dnd-kit transforms */
.kanban-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
```

Cuando dnd-kit aplica `transform: translate()`, Grid proporciona espacio extra.

**Solución:**
```css
/* ✅ BUENO: Flexbox con width fijo */
.kanban-board {
  display: flex;
  overflow-x: auto;
}

.kanban-column {
  width: 320px;
  min-width: 320px;
  flex-shrink: 0;
}

.kanban-card {
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}
```

**JavaScript:**
```javascript
const style = {
  transform: CSS.Transform.toString(transform),
  opacity: isDragging ? 0.5 : 1,
  width: '100%'  // IMPORTANTE
};
```

### Problema 2: Tarjeta No Se Mueve a Nueva Columna

**Síntoma:**
- Arrastra tarjeta a otra columna
- Suelta
- Tarjeta regresa a columna original

**Causa:**
```javascript
// ❌ MALO: Validación muy estricta
const newStatus = statuses.find(s => s.nombre === 'En Progreso');
if (!newStatus) return;  // No existe estado exacto
```

**Solución:**
```javascript
// ✅ BUENO: Búsqueda flexible
const newStatus = statuses.find(s =>
  resolveBoardColumn(s.nombre) === targetColumnKey
);

if (!newStatus) {
  console.warn(`Estado no existe para: ${targetColumnKey}`);
  return;
}
```

### Problema 3: Búsqueda No Encuentra Tareas

**Síntoma:**
- Busca "puerta" pero no encuentra "Reparación de PUERTA"
- Busca "Apto 5" pero no encuentra "APT 5B"

**Causa:**
```javascript
// ❌ MALO: Búsqueda sensible a mayúsculas y acentos
if (title.includes(searchTerm)) { }  // Falla
```

**Solución:**
```javascript
// ✅ BUENO: Normalizar texto
const normalizeText = (value = '') => {
  return String(value)
    .normalize('NFD')                    // Acentos
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()                       // Mayúsculas
    .trim();
};

const term = normalizeText(searchTerm);
const searchableText = normalizeText(`${title} ${description} ${apartmentName}`);

if (searchableText.includes(term)) { }  // Funciona ✓
```

### Problema 4: Performance Lenta (Muchas Tareas)

**Síntoma:**
- Arrastra tarjeta y se congela
- Búsqueda es lenta
- Scroll laggy

**Causa:**
```javascript
// ❌ MALO: Sin memoización
const groupedTasks = {};  // Se recalcula CADA render
filteredTasks.forEach(task => { /* ... */ });
```

**Solución:**
```javascript
// ✅ BUENO: Con useMemo
const groupedTasks = useMemo(() => {
  // Solo si filteredTasks o statusLabelById cambian
}, [filteredTasks, statusLabelById]);

// Si tienes >1000 tareas, considera:
// - Virtualización (windowing)
// - Paginación
// - Web Workers
```

### Problema 5: Estados No Cargados

**Síntoma:**
- Columna "Bloqueado" no acepta tareas
- Mensaje en consola: "Estado no encontrado"

**Causa:**
```javascript
// Backend no tiene estado "Bloqueado" creado
const statuses = [
  { id: 1, nombre: 'Pendiente' },
  { id: 2, nombre: 'En Progreso' },
  { id: 3, nombre: 'Hecho' }
  // FALTA: Bloqueado
];
```

**Solución:**
```sql
-- Agregar a base de datos:
INSERT INTO status (nombre) VALUES ('Bloqueado');
```

O desde API:
```javascript
// POST /api/v1/statuses
const response = await fetch('/api/v1/statuses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Bloqueado' })
});
```

### Problema 6: Re-renders Innecesarios

**Síntoma:**
- Cambias una tarjeta y toda la página parpadea
- Performance pobre

**Causa:**
```javascript
// ❌ MALO: Objeto nuevo cada render
const apartmentNameById = new Map();
apartments.forEach(apt => {
  apartmentNameById.set(apt.id, apt.nombre);
});
// Se pasa a DroppableColumn, que re-renderiza
```

**Solución:**
```javascript
// ✅ BUENO: Memoizar
const apartmentNameById = useMemo(() => {
  const map = new Map();
  apartments.forEach(apt => {
    map.set(apt.id, apt.nombre);
  });
  return map;
}, [apartments]);  // Misma instancia si apartments no cambia
```

---

## 11. Cómo Agregar Nuevas Columnas

### Paso 1: Crear Estado en Backend

Si no existe, crea en la base de datos:

```sql
INSERT INTO status (nombre) VALUES ('En Revisión');
```

O desde API REST:
```bash
curl -X POST http://localhost:8080/api/v1/statuses \
  -H "Content-Type: application/json" \
  -d '{"nombre": "En Revisión"}'
```

### Paso 2: Actualizar BOARD_COLUMNS

```javascript
// src/components/kanban/Kanban.jsx

const BOARD_COLUMNS = [
  { key: 'pendiente', label: 'PENDIENTE', dotClass: 'dot-pending' },
  { key: 'progreso', label: 'EN PROGRESO', dotClass: 'dot-progress' },
  { key: 'revision', label: 'EN REVISIÓN', dotClass: 'dot-revision' },  // NUEVA
  { key: 'hecho', label: 'HECHO', dotClass: 'dot-done' },
  { key: 'bloqueado', label: 'BLOQUEADO', dotClass: 'dot-blocked' }
];
```

### Paso 3: Agregar Color al CSS

```css
/* src/components/kanban/kanban.css */

.dot-revision {
  background: #8b5cf6;  /* Púrpura */
}
```

### Paso 4: Actualizar Función de Mapeo

```javascript
const resolveBoardColumn = (statusLabel = '') => {
  const normalized = normalizeText(statusLabel);

  if (normalized.includes('bloque')) return 'bloqueado';
  if (normalized.includes('revision')) return 'revision';  // NUEVA
  if (normalized.includes('progreso') || normalized.includes('curso')) return 'progreso';
  if (normalized.includes('hecho') || normalized.includes('complet')) return 'hecho';
  if (normalized.includes('pendiente') || normalized.includes('por hacer')) return 'pendiente';

  return 'pendiente';
};
```

### Paso 5: Actualizar Agrupación

```javascript
const groupedTasks = useMemo(() => {
  const grouped = {
    pendiente: [],
    progreso: [],
    revision: [],      // NUEVA
    hecho: [],
    bloqueado: []
  };
  // ... resto del código ...
}, [filteredTasks, statusLabelById]);
```

### Paso 6: Actualizar Mapeo en Drag

```javascript
const columnToStatusMap = {
  pendiente: 'Pendiente',
  progreso: 'En Progreso',
  revision: 'En Revisión',    // NUEVA
  hecho: 'Hecho',
  bloqueado: 'Bloqueado'
};
```

### Paso 7: Compilar y Probar

```bash
# Compilar
npm run build

# Probar en desarrollo
npm run dev

# En el navegador:
# 1. Recarga la página
# 2. Nueva columna debe aparecer
# 3. Intenta arrastrar tarjeta a nueva columna
# 4. Debe actualizar en backend
```

---

## 12. Cómo Agregar Nuevos Campos a las Tarjetas

### Ejemplo: Agregar Campo "Prioridad" Visual

**Paso 1: Extraer Campo en TaskFunctions**

```javascript
// src/components/task/TaskFunctions.jsx

export const getTaskPriority = (task) => {
  return task?.prioridad || task?.priority || 'NORMAL';
};
```

**Paso 2: Renderizar en DraggableCard**

```javascript
function DraggableCard({ task, apartmentNameById }) {
  // ... código existente ...
  
  const priority = getTaskPriority(task);
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="kanban-card">
      {/* Header existente */}
      <div className="kanban-card-header">
        <span className="kanban-chip">{apartmentName.toUpperCase()}</span>
        <span className={`kanban-priority priority-${priority.toLowerCase()}`}>
          {priority}
        </span>
      </div>
      
      {/* ... resto del código ... */}
    </div>
  );
}
```

**Paso 3: Estilizar en CSS**

```css
/* src/components/kanban/kanban.css */

.kanban-priority {
  display: inline-block;
  padding: 0.2rem 0.45rem;
  border-radius: 0.25rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.kanban-priority.priority-alta {
  background: #fee2e2;
  color: #b91c1c;
}

.kanban-priority.priority-media {
  background: #fef3c7;
  color: #92400e;
}

.kanban-priority.priority-baja {
  background: #dbeafe;
  color: #1e40af;
}

.kanban-priority.priority-normal {
  background: #f3f4f6;
  color: #6b7280;
}
```

### Ejemplo: Agregar "Usuario Asignado"

**Paso 1: En TaskFunctions (ya existe)**

```javascript
export const getTaskAssignedUserId = (task) => {
  return task?.assignedUserId ?? task?.usuarioAsignadoId ?? null;
};
```

**Paso 2: En DraggableCard**

```javascript
function DraggableCard({ task, apartmentNameById }) {
  // ... código existente ...
  
  const assignedUserId = getTaskAssignedUserId(task);
  const userName = assignedUserId != null
    ? (userNameById.get(Number(assignedUserId)) || 'Sin asignar')
    : 'Sin asignar';
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="kanban-card">
      {/* ... header ... */}
      
      {/* NUEVA SECCIÓN */}
      <div className="kanban-card-assignee">
        <UserRound size={13} />
        <span>{userName}</span>
      </div>
      
      {/* ... resto ... */}
    </div>
  );
}

// NOTA: necesitas pasar userNameById a DraggableCard:
// En Kanban.jsx:
<DraggableCard
  key={task.id}
  task={task}
  apartmentNameById={apartmentNameById}
  userNameById={userNameById}  // AGREGA
/>
```

**Paso 3: CSS**

```css
.kanban-card-assignee {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  padding-top: 0.5rem;
}
```

### Ejemplo: Agregar Badge de SLA/Vencimiento

```javascript
// En TaskFunctions
export const getTaskSLAStatus = (task) => {
  const date = getTaskDate(task);
  if (!date) return 'PENDING';
  
  const taskDate = new Date(date);
  const today = new Date();
  const daysLeft = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysLeft < 0) return 'OVERDUE';
  if (daysLeft === 0) return 'TODAY';
  if (daysLeft === 1) return 'TOMORROW';
  if (daysLeft <= 3) return 'SOON';
  return 'OK';
};

// En DraggableCard
const slaStatus = getTaskSLAStatus(task);

<div className={`kanban-sla sla-${slaStatus.toLowerCase()}`}>
  {slaStatus}
</div>
```

---

## 13. Persistencia de Datos

### Flujo de Persistencia

```
USUARIO ARRASTRA TARJETA
        ↓
handleDragEnd() se ejecuta
        ↓
updateTask() envía PUT /api/v1/tasks/{id}
        ↓
┌─────────────────────────────────────────┐
│ ¿Backend responde OK (200)?             │
├─────────────────────────────────────────┤
│ SÍ ✓                    NO ✗             │
│ ↓                       ↓                │
│ setTasks() actualiza   console.error()   │
│ React re-renderiza     Tarjeta no se     │
│ Cambio en pantalla     mueve (rollback) │
│ +                      Usuario puede     │
│ Base de datos          reintentar        │
│ actualizada            (sin automático)  │
└─────────────────────────────────────────┘
```

### updateTask() en taskService

```javascript
// src/service/taskService.js

export const updateTask = (id, payload) => 
  api.put(`/api/v1/tasks/${id}`, payload).then(r => r.data);

// Realiza:
// PUT /api/v1/tasks/123
// {
//   "titulo": "...",
//   "descripcion": "...",
//   "statusId": 2,   // ← CAMBIO PRINCIPAL
//   "estadoId": 2,
//   "checklist": [...]
// }
```

### Payload Completo

```javascript
{
  titulo: "Reparar puerta",
  descripcion: "Bisagra rota",
  tipo: "Mantenimiento",
  prioridad: "ALTA",
  fecha: "2026-05-15",
  dueTime: "14:30",
  apartmentId: 5,
  assignedUserId: 12,
  statusId: 2,              // ← Nuevo estado
  estadoId: 2,              // Alias (aceptado por backend)
  checklist: [
    { item: "Comprar bisagra", estado: "pendiente" },
    { item: "Instalar", estado: "completado" }
  ]
}
```

**¿Por qué incluir TODO?**
- Backend puede validar datos completos
- No enviar solo cambio parcial
- Evitar sobrescribir accidentalmente

### Actualización Optimista vs Real

**Actualización Optimista:**
```javascript
// 1. Actualiza React estado local ANTES de respuesta
setTasks(prevTasks =>
  prevTasks.map(t =>
    Number(t.id) === draggedTaskId
      ? { ...t, statusId: newStatus.id }  // Cambio inmediato
      : t
  )
);

// 2. Usuario ve cambio al instante
// 3. Luego backend confirma (esperamos)
// 4. Si falla... rollback manual

try {
  await updateTask(draggedTask.id, updatedTask);
  // ✓ Backend confirmó
} catch (error) {
  // ✗ Backend rechazó
  // Podrías: setTasks() a estado anterior
  // O: mostrar toast error
}
```

**Ventaja:** Interfaz rápida y responsive

**Riesgo:** Si falla, usuario vio cambio que no se guardó

### Manejo de Errores

```javascript
const handleDragEnd = async (event) => {
  // ... validaciones ...

  try {
    // Intenta actualizar backend
    await updateTask(draggedTask.id, updatedTask);
    
    // ✓ Éxito: actualiza local
    setTasks(prevTasks =>
      prevTasks.map(t =>
        Number(t.id) === draggedTaskId
          ? { ...t, statusId: newStatus.id }
          : t
      )
    );
    
  } catch (error) {
    // ✗ Error
    console.error('Error actualizando tarea:', error);
    
    // Opciones:
    // 1. Mostrar toast/alert al usuario
    // 2. Automáticamente reintentar
    // 3. Rollback a estado anterior
    // 4. Dejar que usuario intente de nuevo
    
    // Actualmente: log + silencioso
    // TODO: mejorar UX aquí
  }
};
```

### Fallback a localStorage

```javascript
// src/service/localStorage.js

export const getLocalTasks = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem('tasks') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

// En Kanban.jsx:
const tasksResult = await getTasks();

if (tasksResult.status === 'fulfilled') {
  setTasks(tasksResult.value);
} else {
  // Si falla petición, usa localStorage
  setTasks(getLocalTasks());
}
```

**Casos de uso:**
- Red desconectada
- Backend caído
- Usuario sin permisos

---

## 14. Posibles Mejoras Futuras

### 1. Drag Overlay Mejorado

**Actual:**
- Sin overlay visual durante drag
- Solo tarjeta con opacity 50%

**Mejora:**
```javascript
import { DragOverlay } from '@dnd-kit/core';

<DndContext {...}>
  {/* Contenido normal */}
  
  {/* Overlay personalizado */}
  <DragOverlay>
    {activeId ? (
      <div style={{ /* estilo personalizado */ }}>
        {/* Tarjeta mejorada */}
      </div>
    ) : null}
  </DragOverlay>
</DndContext>
```

**Ventajas:**
- Imagen clara de qué se arrastra
- Efectos visuales avanzados
- Mejor UX

### 2. SortableContext + Sortable

**Actual:**
- useDraggable + useDroppable manualmente

**Mejora:**
```javascript
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';

// Permite: reordenar items dentro de una columna
// Usa: algorithms complejos para sort
```

**Ventajas:**
- Soporte automático para reordenar
- Animaciones suaves
- Menos código manual

### 3. Tiempo Real (WebSockets)

**Actual:**
- Peticiones HTTP (solo lectura en carga)
- User A actualiza, User B no ve cambio

**Mejora:**
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('task-updated', (task) => {
  // Otro usuario movió una tarjeta
  // Actualizar en tiempo real
  setTasks(prevTasks =>
    prevTasks.map(t =>
      t.id === task.id ? task : t
    )
  );
});
```

**Casos de uso:**
- Múltiples supervisores viendo board
- Actualización colaborativa
- Notificaciones en tiempo real

### 4. State Management: Zustand/Redux

**Actual:**
- useState diseminado en componentes
- Props drilling

**Mejora con Zustand:**
```javascript
import { create } from 'zustand';

const useKanbanStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  
  apartments: [],
  setApartments: (apartments) => set({ apartments }),
  
  // ... más estado ...
}));

// En componentes:
const tasks = useKanbanStore(state => state.tasks);
const setTasks = useKanbanStore(state => state.setTasks);
```

**Ventajas:**
- Estado centralizado
- Sin prop drilling
- Más testeable

### 5. Virtualización (para muchas tareas)

**Problema:** >1000 tareas = performance pobre

**Solución:**
```javascript
import { FixedSizeList as List } from 'react-window';

<List
  height={600}
  itemCount={items.length}
  itemSize={100}
>
  {({ index, style }) => (
    <div style={style}>
      <DraggableCard task={items[index]} />
    </div>
  )}
</List>
```

**Ventaja:**
- Solo renderiza items visibles
- 1000 tareas = 5 items DOM

### 6. Filtros Avanzados

**Actual:**
- Solo búsqueda por texto

**Mejora:**
```javascript
// Filtrar por:
// - Estado (checkbox)
// - Prioridad (dropdown)
// - Usuario asignado
// - Fecha rango
// - Apartamento específico
// - Combinaciones (AND/OR)

const filters = {
  statuses: ['pendiente', 'progreso'],
  priorities: ['ALTA'],
  assignedUserId: 12,
  dateRange: ['2026-05-01', '2026-05-31']
};

const filtered = tasks.filter(task => {
  // Aplicar múltiples filtros
});
```

### 7. Swimlanes (Agregar Subcapas)

**Actual:**
- Columnas por estado

**Mejora: Submarinas por usuario**
```
┌────────────────────────────┐
│ USUARIO: Juan             │
├────────────────────────────┤
│ PENDIENTE │ PROGRESO │ ... │
├────────────────────────────┤
│ USUARIO: María            │
├────────────────────────────┤
│ PENDIENTE │ PROGRESO │ ... │
└────────────────────────────┘
```

**Ventaja:**
- Ver carga de trabajo por persona
- Mejor distribución

### 8. Undo/Redo

**Actual:**
- Sin historial de cambios

**Mejora:**
```javascript
const [history, setHistory] = useState([initialState]);
const [historyIndex, setHistoryIndex] = useState(0);

const handleUndo = () => {
  if (historyIndex > 0) {
    setHistoryIndex(prev => prev - 1);
    setTasks(history[historyIndex - 1]);
  }
};

const handleRedo = () => {
  if (historyIndex < history.length - 1) {
    setHistoryIndex(prev => prev + 1);
    setTasks(history[historyIndex + 1]);
  }
};
```

### 9. Exportar/Importar

```javascript
// Exportar a CSV
const exportToCSV = () => {
  const csv = tasks.map(t =>
    `${t.id},${t.titulo},${t.statusId},...`
  ).join('\n');
  // Descargar archivo
};

// Exportar a JSON
const exportToJSON = () => {
  const json = JSON.stringify(tasks, null, 2);
  // Descargar archivo
};

// Importar
const importTasks = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const imported = JSON.parse(e.target.result);
    setTasks(imported);
  };
};
```

### 10. Analytics/Reporting

```javascript
// Gráficos:
// - Tareas por estado (pie chart)
// - Velocidad (burndown)
// - Promedio tiempo por estado
// - Tareas por usuario
// - Tareas vencidas

// Usar: Recharts, Chart.js, etc.
```

---

## 15. Convenciones del Proyecto

### Naming (Nombres de Variables/Componentes)

**Componentes React:** PascalCase
```javascript
function DraggableCard() { }      // ✓
function draggableCard() { }      // ✗
const MyComponent = () => { };    // ✓
```

**Variables/Funciones:** camelCase
```javascript
const apartmentNameById = new Map();  // ✓
const ApartmentNameById = {};         // ✗

const getTaskDate = () => { };        // ✓
const GetTaskDate = () => { };        // ✗
```

**Constantes:** UPPER_SNAKE_CASE
```javascript
const BOARD_COLUMNS = [ ];            // ✓
const LOCAL_TASKS_KEY = 'tasks';      // ✓

const boardColumns = [ ];              // ✗
```

**CSS Classes:** kebab-case
```css
.kanban-card { }           /* ✓ */
.kanbanCard { }            /* ✗ */
.kanban_card { }           /* ✗ */
```

### Estructura CSS

**Organización:**
```css
/* 1. Componente principal */
.kanban-board { }

/* 2. Subcomponentes */
.kanban-column { }
.kanban-card { }

/* 3. Estados */
.kanban-card:hover { }
.kanban-card.is-dragging { }

/* 4. Variantes */
.kanban-chip { }
.kanban-type { }

/* 5. Responsive */
@media (max-width: 1200px) { }
```

**Propiedades (orden lógico):**
```css
.kanban-card {
  /* Display & Layout */
  display: flex;
  flex-direction: column;
  
  /* Box Model */
  width: 100%;
  padding: 0.9rem;
  margin: 0;
  
  /* Borders & Radius */
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  
  /* Colors */
  background: #ffffff;
  color: #1f2937;
  
  /* Effects */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  
  /* Transitions */
  transition: box-shadow 0.15s ease, transform 0.15s ease;
  
  /* Interacción */
  cursor: grab;
}
```

### Organización de Componentes

```
src/
├── components/
│   ├── kanban/
│   │   ├── Kanban.jsx          (componente raíz)
│   │   ├── kanban.css          (estilos)
│   │   └── [subcomponents aquí si se crece]
│   ├── task/
│   │   ├── TaskFunctions.jsx   (helpers, no UI)
│   │   └── [otros componentes]
│   └── [otros módulos]
├── service/
│   ├── taskService.js
│   ├── api.js
│   └── [otros servicios]
└── [raíz]
```

### Buenas Prácticas

**1. Siempre validar datos**
```javascript
// ✓ BUENO
if (!task || typeof task !== 'object') return;
const id = Number(task?.id);
if (isNaN(id)) return;

// ✗ MALO
const id = task.id;  // Qué pasa si task es null?
```

**2. Usar optional chaining (?.**
```javascript
// ✓
const name = user?.firstName || 'Sin nombre';

// ✗
const name = user.firstName || 'Sin nombre';  // Error si user es null
```

**3. Normalizar datos**
```javascript
// ✓
const normalized = normalizeText(userInput);  // lowercase, sin acentos

// ✗
const search = userInput;  // sensible a mayúsculas
```

**4. Usar fallbacks**
```javascript
// ✓
const apartment = apartmentNameById.get(id) || `Apto ${id}`;

// ✗
const apartment = apartmentNameById.get(id);  // undefined si no existe
```

**5. Memoizar en React**
```javascript
// ✓ Para cálculos complejos
const grouped = useMemo(() => {
  return groupTasks(tasks);
}, [tasks]);

// ✗ No memoizar todo
const simple = sum(array);  // No necesita useMemo
```

**6. Comentarios útiles**
```javascript
// ✓ EXPLICA POR QUÉ
// Mapea cada apartamento a su ID para búsquedas O(1)
const apartmentNameById = useMemo(() => {
  const map = new Map();
  // ...
}, [apartments]);

// ✗ OBVIO
// Crear un mapa
const apartmentNameById = new Map();
```

---

## 16. Resumen Ejecutivo

### En Lenguaje Simple

El **tablero Kanban** en RoomOps es como un pizarrón visual donde:

1. **Cada tarjeta = una tarea** de mantenimiento o limpieza en un apartamento
2. **Cada columna = un estado:** Pendiente → En Progreso → Hecho → Bloqueado
3. **Arrastrar una tarjeta = cambiar su estado** (y se guarda automáticamente)

### Cómo Funciona de Punta a Punta

**Cuando abres el Kanban:**
1. Se cargan todas las tareas de la base de datos
2. Se agrupan por su estado actual
3. Se renderizan las 4 columnas con sus tarjetas

**Cuando buscas una tarea:**
1. Escribes en el buscador
2. Las tarjetas se filtran al instante
3. Se muestra solo lo que coincide

**Cuando arrastras una tarjeta:**
1. React detecta el movimiento
2. Valida si el estado destino existe
3. Envía un cambio al servidor
4. Actualiza visualmente en la pantalla
5. Si todo está bien, se guarda en la BD

**¿Por qué no se deforma al arrastrar?**
- Las columnas tienen ancho fijo (320px)
- No se comprimen ni expanden
- Solo se deslizan suavemente

### Stack Tecnológico Resumido

| Parte | Tecnología | Propósito |
|-------|-----------|-----------|
| **Frontend** | React 18 | Interfaz de usuario |
| **Bundler** | Vite | Construir y ejecutar |
| **Drag & Drop** | dnd-kit | Arrastrar tarjetas |
| **Llamadas API** | Axios | Comunicación con backend |
| **Estilos** | CSS Flexbox | Layout responsive |

### Flujo de Datos Simplificado

```
Backend (BD)
     ↑↓
    API
     ↑↓
Frontend (React)
  ├─ Cargar datos
  ├─ Mostrar en columnas
  ├─ Usuario arrastra
  ├─ Actualizar API
  └─ Actualizar pantalla
```

### Información Clave de una Tarjeta

Cada tarjeta muestra:
- **Apartamento:** Apto donde ocurre (ej: 5B)
- **Tipo:** Tipo de tarea (Aseo, Mantenimiento, etc)
- **Título:** Qué hay que hacer (ej: "Reparar puerta")
- **Fecha:** Cuándo (ej: 2026-05-11)
- **Checklist:** Progreso (ej: 2/4 items completados)

### Datos que Se Guardan

Cuando actualizas una tarea (arrastrando), se envía:
```json
{
  "titulo": "Reparar puerta",
  "descripcion": "Bisagra rota",
  "tipo": "Mantenimiento",
  "prioridad": "ALTA",
  "fecha": "2026-05-15",
  "apartmentId": 5,
  "assignedUserId": 12,
  "statusId": 2,
  "checklist": [...]
}
```

### Permisos

Solo pueden ver/usar el Kanban:
- ✅ Admin
- ✅ Supervisor
- ❌ Usuario normal

---

## Conclusión

Este manual cubre **100% del sistema Kanban** en RoomOps:

- ✅ Qué es y por qué existe
- ✅ Cómo está construido
- ✅ Cómo funciona cada componente
- ✅ Cómo agregar funcionalidades
- ✅ Soluciones a problemas comunes
- ✅ Mejoras futuras

**Para preguntas adicionales:**
1. Revisa este manual
2. Lee el código con los diagramas como guía
3. Consulta con el equipo senior
4. Experimenta en una rama separada

**Happy Kanban-ing! 🎉**

---

## Apéndice: Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollar
npm run dev

# Compilar para producción
npm run build

# Ver errores de linting
npm run lint

# Revisar formato
npm run format
```

## Apéndice: Links Útiles

- [dnd-kit Documentación](https://docs.dndkit.com/)
- [React Hooks](https://react.dev/reference/react)
- [CSS Flexbox Guide](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Axios](https://axios-http.com/)
