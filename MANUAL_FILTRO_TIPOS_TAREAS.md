# Manual: Filtro de Tipos en la Vista de Tareas

## 1. Objetivo del manual

Este documento explica como implementar un filtro por tipo de tarea (por ejemplo: Aseo y Mantencion) en una tabla de React.

Incluye:
- Explicacion no tecnica (para entender la idea general).
- Explicacion tecnica (para implementarlo en codigo).
- Paso a paso completo.
- Ejemplos reales.
- Errores comunes y como evitarlos.

---

## 2. Explicacion no tecnica

Imagina una lista de tareas en una empresa:
- Algunas tareas son de Aseo.
- Otras tareas son de Mantencion.

Cuando hay muchas tareas, se vuelve dificil revisar solo las que te interesan.

El filtro por tipo sirve para decir:
- Quiero ver solo las de Aseo.
- Quiero ver solo las de Mantencion.
- Quiero ver todas.

Es como un colador:
- Si eliges Aseo, pasan solo las tareas de Aseo.
- Si eliges Mantencion, pasan solo las de Mantencion.
- Si eliges Todos, no se filtra nada.

---

## 3. Explicacion tecnica

En React, un filtro de este tipo se logra con 4 piezas:

1. Estado del filtro seleccionado.
- Ejemplo: selectedType.

2. Opciones del filtro.
- Se generan con useMemo a partir de las tareas reales para no depender de otro endpoint.

3. Condicion dentro del filtrado.
- En filteredTasks, se compara el tipo de cada tarea con selectedType.

4. Select en la interfaz.
- El usuario cambia selectedType desde un combo (select).

---

## 4. Paso a paso completo

## Paso 1: crear el estado para el filtro de tipos

En el componente, agrega un estado para guardar la opcion elegida:

```jsx
const [selectedType, setSelectedType] = useState('Todos')
```

Que significa:
- selectedType: valor actual del filtro.
- setSelectedType: funcion para cambiarlo.
- 'Todos': valor inicial.

---

## Paso 2: definir como obtener el tipo de cada tarea

Usa una funcion que soporte diferentes nombres de campos (segun backend):

```jsx
const getTaskType = (task = {}) => task.tipo ?? task.type ?? ''
```

Esto evita romperse si una respuesta viene como tipo o como type.

---

## Paso 3: normalizar texto para comparaciones seguras

Si comparas texto sin normalizar, pueden fallar mayusculas, espacios o acentos.

```jsx
const normalizeSearchText = (value = '') => {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}
```

Con esto:
- Mantencion, mantencion y MANTENCION se consideran iguales.

---

## Paso 4: construir opciones de tipo desde las tareas

No dependas de un estado types si no tienes endpoint de tipos.
Construyelas directamente desde tasks:

```jsx
const typeOptions = useMemo(() => {
  const uniqueTypes = Array.from(
    new Set(
      tasks
        .map((task) => normalizeSearchText(getTaskType(task)))
        .filter(Boolean)
    )
  )

  const formatted = uniqueTypes.map((type) => ({
    id: type,
    nombre: type.charAt(0).toUpperCase() + type.slice(1)
  }))

  return [{ id: 'Todos', nombre: 'Todos' }, ...formatted]
}, [tasks])
```

Beneficios:
- Siempre muestra solo tipos realmente existentes.
- No requiere llamada extra al backend.

---

## Paso 5: agregar la condicion del filtro en filteredTasks

Dentro del filtro principal, compara el tipo de la tarea con el filtro seleccionado:

```jsx
const filteredTasks = useMemo(() => {
  const term = normalizeSearchText(searchTerm)

  return tasks.filter((task) => {
    const apartmentId = getTaskApartmentId(task)
    const statusId = getTaskStatusId(task)
    const typeId = normalizeSearchText(getTaskType(task))

    const matchesSearch = !term || getTaskSearchIndex(task).includes(term)
    const matchesApartment = selectedApartment === 'Todos' || String(apartmentId ?? '') === selectedApartment
    const matchesStatus = selectedStatus === 'Todos' || String(statusId ?? '') === selectedStatus
    const matchesType = selectedType === 'Todos' || typeId === selectedType

    return matchesSearch && matchesApartment && matchesStatus && matchesType
  })
}, [tasks, searchTerm, selectedApartment, selectedStatus, selectedType, apartmentNameById, userNameById, statusNameById])
```

Punto clave:
- Si olvidas matchesType en el return, el filtro de tipo nunca se aplicara.

---

## Paso 6: agregar el select en la interfaz

En la zona de filtros:

```jsx
<label htmlFor='task-type-filter' className='form-label mb-1'>Tipo</label>
<select
  id='task-type-filter'
  className='form-select'
  style={{ maxWidth: '250px' }}
  value={selectedType}
  onChange={(e) => setSelectedType(e.target.value)}
  aria-label='Filtrar por tipo'
>
  {typeOptions.map((type) => (
    <option key={type.id} value={String(type.id)}>{type.nombre}</option>
  ))}
</select>
```

Buenas practicas:
- id unico (no repetir el del filtro de apartamento).
- key estable.
- value sincronizado con selectedType.

---

## Paso 7: limpiar el filtro correctamente

Cuando el usuario pulse Limpiar filtros, tambien resetea el tipo:

```jsx
const clearFilters = () => {
  setSelectedApartment('Todos')
  setSelectedStatus('Todos')
  setSelectedType('Todos')
}
```

---

## Paso 8: evitar llamadas incorrectas en refreshAll

No debes llamar una funcion helper local como si fuera API.

Incorrecto:

```jsx
getTaskType()
```

getTaskType necesita una tarea para devolver string. No trae datos remotos.

Correcto:
- Deja refreshAll solo con las llamadas reales de backend:
  - getTasks()
  - getApartments()
  - getUsers()
  - getStatuses()

---

## 5. Ejemplo funcional resumido

Flujo esperado:
1. Carga la vista.
2. Se obtienen tareas.
3. typeOptions se construye en base a esas tareas.
4. El usuario elige Aseo.
5. filteredTasks solo devuelve tareas con tipo aseo.
6. La tabla muestra menos filas.

---

## 6. Errores comunes y soluciones

1. Error: el select de tipo aparece vacio.
- Causa: typeOptions depende de estado types vacio.
- Solucion: generar opciones desde tasks.

2. Error: selecciono tipo pero la tabla no cambia.
- Causa: matchesType no esta en el return final del filtro.
- Solucion: incluir matchesType en la expresion final.

3. Error: filtro no encuentra Mantencion aunque existe.
- Causa: comparacion sin normalizar.
- Solucion: usar normalizeSearchText en ambos lados.

4. Error: boton Limpiar no limpia tipo.
- Causa: falta setSelectedType('Todos').
- Solucion: agregarlo en clearFilters.

5. Error: runtime por getTaskType en Promise.all.
- Causa: se uso helper local como API.
- Solucion: eliminar esa llamada de refreshAll.

---

## 7. Checklist rapido de validacion

Antes de cerrar, confirma:
- Existe selectedType con valor inicial Todos.
- typeOptions se arma desde tasks.
- El select Tipo usa selectedType y setSelectedType.
- filteredTasks contiene matchesType.
- clearFilters resetea selectedType.
- refreshAll no llama getTaskType().

Si todo lo anterior esta correcto, el filtro por tipo deberia funcionar de forma estable.

---

## 8. Recomendacion de mantenimiento

Si en el futuro agregas nuevos tipos (ejemplo: Inspeccion), este enfoque seguira funcionando automaticamente porque toma los tipos desde los datos reales de tareas.

Solo debes asegurar que cada tarea tenga su campo tipo completo y consistente.
