# Guia rapida: Filtro por persona asignada

## Objetivo
Mostrar solo las tareas de una persona especifica (o todas).

## Implementacion en 7 pasos

1. Crear estado del filtro:

```jsx
const [selectedAssignee, setSelectedAssignee] = useState('Todos')
```

2. Helper para obtener usuario asignado por compatibilidad:

```jsx
const getTaskAssignedUserId = (task = {}) => task.assignedUserId ?? task.usuarioAsignadoId ?? null
```

3. Crear opciones del select desde users:

```jsx
const assigneeOptions = useMemo(() => {
  const sorted = [...users]
    .filter((user) => user?.id != null)
    .sort((a, b) => {
      const aName = `${a.firstName || a.nombre || ''} ${a.lastName || a.apellidos || ''}`.trim() || a.email || ''
      const bName = `${b.firstName || b.nombre || ''} ${b.lastName || b.apellidos || ''}`.trim() || b.email || ''
      return aName.localeCompare(bName, 'es')
    })

  const formatted = sorted.map((user) => ({
    id: String(user.id),
    nombre: `${user.firstName || user.nombre || ''} ${user.lastName || user.apellidos || ''}`.trim() || user.email || `Usuario ${user.id}`
  }))

  return [{ id: 'Todos', nombre: 'Todos' }, ...formatted]
}, [users])
```

4. Renderizar select de filtro:

```jsx
<label htmlFor='task-assignee-filter' className='form-label mb-1'>Asignado</label>
<select
  id='task-assignee-filter'
  className='form-select'
  style={{ maxWidth: '250px' }}
  value={selectedAssignee}
  onChange={(e) => setSelectedAssignee(e.target.value)}
  aria-label='Filtrar por persona asignada'
>
  {assigneeOptions.map((user) => (
    <option key={user.id} value={user.id}>{user.nombre}</option>
  ))}
</select>
```

5. Aplicar condicion en filteredTasks:

```jsx
const assignedUserId = getTaskAssignedUserId(task)
const matchesAssignee = selectedAssignee === 'Todos' || String(assignedUserId ?? '') === selectedAssignee
```

6. Incluir la condicion en el return final del filtro:

```jsx
return matchesSearch && matchesApartment && matchesStatus && matchesType && matchesAssignee
```

7. Limpiar tambien ese filtro:

```jsx
setSelectedAssignee('Todos')
```

## Checklist express

- Existe selectedAssignee en estado.
- El select tiene id unico: task-assignee-filter.
- assigneeOptions se construye desde users.
- Se usa matchesAssignee dentro del filtrado.
- clearFilters resetea selectedAssignee.
- users se carga correctamente en refreshAll.

## Problemas frecuentes

1. El select no muestra personas:
- users viene vacio o fallo getUsers.

2. Selecciono persona y no filtra:
- Falta matchesAssignee en el return final.

3. Filtra mal por tipo de dato:
- selectedAssignee es string y assignedUserId es number.
- Solucion: comparar como String(...).
