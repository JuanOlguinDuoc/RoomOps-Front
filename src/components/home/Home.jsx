import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	ArrowUpRight,
	Bell,
	CheckCircle2,
	ChevronDown,
	Clock3,
	ClipboardList,
	Search,
	ShieldAlert,
	TrendingUp
} from 'lucide-react'
import { getTasks } from '../../service/taskService'
import { getUsers } from '../../service/userService'
import { getApartments } from '../../service/apartmentService'
import { getStatuses } from '../../service/statusService'
import { getAllUsers } from '../../service/localStorage'
import {
	getChecklistOverallStatusKey,
	getTaskApartmentId,
	getTaskAssignedUserId,
	getTaskDate,
	getTaskDueTime,
	getTaskStatusId,
	getTaskType,
	getLocalTasks,
	normalizeTaskText
} from '../task/TaskFunctions'
import './Home.css'

const STATUS_ORDER = ['pending', 'in-progress', 'done', 'blocked']

const STATUS_META = {
	pending: {
		label: 'Pendiente',
		accent: '#98A2B3',
		icon: Clock3,
		fill: '#98A2B3'
	},
	'in-progress': {
		label: 'En Progreso',
		accent: '#F59E0B',
		icon: TrendingUp,
		fill: '#F59E0B'
	},
	done: {
		label: 'Hecho',
		accent: '#10B981',
		icon: CheckCircle2,
		fill: '#10B981'
	},
	blocked: {
		label: 'Bloqueada',
		accent: '#F43F5E',
		icon: ShieldAlert,
		fill: '#F43F5E'
	}
}

const PERIOD_OPTIONS = [
	{ value: 'week', label: 'Esta semana' },
	{ value: 'month', label: 'Este mes' },
	{ value: 'today', label: 'Hoy' },
	{ value: 'all', label: 'Todo' }
]

const normalizeId = (value) => (value == null || value === '' ? null : Number(value))

const addDays = (date, days) => {
	const next = new Date(date)
	next.setDate(next.getDate() + days)
	return next
}

const formatDate = (date) => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

const buildDemoData = () => {
	const today = new Date()

	return {
		tasks: [
			{
				id: 1,
				titulo: 'Limpieza Profunda',
				apartmentId: 1,
				assignedUserId: 1,
				statusId: 2,
				fecha: formatDate(addDays(today, -1)),
				dueTime: '09:00',
				tipo: 'Aseo'
			},
			{
				id: 2,
				titulo: 'Cambio de Sábanas',
				apartmentId: 2,
				assignedUserId: 2,
				statusId: 1,
				fecha: formatDate(addDays(today, -2)),
				dueTime: '11:30',
				tipo: 'Aseo'
			},
			{
				id: 3,
				titulo: 'Reparación de Aire',
				apartmentId: 3,
				assignedUserId: 3,
				statusId: 4,
				fecha: formatDate(today),
				dueTime: '13:15',
				tipo: 'Mantención'
			},
			{
				id: 4,
				titulo: 'Mantenimiento Preventivo',
				apartmentId: 5,
				assignedUserId: 2,
				statusId: 3,
				fecha: formatDate(addDays(today, -3)),
				dueTime: '15:00',
				tipo: 'Mantención'
			},
			{
				id: 5,
				titulo: 'Revisión de Inventario',
				apartmentId: 4,
				assignedUserId: 1,
				statusId: 2,
				fecha: formatDate(addDays(today, -4)),
				dueTime: '17:45',
				tipo: 'Inspección'
			}
		],
		users: [
			{ id: 1, nombre: 'Apt 1' },
			{ id: 2, nombre: 'Apt 2' },
			{ id: 3, nombre: 'Apt 3' }
		],
		apartments: [
			{ id: 1, nombre: 'Apt 1' },
			{ id: 2, nombre: 'Apt 2' },
			{ id: 3, nombre: 'Apt 3' },
			{ id: 4, nombre: 'Apt 4' },
			{ id: 5, nombre: 'Apt 5' }
		],
		statuses: [
			{ id: 1, nombre: 'Pendiente' },
			{ id: 2, nombre: 'En Progreso' },
			{ id: 3, nombre: 'Hecho' },
			{ id: 4, nombre: 'Bloqueada' }
		]
	}
}

const normalizeStatusKey = (value = '') => {
	const text = normalizeTaskText(value)

	if (text.includes('bloque')) return 'blocked'
	if (text.includes('progreso') || text.includes('curso') || text.includes('avance')) return 'in-progress'
	if (text.includes('hecho') || text.includes('complet') || text.includes('done')) return 'done'
	if (text.includes('pendiente') || text.includes('por hacer') || text.includes('todo')) return 'pending'

	return 'pending'
}

const getRecordLabel = (record, fallback) => {
	if (!record) return fallback

	const label =
		record.nombre ||
		record.name ||
		record.titulo ||
		record.title ||
		record.descripcion ||
		record.numero ||
		record.code

	return label ? String(label) : fallback
}

const getTaskStatusKey = (task, statusesById) => {
	const statusId = normalizeId(getTaskStatusId(task))
	const statusRecord = statusId != null ? statusesById.get(statusId) : null
	const fromCatalog = statusRecord ? getRecordLabel(statusRecord, '') : ''

	if (fromCatalog) {
		return normalizeStatusKey(fromCatalog)
	}

	const explicitStatus =
		task?.estado ||
		task?.status ||
		task?.statusName ||
		task?.estadoNombre ||
		task?.statusLabel ||
		''

	if (explicitStatus) {
		return normalizeStatusKey(explicitStatus)
	}

	const checklist = task?.checklist || task?.listaVerificacion || []
	return getChecklistOverallStatusKey(checklist)
}

const formatDateLabel = (value) => {
	if (!value) return 'Sin fecha'

	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return value

	return new Intl.DateTimeFormat('es-CL', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(date)
}

const parseLocalDate = (rawValue) => {
	if (!rawValue) return null

	if (rawValue instanceof Date) {
		return Number.isNaN(rawValue.getTime()) ? null : rawValue
	}

	const value = String(rawValue).trim()
	if (!value) return null

	// Parse YYYY-MM-DD as local date to avoid timezone offset issues.
	const onlyDate = value.includes('T') ? value.split('T')[0] : value
	const parts = onlyDate.split('-')

	if (parts.length === 3) {
		const [year, month, day] = parts.map((part) => Number(part))
		if (Number.isFinite(year) && Number.isFinite(month) && Number.isFinite(day)) {
			const local = new Date(year, month - 1, day)
			if (!Number.isNaN(local.getTime())) {
				return local
			}
		}
	}

	const fallback = new Date(value)
	return Number.isNaN(fallback.getTime()) ? null : fallback
}

const matchesPeriod = (task, period) => {
	if (period === 'all') return true

	const rawDate = getTaskDate(task)
	if (!rawDate) return true

	const date = parseLocalDate(rawDate)
	if (!date) return true

	const today = new Date()
	const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
	const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)

	if (period === 'today') {
		return date >= startOfToday && date <= endOfToday
	}

	if (period === 'week') {
		const weekAgo = addDays(startOfToday, -7)
		return date >= weekAgo
	}

	if (period === 'month') {
		const monthAgo = addDays(startOfToday, -30)
		return date >= monthAgo
	}

	return true
}

const sortByRecentDate = (left, right) => {
	const leftDate = new Date(`${getTaskDate(left) || ''}T${getTaskDueTime(left) || '00:00'}`)
	const rightDate = new Date(`${getTaskDate(right) || ''}T${getTaskDueTime(right) || '00:00'}`)

	const leftTime = Number.isNaN(leftDate.getTime()) ? 0 : leftDate.getTime()
	const rightTime = Number.isNaN(rightDate.getTime()) ? 0 : rightDate.getTime()

	return rightTime - leftTime || Number(right.id || 0) - Number(left.id || 0)
}

function MetricCard({ icon: Icon, title, value, helper, tone = 'neutral' }) {
	return (
		<article className={`home-metric-card tone-${tone}`}>
			<div className="home-metric-head">
				<span className="home-metric-icon"><Icon size={20} /></span>
				<span className="home-metric-helper">{helper}</span>
			</div>
			<p className="home-metric-title">{title}</p>
			<strong className="home-metric-value">{value}</strong>
		</article>
	)
}

export default function Home() {
	const [tasks, setTasks] = useState([])
	const [users, setUsers] = useState([])
	const [apartments, setApartments] = useState([])
	const [statuses, setStatuses] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [period, setPeriod] = useState('week')

	useEffect(() => {
		let isMounted = true

		const loadHomeData = async () => {
			setLoading(true)

			const [tasksResult, usersResult, apartmentsResult, statusesResult] = await Promise.allSettled([
				getTasks(),
				getUsers(),
				getApartments(),
				getStatuses()
			])

			if (!isMounted) return

			const apiSucceeded = tasksResult.status === 'fulfilled' && Array.isArray(tasksResult.value)
			const apiTasks = apiSucceeded ? tasksResult.value : getLocalTasks()
			const demo = buildDemoData()
			const useDemoData = !apiSucceeded && apiTasks.length === 0
			const finalTasks = useDemoData ? demo.tasks : apiTasks

			setTasks(finalTasks)
			setUsers(usersResult.status === 'fulfilled' && Array.isArray(usersResult.value) && usersResult.value.length > 0 ? usersResult.value : (useDemoData ? demo.users : getAllUsers()))
			setApartments(apartmentsResult.status === 'fulfilled' && Array.isArray(apartmentsResult.value) && apartmentsResult.value.length > 0 ? apartmentsResult.value : (useDemoData ? demo.apartments : []))
			setStatuses(statusesResult.status === 'fulfilled' && Array.isArray(statusesResult.value) && statusesResult.value.length > 0 ? statusesResult.value : (useDemoData ? demo.statuses : []))
			setLoading(false)
		}

		loadHomeData()

		return () => {
			isMounted = false
		}
	}, [])

	const apartmentById = useMemo(() => new Map((apartments || []).map((apartment) => [normalizeId(apartment.id), apartment])), [apartments])
	const userById = useMemo(() => new Map((users || []).map((user) => [normalizeId(user.id), user])), [users])
	const statusById = useMemo(() => new Map((statuses || []).map((status) => [normalizeId(status.id), status])), [statuses])

	const visibleTasks = useMemo(() => {
		const normalizedQuery = normalizeTaskText(searchTerm)

		return (tasks || [])
			.filter((task) => matchesPeriod(task, period))
			.filter((task) => {
				if (!normalizedQuery) return true

				const taskStatusKey = getTaskStatusKey(task, statusById)
				const apartmentLabel = getRecordLabel(apartmentById.get(normalizeId(getTaskApartmentId(task))), `Apto ${getTaskApartmentId(task) ?? ''}`)
				const userLabel = getRecordLabel(userById.get(normalizeId(getTaskAssignedUserId(task))), `Usuario ${getTaskAssignedUserId(task) ?? ''}`)

				return [
					task.titulo,
					task.descripcion,
					getTaskType(task),
					apartmentLabel,
					userLabel,
					STATUS_META[taskStatusKey]?.label || ''
				]
					.some((item) => normalizeTaskText(item).includes(normalizedQuery))
			})
			.sort(sortByRecentDate)
	}, [apartmentById, period, searchTerm, statusById, tasks, userById])

	const statusSummary = useMemo(() => {
		const summary = { pending: 0, 'in-progress': 0, done: 0, blocked: 0 }

		visibleTasks.forEach((task) => {
			const key = getTaskStatusKey(task, statusById)
			summary[key] = (summary[key] || 0) + 1
		})

		return summary
	}, [statusById, visibleTasks])

	const chartData = useMemo(() => STATUS_ORDER.map((key) => ({ key, count: statusSummary[key] || 0, ...STATUS_META[key] })), [statusSummary])
	const recentTasks = visibleTasks.slice(0, 4)
	const totalTasks = visibleTasks.length
	const maxChartCount = Math.max(...chartData.map((item) => item.count), 1)

	const metricCards = [
		{
			title: 'Total Tareas',
			value: totalTasks,
			helper: totalTasks > 0 ? 'Vista activa' : 'Sin tareas',
			tone: 'blue',
			icon: ClipboardList
		},
		{
			title: 'Pendientes',
			value: statusSummary.pending,
			helper: `${totalTasks ? Math.round((statusSummary.pending / totalTasks) * 100) : 0}% del total`,
			tone: 'slate',
			icon: Clock3
		},
		{
			title: 'En Progreso',
			value: statusSummary['in-progress'],
			helper: `${totalTasks ? Math.round((statusSummary['in-progress'] / totalTasks) * 100) : 0}% del total`,
			tone: 'amber',
			icon: ArrowUpRight
		},
		{
			title: 'Completadas',
			value: statusSummary.done,
			helper: `${totalTasks ? Math.round((statusSummary.done / totalTasks) * 100) : 0}% del total`,
			tone: 'green',
			icon: CheckCircle2
		},
		{
			title: 'Bloqueadas',
			value: statusSummary.blocked,
			helper: `${totalTasks ? Math.round((statusSummary.blocked / totalTasks) * 100) : 0}% del total`,
			tone: 'rose',
			icon: ShieldAlert
		}
	]

	return (
		<section className="home-dashboard">
			<header className="home-topbar">
				<div>
					<h1 className="home-title">Dashboard</h1>
					<p className="home-subtitle">Resumen operativo de tareas y ocupación</p>
				</div>

				<div className="home-topbar-actions">
					<label className="home-search">
						<Search size={16} />
						<input
							type="search"
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder="Buscar tarea o apto..."
							aria-label="Buscar tarea o apartamento"
						/>
					</label>

					<button type="button" className="home-icon-button" aria-label="Notificaciones">
						<Bell size={18} />
						<span className="home-notification-dot" />
					</button>
				</div>
			</header>

			<div className="home-metrics-grid">
				{metricCards.map((card) => (
					<MetricCard key={card.title} {...card} />
				))}
			</div>

			<div className="home-content-grid">
				<article className="home-panel home-chart-panel">
					<div className="home-panel-head">
						<div>
							<h2 className="home-panel-title">Estado de Tareas</h2>
							<p className="home-panel-subtitle">Distribución de carga de trabajo actual</p>
						</div>

						<label className="home-period-select">
							<span className="sr-only">Filtrar período</span>
							<select value={period} onChange={(event) => setPeriod(event.target.value)}>
								{PERIOD_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>{option.label}</option>
								))}
							</select>
							<ChevronDown size={16} />
						</label>
					</div>

					{loading ? (
						<div className="home-loading">Cargando información del tablero...</div>
					) : (
						<div className="home-chart" aria-label="Distribución de tareas">
							{chartData.map((item) => {
								const barHeight = item.count === 0 ? 8 : Math.max(10, (item.count / maxChartCount) * 100)

								return (
									<div key={item.key} className="home-chart-item">
										<div className="home-chart-bar-wrap">
											<div
												className="home-chart-bar"
												style={{ height: `${barHeight}%`, backgroundColor: item.fill }}
											>
												<span className="home-chart-value">{item.count}</span>
											</div>
										</div>
										<div className="home-chart-label">
											<span className="home-chart-dot" style={{ backgroundColor: item.fill }} />
											<span>{item.label}</span>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</article>

				<aside className="home-panel home-recent-panel">
					<div className="home-panel-head home-recent-head">
						<div>
							<h2 className="home-panel-title">Tareas Recientes</h2>
						</div>
					</div>

					<div className="home-recent-list">
						{recentTasks.length === 0 ? (
							<div className="home-empty-state">
								<p>No hay tareas para mostrar.</p>
							</div>
						) : (
							recentTasks.map((task) => {
								const statusKey = getTaskStatusKey(task, statusById)
								const statusMeta = STATUS_META[statusKey] || STATUS_META.pending
								const apartmentLabel = getRecordLabel(apartmentById.get(normalizeId(getTaskApartmentId(task))), `Apto ${getTaskApartmentId(task) ?? '-'}`)
								const userLabel = getRecordLabel(userById.get(normalizeId(getTaskAssignedUserId(task))), `Usuario ${getTaskAssignedUserId(task) ?? '-'}`)

								return (
									<article key={task.id} className="home-recent-item">
										<span className="home-recent-accent" style={{ backgroundColor: statusMeta.fill }} />
										<div className="home-recent-body">
											<div className="home-recent-row">
												<div>
													<h3 className="home-recent-title">{task.titulo || 'Tarea sin título'}</h3>
													<p className="home-recent-meta">{apartmentLabel} · {userLabel}</p>
												</div>
												<span className="home-recent-status">{statusMeta.label.toUpperCase()}</span>
											</div>
											<div className="home-recent-footer">
												<span>{formatDateLabel(getTaskDate(task))}</span>
												<span>{getTaskDueTime(task) || 'Sin hora'}</span>
												<span>{getTaskType(task) || 'Sin tipo'}</span>
											</div>
										</div>
									</article>
								)
							})
						)}
					</div>

					<Link to="/tasks" className="home-view-all">
						Ver todas las tareas
					</Link>
				</aside>
			</div>
		</section>
	)
}
