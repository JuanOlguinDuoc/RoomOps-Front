import React, { useEffect, useMemo, useState } from 'react'
import {
 CCard,
 CCardHeader,
 CCardBody,
 CButton,
 CFormInput,
 CInputGroup,
 CInputGroupText,
 CTable,
 CTableHead,
 CTableRow,
 CTableHeaderCell,
 CTableBody,
 CTableDataCell,
 CBadge,
 CAvatar,
 CPagination,
 CPaginationItem,
 CFormCheck
} from '@coreui/react'
import { CircleCheckBig, CircleX, Building2, UserRound, BookmarkCheck, CalendarDays, ClipboardClock } from 'lucide-react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilFilter, cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import Swal from 'sweetalert2'
import './Task.css'
import '../users/users.css'
import { Navigate } from 'react-router-dom'
import { confirmAction } from '../../utils/alert'
import { showErrorToast, showSuccessToast } from '../../utils/toast'
import {
 isUserLoggedIn, isUserAdmin, isUserSupervisor,
 getAllApartments, getAllUsers
} from '../../service/localStorage'
import { getTasks, createTask, updateTask, deleteTask } from '../../service/taskService'
import { getApartments } from '../../service/apartmentService'
import { getUsers } from '../../service/userService'
import { getStatuses } from '../../service/statusService'

const LOCAL_TASKS_KEY = 'tasks'
const LOCAL_TASKS_NEXT_ID_KEY = 'nextTaskId'

const getLocalTasks = () => {
 try {
  const parsed = JSON.parse(localStorage.getItem(LOCAL_TASKS_KEY) || '[]')
  return Array.isArray(parsed) ? parsed : []
 } catch (e) {
  return []
 }
}

const saveLocalTasks = (tasks) => {
 localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(tasks))
}

const getNextLocalTaskId = () => {
 const current = Number(localStorage.getItem(LOCAL_TASKS_NEXT_ID_KEY) || '0')
 const next = current + 1
 localStorage.setItem(LOCAL_TASKS_NEXT_ID_KEY, String(next))
 return next
}

const getCurrentTaskTimestamps = () => {
 const now = new Date()
 const year = now.getFullYear()
 const month = String(now.getMonth() + 1).padStart(2, '0')
 const day = String(now.getDate()).padStart(2, '0')
 const hours = String(now.getHours()).padStart(2, '0')
 const minutes = String(now.getMinutes()).padStart(2, '0')
 return {
  fecha: `${year}-${month}-${day}`,
  dueTime: `${hours}:${minutes}`
 }
}

const normalizeTimeValue = (value = '') => {
 const raw = String(value || '').trim()
 if (!raw) return ''
 const timePart = raw.includes('T') ? raw.split('T')[1] : raw
 const parts = timePart.split(':')
 if (parts.length < 2) return ''
 const hh = String(parts[0]).padStart(2, '0')
 const mm = String(parts[1]).padStart(2, '0')
 return `${hh}:${mm}`
}

const getPriorityByType = (type = '') => {
 const normalized = String(type || '').trim().toLowerCase()
 if (normalized === 'mantencion') return 'ALTA'
 if (normalized === 'aseo') return 'MEDIA'
 return ''
}

const createTaskLocal = (payload) => {
 const tasks = getLocalTasks()
 if (!payload?.titulo?.trim()) {
  return { success: false, message: 'El titulo es obligatorio' }
 }


 const autoTimestamps = getCurrentTaskTimestamps()

 const newTask = {
  id: getNextLocalTaskId(),
  titulo: payload.titulo.trim(),
  descripcion: payload.descripcion?.trim() || '',
  tipo: payload.tipo?.trim() || '',
  prioridad: payload.prioridad?.trim() || '',
  fecha: payload.fecha || autoTimestamps.fecha,
  dueTime: payload.dueTime || autoTimestamps.dueTime,
  apartmentId: payload.apartmentId != null ? Number(payload.apartmentId) : null,
  assignedUserId: payload.assignedUserId != null ? Number(payload.assignedUserId) : null,
  statusId: payload.statusId != null ? Number(payload.statusId) : null,
  checklist: []
 }

 tasks.push(newTask)
 saveLocalTasks(tasks)
 return { success: true, task: newTask }
}

const updateTaskLocal = (id, payload) => {
 const taskId = Number(id)
 const tasks = getLocalTasks()
 const idx = tasks.findIndex((task) => Number(task.id) === taskId)

 if (idx === -1) {
  return { success: false, message: 'Tarea no encontrada' }
 }

 tasks[idx] = {
  ...tasks[idx],
  titulo: payload.titulo?.trim() || tasks[idx].titulo,
  descripcion: payload.descripcion?.trim() || '',
  tipo: payload.tipo?.trim() || '',
  prioridad: payload.prioridad?.trim() || '',
  fecha: payload.fecha || null,
  dueTime: payload.dueTime || null,
  apartmentId: payload.apartmentId != null ? Number(payload.apartmentId) : null,
  assignedUserId: payload.assignedUserId != null ? Number(payload.assignedUserId) : null,
  statusId: payload.statusId != null ? Number(payload.statusId) : null
 }

 saveLocalTasks(tasks)
 return { success: true, task: tasks[idx] }
}

const deleteTaskLocal = (id) => {
 const taskId = Number(id)
 const tasks = getLocalTasks()
 const updated = tasks.filter((task) => Number(task.id) !== taskId)

 if (updated.length === tasks.length) {
  return { success: false, message: 'Tarea no encontrada' }
 }

 saveLocalTasks(updated)
 return { success: true }
}

export default function Task() {
 // Control de acceso: solo usuarios autenticados con rol admin o supervisor.
 const isLoggedIn = isUserLoggedIn()
 const isAdmin = isUserAdmin()
 const canAccess = isAdmin || isUserSupervisor()

 if (!isLoggedIn) {
  return <Navigate to="/login?redirect=/tasks" replace />
 }

 if (!canAccess) {
  return <Navigate to="/" replace />
 }

 const [tasks, setTasks] = useState([])
 const [apartments, setApartments] = useState([])
 const [users, setUsers] = useState([])
 const [statuses, setStatuses] = useState([])
 const [loading, setLoading] = useState(false)
 const [searchTerm, setSearchTerm] = useState('')
 const [showFilters, setShowFilters] = useState(false)
 const [selectedApartment, setSelectedApartment] = useState('Todos')
 const [selectedStatus, setSelectedStatus] = useState('Todos')
 const [selectedType, setSelectedType] = useState('Todos')

 useEffect(() => {
  refreshAll()
 }, [])

 const normalizeSearchText = (value = '') => {
  return String(value)
   .normalize('NFD')
   .replace(/[\u0300-\u036f]/g, '')
   .toLowerCase()
   .trim()
 }

 const parseTaskFromResponse = (resp) => {
  if (!resp) return null
  return resp.tarea || resp.data?.tarea || resp.task || resp.data?.task || resp
 }

 const getTaskApartmentId = (task = {}) => task.apartmentId ?? task.apartamentoId ?? null
 const getTaskAssignedUserId = (task = {}) => task.assignedUserId ?? task.usuarioAsignadoId ?? null
 const getTaskStatusId = (task = {}) => task.statusId ?? task.estadoId ?? null
 const getTaskType = (task = {}) => task.tipo ?? task.type ?? ''
 const getTaskPriority = (task = {}) => task.prioridad ?? task.priority ?? ''
 const getTaskDate = (task = {}) => task.fecha ?? task.date ?? ''
 const getTaskDueTime = (task = {}) => {
  const raw = task.dueTime ?? task.due_time ?? task.dueDateTime ?? ''
  return normalizeTimeValue(raw)
 }

 const isTrabajadorUser = (user = {}) => {
  const roleValue = typeof user.role === 'object' ? (user.role?.name || user.role?.id || '') : (user.role || '')
  const normalized = String(roleValue).trim().toUpperCase()
  return normalized === 'TRABAJADOR' || normalized === 'WORKER'
 }

 const apartmentNameById = useMemo(() => {
  const map = new Map()
  apartments.forEach((apartment) => {
   if (apartment?.id != null) {
    map.set(Number(apartment.id), apartment.nombre || `Apartamento ${apartment.id}`)
   }
  })
  return map
 }, [apartments])

 const userNameById = useMemo(() => {
  const map = new Map()
  users.forEach((user) => {
   if (user?.id != null) {
    const fullName = `${user.firstName || user.nombre || ''} ${user.lastName || user.apellidos || ''}`.trim()
    map.set(Number(user.id), fullName || user.email || `Usuario ${user.id}`)
   }
  })
  return map
 }, [users])

 const statusNameById = useMemo(() => {
  const map = new Map()
  statuses.forEach((status) => {
   if (status?.id != null) {
    map.set(Number(status.id), status.nombre || `Estado ${status.id}`)
   }
  })
  return map
 }, [statuses])

 const getTaskStatusLabel = (task = {}) => {
  const id = getTaskStatusId(task)
  if (id == null) return 'Sin estado'
  return statusNameById.get(Number(id)) || `Estado #${id}`
 }

 const getStatusBadgeColor = (statusLabel = '') => {
  const normalized = normalizeSearchText(statusLabel)
  if (normalized.includes('complet') || normalized.includes('hecho')) return 'success'
  if (normalized.includes('progreso') || normalized.includes('curso')) return 'warning'
  if (normalized.includes('por hacer')) return 'info'
  if (normalized.includes('bloquead') || normalized.includes('cancel')) return 'danger'
  return 'info'
 }

 const getTypeColor = (typeLabel = '') => {
  const normalized = normalizeSearchText(typeLabel)
  if (normalized.includes('mantencion')) return '#dc3545'
  if (normalized.includes('aseo')) return '#00c4f5'
  return '#6c757d' // gris
 }

 const getDeadLine = (typeLabel = '') => {
  const normalized = normalizeSearchText(typeLabel)
  if (normalized.includes('mantencion')) return '15:00'
  if (normalized.includes('aseo')) return 'No aplica'
  return 'No Aplica' // gris
 }

 const getTaskSearchIndex = (task = {}) => {
  const apartmentId = getTaskApartmentId(task)
  const userId = getTaskAssignedUserId(task)
  const statusLabel = getTaskStatusLabel(task)
  const typeLabel = getTaskType(task)
  const dateLabel = getTaskDate(task)
  const priorityLabel = getTaskPriority(task)
  const apartmentName = apartmentId != null ? (apartmentNameById.get(Number(apartmentId)) || `Apartamento ${apartmentId}`) : 'Sin apartamento'
  const assigneeName = userId != null ? (userNameById.get(Number(userId)) || `Usuario ${userId}`) : 'Sin asignar'
  return normalizeSearchText(`${task.titulo || ''} ${task.descripcion || ''} ${typeLabel} ${priorityLabel} ${apartmentName} ${assigneeName} ${statusLabel}`)
 }

 const apartmentOptions = useMemo(() => {
  const sorted = [...apartments]
   .filter((apartment) => apartment?.id != null)
   .sort((a, b) => String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es'))
  return [{ id: 'Todos', nombre: 'Todos' }, ...sorted]
 }, [apartments])

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

 const statusOptions = useMemo(() => {
  const sorted = [...statuses]
   .filter((status) => status?.id != null)
   .sort((a, b) => String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es'))
  return [{ id: 'Todos', nombre: 'Todos' }, ...sorted]
 }, [statuses])

 const refreshAll = async () => {
  setLoading(true)

  // Cargamos datos en paralelo para que la tabla ya tenga mapeo de ids a etiquetas.
  const [tasksResult, apartmentsResult, usersResult, statusesResult] = await Promise.allSettled([
   getTasks(),
   getApartments(),
   getUsers(),
   getStatuses(),
   getTaskType()
  ])

  if (tasksResult.status === 'fulfilled') {
   setTasks(Array.isArray(tasksResult.value) ? tasksResult.value : [])
  } else {
   console.error('Error fetching tasks from API, using local fallback', tasksResult.reason)
   setTasks(getLocalTasks())
  }

  if (apartmentsResult.status === 'fulfilled') {
   setApartments(Array.isArray(apartmentsResult.value) ? apartmentsResult.value : [])
  } else {
   console.error('Error fetching apartments from API, using local fallback', apartmentsResult.reason)
   setApartments(getAllApartments())
  }

  if (usersResult.status === 'fulfilled') {
   setUsers(Array.isArray(usersResult.value) ? usersResult.value : [])
  } else {
   console.error('Error fetching users from API, using local fallback', usersResult.reason)
   setUsers(getAllUsers())
  }

  if (statusesResult.status === 'fulfilled') {
   setStatuses(Array.isArray(statusesResult.value) ? statusesResult.value : [])
  } else {
   console.error('Error fetching statuses from API', statusesResult.reason)
   setStatuses([])
  }

  setLoading(false)
 }

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

 const clearFilters = () => {
  setSelectedApartment('Todos')
  setSelectedStatus('Todos')
  setSelectedType('Todos')
 }

 const openCreateTaskModal = async () => {
  const apartmentSelectOptions = apartments
   .filter((apartment) => apartment?.id != null)
   .map((apartment) => `<option value="${apartment.id}">${apartment.nombre || `Apartamento ${apartment.id}`}</option>`)
   .join('')

  const userSelectOptions = users
   .filter((user) => user?.id != null && isTrabajadorUser(user))
   .map((user) => {
    const label = `${user.firstName || user.nombre || ''} ${user.lastName || user.apellidos || ''}`.trim() || user.email || `Usuario ${user.id}`
    return `<option value="${user.id}">${label}</option>`
   })
   .join('')

  const statusSelectOptions = statuses
   .filter((status) => status?.id != null)
   .map((status) => `<option value="${status.id}">${status.nombre || `Estado ${status.id}`}</option>`)
   .join('')

  const result = await Swal.fire({
   title: 'Crear tarea',
   html: `
                <div class="users-create-modal-form">
                    <input id="swal-titulo" class="users-create-input" placeholder="Titulo" maxlength="100" />
                    <textarea id="swal-descripcion" class="users-create-input users-create-textarea" placeholder="Descripcion" rows="3"></textarea>
                    <select id="swal-tipo" class="users-create-input users-create-select">
                        <option value="">Selecciona tipo</option>
                        <option value="Aseo">Aseo</option>
                        <option value="Mantencion">Mantencion</option>
                    </select>
                    <select id="swal-apartmentId" class="users-create-input users-create-select">
                        <option value="">Selecciona apartamento</option>
                        ${apartmentSelectOptions}
                    </select>
                    <select id="swal-assignedUserId" class="users-create-input users-create-select">
                        <option value="">Sin asignar</option>
                        ${userSelectOptions}
                    </select>
                    <select id="swal-statusId" class="users-create-input users-create-select">
                        <option value="">Selecciona estado</option>
                        ${statusSelectOptions}
                    </select>
                </div>
            `,
   width: 560,
   focusConfirm: false,
   showCancelButton: true,
   buttonsStyling: false,
   confirmButtonText: 'Crear tarea',
   cancelButtonText: 'Cancelar',
   customClass: {
    popup: 'users-create-modal-popup',
    title: 'users-create-modal-title',
    htmlContainer: 'users-create-modal-content',
    confirmButton: 'users-create-modal-confirm',
    cancelButton: 'users-create-modal-cancel'
   },
   preConfirm: () => {
    const autoTimestamps = getCurrentTaskTimestamps()
    const titulo = document.getElementById('swal-titulo')?.value?.trim() || ''
    const descripcion = document.getElementById('swal-descripcion')?.value?.trim() || ''
    const tipo = document.getElementById('swal-tipo')?.value?.trim() || ''
    const prioridad = getPriorityByType(tipo)
    const apartmentIdRaw = document.getElementById('swal-apartmentId')?.value || ''
    const assignedUserIdRaw = document.getElementById('swal-assignedUserId')?.value || ''
    const statusIdRaw = document.getElementById('swal-statusId')?.value || ''

    if (!titulo) {
     Swal.showValidationMessage('El titulo es obligatorio')
     return false
    }

    if (!apartmentIdRaw) {
     Swal.showValidationMessage('Debes seleccionar un apartamento')
     return false
    }

    if (!statusIdRaw) {
     Swal.showValidationMessage('Debes seleccionar un estado')
     return false
    }

    if (!tipo) {
     Swal.showValidationMessage('Debes seleccionar el tipo de tarea')
     return false
    }

    if (!prioridad) {
     Swal.showValidationMessage('No se pudo determinar la prioridad automaticamente')
     return false
    }

    return {
     titulo,
     descripcion,
     tipo,
     prioridad,
     fecha: autoTimestamps.fecha,
     dueTime: autoTimestamps.dueTime,
     apartmentId: Number(apartmentIdRaw),
     assignedUserId: assignedUserIdRaw ? Number(assignedUserIdRaw) : null,
     statusId: Number(statusIdRaw),
     checklist: []
    }
   }
  })

  if (!result.isConfirmed || !result.value) return

  try {
   try {
    const response = await createTask(result.value)
    const created = parseTaskFromResponse(response)
    if (!created) {
     throw new Error('Respuesta inesperada del backend')
    }
   } catch (err) {
    const localResult = createTaskLocal(result.value)
    if (!localResult?.success) {
     throw new Error(localResult?.message || 'No se pudo crear la tarea en localStorage')
    }
    showErrorToast('Se uso copia local por falla del servidor')
   }

   showSuccessToast('Tarea creada')
   await refreshAll()
  } catch (err) {
   console.error('Error creating task', err)
   const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Error creando tarea'
   showErrorToast(msg)
  }
 }

 const openEditTaskModal = async (task) => {
  const taskId = task.id
  const initialTitle = task.titulo || ''
  const initialDescription = task.descripcion || ''
  const initialType = getTaskType(task)
  const initialDate = getTaskDate(task)
  const initialDueTime = getTaskDueTime(task)
  const initialApartmentId = getTaskApartmentId(task)
  const initialAssignedUserId = getTaskAssignedUserId(task)
  const initialStatusId = getTaskStatusId(task)
  const initialDueTimeInputValue = normalizeTimeValue(initialDueTime)

  const apartmentSelectOptions = apartments
   .filter((apartment) => apartment?.id != null)
   .map((apartment) => `<option value="${apartment.id}" ${Number(apartment.id) === Number(initialApartmentId) ? 'selected' : ''}>${apartment.nombre || `Apartamento ${apartment.id}`}</option>`)
   .join('')

  const userSelectOptions = users
   .filter((user) => user?.id != null && isTrabajadorUser(user))
   .map((user) => {
    const label = `${user.firstName || user.nombre || ''} ${user.lastName || user.apellidos || ''}`.trim() || user.email || `Usuario ${user.id}`
    return `<option value="${user.id}" ${Number(user.id) === Number(initialAssignedUserId) ? 'selected' : ''}>${label}</option>`
   })
   .join('')

  const statusSelectOptions = statuses
   .filter((status) => status?.id != null)
   .map((status) => `<option value="${status.id}" ${Number(status.id) === Number(initialStatusId) ? 'selected' : ''}>${status.nombre || `Estado ${status.id}`}</option>`)
   .join('')

  const result = await Swal.fire({
   title: 'Editar tarea',
   html: `
                <div class="users-create-modal-form">
                    <input id="swal-titulo" class="users-create-input" placeholder="Titulo" maxlength="100" value="${initialTitle}" />
                    <textarea id="swal-descripcion" class="users-create-input users-create-textarea" placeholder="Descripcion" rows="3">${initialDescription}</textarea>
                    <select id="swal-tipo" class="users-create-input users-create-select">
                        <option value="" ${!initialType ? 'selected' : ''}>Selecciona tipo</option>
                        <option value="Aseo" ${initialType === 'Aseo' ? 'selected' : ''}>Aseo</option>
                        <option value="Mantencion" ${initialType === 'Mantencion' ? 'selected' : ''}>Mantencion</option>
                    </select>
                    <input id="swal-fecha" class="users-create-input" type="date" value="${initialDate || ''}" />
                    <input id="swal-dueTime" class="users-create-input" type="time" value="${initialDueTimeInputValue}" />
                    <select id="swal-apartmentId" class="users-create-input users-create-select">
                        <option value="">Selecciona apartamento</option>
                        ${apartmentSelectOptions}
                    </select>
                    <select id="swal-assignedUserId" class="users-create-input users-create-select">
                        <option value="">Sin asignar</option>
                        ${userSelectOptions}
                    </select>
                    <select id="swal-statusId" class="users-create-input users-create-select">
                        <option value="">Selecciona estado</option>
                        ${statusSelectOptions}
                    </select>
                </div>
            `,
   width: 560,
   focusConfirm: false,
   showCancelButton: true,
   buttonsStyling: false,
   confirmButtonText: 'Guardar cambios',
   cancelButtonText: 'Cancelar',
   customClass: {
    popup: 'users-create-modal-popup',
    title: 'users-create-modal-title',
    htmlContainer: 'users-create-modal-content',
    confirmButton: 'users-create-modal-confirm',
    cancelButton: 'users-create-modal-cancel'
   },
   preConfirm: () => {
    const titulo = document.getElementById('swal-titulo')?.value?.trim() || ''
    const descripcion = document.getElementById('swal-descripcion')?.value?.trim() || ''
    const tipo = document.getElementById('swal-tipo')?.value?.trim() || ''
    const prioridad = getPriorityByType(tipo)
    const fecha = document.getElementById('swal-fecha')?.value || ''
    const dueTimeRaw = normalizeTimeValue(document.getElementById('swal-dueTime')?.value || '')
    const apartmentIdRaw = document.getElementById('swal-apartmentId')?.value || ''
    const assignedUserIdRaw = document.getElementById('swal-assignedUserId')?.value || ''
    const statusIdRaw = document.getElementById('swal-statusId')?.value || ''

    if (!titulo) {
     Swal.showValidationMessage('El titulo es obligatorio')
     return false
    }

    if (!apartmentIdRaw) {
     Swal.showValidationMessage('Debes seleccionar un apartamento')
     return false
    }

    if (!statusIdRaw) {
     Swal.showValidationMessage('Debes seleccionar un estado')
     return false
    }

    if (!tipo) {
     Swal.showValidationMessage('Debes seleccionar el tipo de tarea')
     return false
    }

    if (!prioridad) {
     Swal.showValidationMessage('No se pudo determinar la prioridad automaticamente')
     return false
    }

    return {
     titulo,
     descripcion,
     tipo,
     prioridad,
     fecha: fecha || null,
     dueTime: dueTimeRaw || null,
     apartmentId: Number(apartmentIdRaw),
     assignedUserId: assignedUserIdRaw ? Number(assignedUserIdRaw) : null,
     statusId: Number(statusIdRaw),
     checklist: task.checklist || task.listaVerificacion || []
    }
   }
  })

  if (!result.isConfirmed || !result.value) return

  try {
   try {
    await updateTask(taskId, result.value)
   } catch (err) {
    const localResult = updateTaskLocal(taskId, result.value)
    if (!localResult?.success) {
     throw new Error(localResult?.message || 'No se pudo actualizar la tarea en localStorage')
    }
    showErrorToast('Se uso copia local por falla del servidor')
   }

   showSuccessToast('Tarea actualizada')
   await refreshAll()
  } catch (err) {
   console.error('Error updating task', err)
   const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Error actualizando tarea'
   showErrorToast(msg)
  }
 }

 const handleDeleteTask = (task) => {
  const taskId = task.id
  const title = task.titulo || 'esta tarea'

  confirmAction({
   title: 'Eliminar tarea',
   text: `¿Eliminar ${title}?`,
   confirmText: 'Eliminar'
  }).then(async (ok) => {
   if (!ok) return

   try {
    try {
     await deleteTask(taskId)
    } catch (err) {
     const localResult = deleteTaskLocal(taskId)
     if (!localResult?.success) {
      throw new Error(localResult?.message || 'No se pudo eliminar la tarea en localStorage')
     }
     showErrorToast('Se uso copia local por falla del servidor')
    }

    showSuccessToast('Tarea eliminada')
    await refreshAll()
   } catch (err) {
    console.error('Error deleting task', err)
    const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Error eliminando tarea'
    showErrorToast(msg)
   }
  })
 }

 const handleStartCreate = () => {
  void openCreateTaskModal()
 }

 return (
  <div className="users-view container-fluid px-0">
   <CCard className="users-card mb-4 shadow-sm border-0">
    <CCardHeader className="bg-white d-flex justify-content-between align-items-center py-3 border-bottom">
     <h4 className="mb-0 fw-bold">Gestion de Tareas</h4>
     {isAdmin && (
      <CButton color="dark" className="d-flex align-items-center gap-2" onClick={handleStartCreate}>
       <CIcon icon={cilPlus} /> Anadir Tarea
      </CButton>
     )}
    </CCardHeader>

    <CCardBody>
     <div className="users-toolbar d-flex justify-content-between mb-3">
      <CInputGroup className="users-search">
       <CInputGroupText className="bg-white">
        <CIcon icon={cilSearch} />
       </CInputGroupText>
       <CFormInput
        placeholder="Buscar por titulo, apartamento, usuario o estado..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
       />
      </CInputGroup>

      <div className="d-flex gap-2">
       <CButton
        color="light"
        variant="outline"
        className="users-filter-btn text-dark border d-flex align-items-center gap-2"
        onClick={() => setShowFilters((prev) => !prev)}
       >
        <CIcon icon={cilFilter} /> Filtrar
       </CButton>
      </div>
     </div>

     {showFilters && (
      <div className="d-flex flex-wrap gap-2 mb-3">
       <div>
        <label htmlFor="task-apartment-filter" className="form-label mb-1">Apartamento</label>
        <select
         id="task-apartment-filter"
         className="form-select"
         style={{ maxWidth: '250px' }}
         value={selectedApartment}
         onChange={(e) => setSelectedApartment(e.target.value)}
         aria-label="Filtrar por apartamento"
        >
         {apartmentOptions.map((apartment) => (
          <option key={apartment.id} value={String(apartment.id)}>{apartment.nombre}</option>
         ))}
        </select>
       </div>

       <div>
        <label htmlFor="task-type-filter" className="form-label mb-1">Tipo</label>
        <select
         id="task-type-filter"
         className="form-select"
         style={{ maxWidth: '250px' }}
         value={selectedType}
         onChange={(e) => setSelectedType(e.target.value)}
         aria-label="Filtrar por tipo"
        >
         {typeOptions.map((type) => (
          <option key={type.id} value={String(type.id)}>{type.nombre}</option>
         ))}
        </select>
       </div>

       <div>
        <label htmlFor="task-status-filter" className="form-label mb-1">Estado</label>
        <select
         id="task-status-filter"
         className="form-select"
         style={{ maxWidth: '250px' }}
         value={selectedStatus}
         onChange={(e) => setSelectedStatus(e.target.value)}
         aria-label="Filtrar por estado"
        >
         {statusOptions.map((status) => (
          <option key={status.id} value={String(status.id)}>{status.nombre}</option>
         ))}
        </select>
       </div>

       <div className="d-flex align-items-end">
        <CButton color="secondary" variant="outline" onClick={clearFilters}>
         Limpiar filtros
        </CButton>
       </div>
      </div>
     )}

     <div className="users-table-wrapper">
      <CTable align="middle" responsive hover className="users-table task-table border text-center mb-0">
       <CTableHead color="primary">
        <CTableRow>
         <CTableHeaderCell className="text-start d-none d-sm-table-cell" style={{ width: '40px' }}>
          <CFormCheck />
         </CTableHeaderCell>
         <CTableHeaderCell className="text-start">Tarea</CTableHeaderCell>
         <CTableHeaderCell className="d-none d-md-table-cell">Apartamento</CTableHeaderCell>
         <CTableHeaderCell className="d-none d-lg-table-cell">Asignado</CTableHeaderCell>
         <CTableHeaderCell className='d-none d-lg-table-cell'>Fecha</CTableHeaderCell>
         <CTableHeaderCell className='d-none d-lg-table-cell'>Hora Limite</CTableHeaderCell>
         <CTableHeaderCell className='d-none d-lg-table-cell'>Tipo</CTableHeaderCell>
         <CTableHeaderCell>Estado</CTableHeaderCell>
         {isAdmin && <CTableHeaderCell className="d-none d-sm-table-cell">Acciones</CTableHeaderCell>}
        </CTableRow>
       </CTableHead>

       <CTableBody>
        {filteredTasks.map((task) => {
         const apartmentId = getTaskApartmentId(task)
         const assignedUserId = getTaskAssignedUserId(task)
         const statusLabel = getTaskStatusLabel(task)
         const apartmentName = apartmentId != null ? (apartmentNameById.get(Number(apartmentId)) || `Apartamento ${apartmentId}`) : 'Sin apartamento'
         const assigneeName = assignedUserId != null ? (userNameById.get(Number(assignedUserId)) || `Usuario ${assignedUserId}`) : 'Sin asignar'
         const typeLabel = getTaskType(task)
         const dateLabel = getTaskDate(task)

         return (
          <CTableRow key={task.id}>
           <CTableDataCell className="text-start d-none d-sm-table-cell">
            <CFormCheck id={`check-task-${task.id}`} />
           </CTableDataCell>

           <CTableDataCell className="text-start">
            <div className="d-flex align-items-center gap-3">
             <CAvatar color="primary" textColor="white" size="md">T</CAvatar>
             <div>
              <div className="fw-semibold">{task.titulo || 'Sin titulo'}</div>
              <div className="small text-secondary text-truncate task-description-cell">{task.descripcion || 'Sin descripcion'}</div>
             </div>
            </div>
           </CTableDataCell>

           <CTableDataCell className="d-none d-md-table-cell">
            <span className="fw-medium d-inline-flex align-items-center gap-1">
             <Building2 size={20} /> {apartmentName}
            </span>
           </CTableDataCell>

           <CTableDataCell className="d-none d-lg-table-cell">
            <span className="fw-medium d-inline-flex align-items-center gap-1">
             <UserRound size={20} /> {assigneeName}
            </span>
           </CTableDataCell>

           <CTableDataCell className="d-none d-lg-table-cell">
            <span className="fw-medium d-inline-flex align-items-center gap-1">
             <CalendarDays size={20} /> {dateLabel}
            </span>
           </CTableDataCell>

           <CTableDataCell className="d-none d-lg-table-cell">
            <span className="fw-medium d-inline-flex align-items-center gap-1">
             <ClipboardClock size={20} /> {getDeadLine(typeLabel)}
            </span>
           </CTableDataCell>

           <CTableDataCell className="d-none d-lg-table-cell">
            <span className="fw-medium d-inline-flex align-items-center gap-1">
             <BookmarkCheck
              color={getTypeColor(typeLabel)}
              size={20} /> {typeLabel}
            </span>
           </CTableDataCell>

           <CTableDataCell>
            <div className="d-flex align-items-center justify-content-center gap-2">
             <CBadge
              color={getStatusBadgeColor(statusLabel)}
              shape="rounded-pill"
              className="px-3 py-2 d-inline-flex align-items-center gap-1"
             >
              {getStatusBadgeColor(statusLabel) === 'success'
               ? <CircleCheckBig size={20} />
               : <CircleX size={20} />}
              {statusLabel}
             </CBadge>
            </div>
           </CTableDataCell>

           {isAdmin && (
            <CTableDataCell className="d-none d-sm-table-cell">
             <div className="users-actions d-flex justify-content-center gap-2">
              <CButton
               color="info"
               variant="outline"
               className="users-action-btn"
               title="Editar tarea"
               aria-label={`Editar tarea ${task.titulo || 'tarea'}`}
               onClick={() => void openEditTaskModal(task)}
              >
               <CIcon icon={cilPencil} size="sm" />
              </CButton>
              <CButton
               color="danger"
               className="users-action-btn users-action-btn-danger"
               title="Eliminar tarea"
               aria-label={`Eliminar tarea ${task.titulo || 'tarea'}`}
               onClick={() => handleDeleteTask(task)}
              >
               <CIcon icon={cilTrash} size="sm" />
              </CButton>
             </div>
            </CTableDataCell>
           )}
          </CTableRow>
         )
        })}
       </CTableBody>
      </CTable>
     </div>

     <div className="users-footer d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
      <div className="small text-secondary">
       {loading ? 'Cargando tareas...' : `Mostrando ${filteredTasks.length} tareas`}
      </div>
      <CPagination aria-label="Paginacion de tareas" className="mb-0" style={{ cursor: 'pointer' }}>
       <CPaginationItem disabled>Anterior</CPaginationItem>
       <CPaginationItem active>1</CPaginationItem>
       <CPaginationItem>2</CPaginationItem>
       <CPaginationItem>Siguiente</CPaginationItem>
      </CPagination>
     </div>
    </CCardBody>
   </CCard>
  </div>
 )
}
