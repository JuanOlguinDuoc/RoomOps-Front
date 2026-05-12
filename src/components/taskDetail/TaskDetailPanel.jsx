import React, { useMemo } from 'react'
import { Building2, UserRound, CalendarDays, ClipboardClock, CheckSquare, X } from 'lucide-react'
import {
  getTaskApartmentId,
  getTaskAssignedUserId,
  getTaskDate,
  getTaskDueTime,
  getTaskType
} from '../task/TaskFunctions'
import './taskDetail.css'

const normalizeText = (value = '') => {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const getChecklistItemState = (item = {}) => {
  const rawState = item?.estado || item?.status || item?.checklistStatus || item?.estadoChecklist || ''
  const normalized = normalizeText(rawState)

  if (normalized.includes('bloquead') || normalized.includes('blocked')) {
    return { key: 'blocked', label: 'BLOQUEADO' }
  }

  if (normalized.includes('complet') || normalized.includes('hecho') || normalized.includes('done')) {
    return { key: 'done', label: 'HECHO' }
  }

  return { key: 'pending', label: 'PENDIENTE' }
}

const getChecklistItemTitle = (item = {}, index = 0) => {
  return item?.titulo || item?.title || item?.nombre || item?.descripcion || `Item ${index + 1}`
}

const getChecklistItemNote = (item = {}) => {
  return item?.nota || item?.observacion || item?.comentario || item?.detalle || ''
}

export default function TaskDetailPanel({
  isOpen,
  task,
  onClose,
  apartmentNameById,
  userNameById,
  statusNameById,
  getDeadLine
}) {
  const checklist = useMemo(() => {
    const rawChecklist = task?.checklist || task?.listaVerificacion || []
    return Array.isArray(rawChecklist) ? rawChecklist : []
  }, [task])

  const checklistDoneCount = useMemo(() => {
    return checklist.filter((item) => getChecklistItemState(item).key === 'done').length
  }, [checklist])

  if (!isOpen || !task) return null

  const apartmentId = getTaskApartmentId(task)
  const assignedUserId = getTaskAssignedUserId(task)
  const statusId = task?.statusId ?? task?.estadoId ?? null
  const apartmentName = apartmentId != null
    ? (apartmentNameById?.get(Number(apartmentId)) || `Apartamento ${apartmentId}`)
    : 'Sin apartamento'
  const assigneeName = assignedUserId != null
    ? (userNameById?.get(Number(assignedUserId)) || `Usuario ${assignedUserId}`)
    : 'Sin asignar'
  const statusLabel = statusId != null
    ? (statusNameById?.get(Number(statusId)) || `Estado ${statusId}`)
    : 'Sin estado'
  const dateLabel = getTaskDate(task) || 'Sin fecha'
  const dueTimeLabel = typeof getDeadLine === 'function' ? getDeadLine(getTaskType(task)) : (getTaskDueTime(task) || 'Sin hora')

  return (
    <>
      <button className="task-detail-backdrop" type="button" onClick={onClose} aria-label="Cerrar detalle de tarea" />

      <aside className="task-detail-panel" role="dialog" aria-modal="true" aria-label="Detalle de tarea">
        <header className="task-detail-header">
          <span className="task-detail-kicker">DETALLE DE TAREA</span>
          <h2 className="task-detail-title">{task?.titulo || 'Tarea sin titulo'}</h2>
          <button type="button" className="task-detail-close" onClick={onClose} aria-label="Cerrar panel">
            <X size={18} />
          </button>
        </header>

        <div className="task-detail-body">
          <section className="task-detail-grid">
            <article className="task-detail-card">
              <span className="task-detail-label">Apartamento</span>
              <p className="task-detail-value"><Building2 size={16} /> {apartmentName}</p>
            </article>

            <article className="task-detail-card">
              <span className="task-detail-label">Asignado a</span>
              <p className="task-detail-value"><UserRound size={16} /> {assigneeName}</p>
            </article>

            <article className="task-detail-card">
              <span className="task-detail-label">Fecha</span>
              <p className="task-detail-value"><CalendarDays size={16} /> {dateLabel}</p>
            </article>

            <article className="task-detail-card">
              <span className="task-detail-label">Hora limite</span>
              <p className="task-detail-value"><ClipboardClock size={16} /> {dueTimeLabel}</p>
            </article>
          </section>

          <section className="task-detail-section">
            <h3 className="task-detail-section-title">Descripcion</h3>
            <p className="task-detail-description">{task?.descripcion || 'Sin descripcion'}</p>
          </section>

          <section className="task-detail-section">
            <div className="task-detail-checklist-header">
              <h3 className="task-detail-section-title">Checklist</h3>
              <span className="task-detail-counter">{checklistDoneCount}/{checklist.length}</span>
            </div>

            <div className="task-detail-checklist">
              {checklist.length === 0 ? (
                <p className="task-detail-empty">Esta tarea no tiene checklist.</p>
              ) : (
                checklist.map((item, index) => {
                  const state = getChecklistItemState(item)
                  const note = getChecklistItemNote(item)

                  return (
                    <article key={`${task.id}-check-${index}`} className={`task-check-item is-${state.key}`}>
                      <div className="task-check-main">
                        <p className="task-check-title"><CheckSquare size={15} /> {getChecklistItemTitle(item, index)}</p>
                        {note ? <p className="task-check-note">{note}</p> : null}
                      </div>
                      <span className="task-check-state">{state.label}</span>
                    </article>
                  )
                })
              )}
            </div>
          </section>

          <section className="task-detail-section">
            <h3 className="task-detail-section-title">Estado actual</h3>
            <p className="task-detail-status">{statusLabel}</p>
          </section>
        </div>

        <footer className="task-detail-footer">
          <button type="button" className="task-detail-btn task-detail-btn-muted" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="task-detail-btn task-detail-btn-primary" onClick={onClose}>
            Guardar cambios
          </button>
        </footer>
      </aside>
    </>
  )
}
