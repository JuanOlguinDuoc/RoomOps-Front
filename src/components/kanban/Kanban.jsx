import React, { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Search, CalendarDays, ListChecks } from 'lucide-react'
import {
	DndContext,
	closestCorners,
	KeyboardSensor,
	PointerSensor,
	useDraggable,
	useDroppable,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { getTasks, updateTask } from '../../service/taskService'
import { getApartments } from '../../service/apartmentService'
import { getUsers } from '../../service/userService'
import { getStatuses } from '../../service/statusService'
import { isUserLoggedIn, isUserAdmin, isUserSupervisor, getAllApartments, getAllUsers } from '../../service/localStorage'
import {
	getLocalTasks,
	getTaskApartmentId,
	getTaskAssignedUserId,
	getTaskStatusId,
	getTaskDate,
	getTaskDueTime,
	getTaskType
} from '../task/TaskFunctions'
import './kanban.css'

const BOARD_COLUMNS = [
	{ key: 'pendiente', label: 'PENDIENTE', dotClass: 'dot-pending' },
	{ key: 'progreso', label: 'EN PROGRESO', dotClass: 'dot-progress' },
	{ key: 'hecho', label: 'HECHO', dotClass: 'dot-done' },
	{ key: 'bloqueado', label: 'BLOQUEADO', dotClass: 'dot-blocked' }
]

const normalizeText = (value = '') => {
	return String(value)
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
}

const resolveBoardColumn = (statusLabel = '') => {
	const normalized = normalizeText(statusLabel)

	if (normalized.includes('bloque')) return 'bloqueado'
	if (normalized.includes('progreso') || normalized.includes('curso')) return 'progreso'
	if (normalized.includes('hecho') || normalized.includes('complet')) return 'hecho'
	if (normalized.includes('pendiente') || normalized.includes('por hacer')) return 'pendiente'

	return 'pendiente'
}

const getChecklistProgress = (task) => {
	const checklist = task?.checklist || task?.listaVerificacion || []
	if (!Array.isArray(checklist) || checklist.length === 0) {
		return { completed: 0, total: 0 }
	}

	const completed = checklist.filter((item) => {
		const estado = normalizeText(item?.estado || '')
		return estado === 'completado' || estado === 'hecho' || estado === 'done'
	}).length

	const total = checklist.length

	return { completed, total }
}

// Componente para tarjeta draggable
function DraggableCard({ task, apartmentNameById }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useDraggable({
		id: `task-${task.id}`,
		data: {
			type: 'task',
			taskId: Number(task.id)
		}
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		width: '100%'
	}

	const apartmentId = getTaskApartmentId(task)
	const apartmentName = apartmentId != null ? (apartmentNameById.get(Number(apartmentId)) || `Apto ${apartmentId}`) : 'Sin apto'
	const dateLabel = getTaskDate(task)
	const typeLabel = getTaskType(task)
	const checklistProgress = getChecklistProgress(task)

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="kanban-card"
		>
			<div className="kanban-card-header">
				<span className="kanban-chip">{apartmentName.toUpperCase()}</span>
				<span className="kanban-type">{typeLabel || 'Sin tipo'}</span>
			</div>

			<h3 className="kanban-card-title">{task.titulo || 'Tarea sin titulo'}</h3>

			<div className="kanban-card-footer">
				<span className="kanban-date"><CalendarDays size={13} /> {dateLabel || 'Sin fecha'}</span>
				<span className="kanban-checklist"><ListChecks size={13} /> {checklistProgress.completed}/{checklistProgress.total || 0}</span>
			</div>
		</div>
	)
}

// Componente para columna droppable
function DroppableColumn({ column, items, apartmentNameById }) {
	const { setNodeRef, isOver } = useDroppable({
		id: `column-${column.key}`,
		data: {
			type: 'column',
			columnKey: column.key
		}
	})

	return (
		<article className="kanban-column" ref={setNodeRef}>
			<header className="kanban-column-header">
				<div className="kanban-column-title-wrap">
					<span className={`kanban-dot ${column.dotClass}`} />
					<h2 className="kanban-column-title">{column.label}</h2>
					<span className="kanban-column-count">{items.length}</span>
				</div>
			</header>

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
	)
}

export default function Kanban() {
	const isLoggedIn = isUserLoggedIn()
	const isAdmin = isUserAdmin()
	const canAccess = isAdmin || isUserSupervisor()

	if (!isLoggedIn) {
		return <Navigate to="/login?redirect=/kanban" replace />
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

	const sensors = useSensors(
		useSensor(PointerSensor, { distance: 8 }),
		useSensor(KeyboardSensor)
	)

	useEffect(() => {
		const refreshBoard = async () => {
			setLoading(true)

			const [tasksResult, apartmentsResult, usersResult, statusesResult] = await Promise.allSettled([
				getTasks(),
				getApartments(),
				getUsers(),
				getStatuses()
			])

			if (tasksResult.status === 'fulfilled') {
				setTasks(Array.isArray(tasksResult.value) ? tasksResult.value : [])
			} else {
				setTasks(getLocalTasks())
			}

			if (apartmentsResult.status === 'fulfilled') {
				setApartments(Array.isArray(apartmentsResult.value) ? apartmentsResult.value : [])
			} else {
				setApartments(getAllApartments())
			}

			if (usersResult.status === 'fulfilled') {
				setUsers(Array.isArray(usersResult.value) ? usersResult.value : [])
			} else {
				setUsers(getAllUsers())
			}

			if (statusesResult.status === 'fulfilled') {
				setStatuses(Array.isArray(statusesResult.value) ? statusesResult.value : [])
			} else {
				setStatuses([])
			}

			setLoading(false)
		}

		refreshBoard()
	}, [])

	const apartmentNameById = useMemo(() => {
		const map = new Map()
		apartments.forEach((apartment) => {
			if (apartment?.id != null) {
				map.set(Number(apartment.id), apartment.nombre || `Apto ${apartment.id}`)
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

	const statusLabelById = useMemo(() => {
		const map = new Map()
		statuses.forEach((status) => {
			if (status?.id != null) {
				map.set(Number(status.id), status.nombre || `Estado ${status.id}`)
			}
		})
		return map
	}, [statuses])

	const filteredTasks = useMemo(() => {
		const term = normalizeText(searchTerm)
		if (!term) return tasks

		return tasks.filter((task) => {
			const apartmentId = getTaskApartmentId(task)
			const apartmentName = apartmentId != null ? (apartmentNameById.get(Number(apartmentId)) || `Apto ${apartmentId}`) : 'Sin apartamento'
			const title = task?.titulo || ''
			const description = task?.descripcion || ''
			const type = getTaskType(task)
			const index = normalizeText(`${title} ${description} ${type} ${apartmentName}`)
			return index.includes(term)
		})
	}, [tasks, searchTerm, apartmentNameById])

	const groupedTasks = useMemo(() => {
		const grouped = {
			pendiente: [],
			progreso: [],
			hecho: [],
			bloqueado: []
		}

		filteredTasks.forEach((task) => {
			const statusId = getTaskStatusId(task)
			const statusLabel = statusId != null ? (statusLabelById.get(Number(statusId)) || `Estado ${statusId}`) : 'Pendiente'
			const column = resolveBoardColumn(statusLabel)
			grouped[column].push(task)
		})

		return grouped
	}, [filteredTasks, statusLabelById])

	const getTaskColumnKey = (task) => {
		const statusId = getTaskStatusId(task)
		const statusLabel = statusId != null ? (statusLabelById.get(Number(statusId)) || `Estado ${statusId}`) : 'Pendiente'
		return resolveBoardColumn(statusLabel)
	}

	const handleDragEnd = async (event) => {
		const { active, over } = event

		if (!over) return

		const draggedTaskId = Number(active?.data?.current?.taskId)
		if (!draggedTaskId) return

		// Encontrar la tarea arrastrada
		const draggedTask = tasks.find((t) => Number(t.id) === draggedTaskId)
		if (!draggedTask) return

		const targetColumnKey = over?.data?.current?.columnKey

		if (!targetColumnKey) return

		const currentColumnKey = getTaskColumnKey(draggedTask)
		if (currentColumnKey === targetColumnKey) return

		// Mapear la columna a un estado
		const columnToStatusMap = {
			pendiente: 'Pendiente',
			progreso: 'En Progreso',
			hecho: 'Hecho',
			bloqueado: 'Bloqueado'
		}

		const newStatusName = columnToStatusMap[targetColumnKey]
		if (!newStatusName) return

		// Encontrar el ID del estado correspondiente
		const newStatus = statuses.find((s) => {
			const statusLabel = s?.nombre || ''
			return resolveBoardColumn(statusLabel) === targetColumnKey || normalizeText(statusLabel) === normalizeText(newStatusName)
		})

		if (!newStatus) return

		// Actualizar la tarea
		const updatedTask = {
			titulo: draggedTask?.titulo || '',
			descripcion: draggedTask?.descripcion || '',
			tipo: getTaskType(draggedTask) || '',
			prioridad: draggedTask?.prioridad ?? draggedTask?.priority ?? '',
			fecha: getTaskDate(draggedTask) || null,
			dueTime: getTaskDueTime(draggedTask) || null,
			apartmentId: getTaskApartmentId(draggedTask),
			assignedUserId: getTaskAssignedUserId(draggedTask),
			statusId: newStatus.id,
			estadoId: newStatus.id,
			checklist: draggedTask?.checklist ?? draggedTask?.listaVerificacion ?? []
		}

		try {
			await updateTask(draggedTask.id, updatedTask)
			// Actualizar el estado local
			setTasks((prevTasks) =>
				prevTasks.map((t) =>
					Number(t.id) === draggedTaskId
						? { ...t, statusId: newStatus.id, estadoId: newStatus.id }
						: t
				)
			)
		} catch (error) {
			console.error('Error actualizando tarea:', error)
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragEnd={handleDragEnd}
		>
			<div className="kanban-view">
				<header className="kanban-topbar">
					<h1 className="kanban-title">Kanban</h1>

					<div className="kanban-search-wrap">
						<Search size={18} className="kanban-search-icon" />
						<input
							className="kanban-search-input"
							placeholder="Buscar tarea o apto..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							aria-label="Buscar en tablero"
						/>
					</div>
				</header>

				{loading ? (
					<div className="kanban-loading">Cargando tablero...</div>
				) : (
					<section className="kanban-board" aria-label="Tablero kanban de tareas">
						{BOARD_COLUMNS.map((column) => {
							const items = groupedTasks[column.key] || []
							return (
								<DroppableColumn
									key={column.key}
									column={column}
									items={items}
									apartmentNameById={apartmentNameById}
								/>
							)
						})}
					</section>
				)}
			</div>
		</DndContext>
	)
}
