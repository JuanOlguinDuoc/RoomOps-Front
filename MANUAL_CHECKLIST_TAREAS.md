# Manual Completo del Checklist de Tareas - RoomOps

**Version:** 1.0  
**Fecha de creacion:** Mayo 2026  
**Audiencia:** Desarrolladores junior, nuevos integrantes del proyecto y usuarios funcionales  
**Proposito:** Documentar como se crea y gestiona el checklist dentro del detalle de tarea, y como impacta el estado general de la tarea.

---

## Tabla de Contenidos

1. [Introduccion](#1-introduccion)
2. [Arquitectura General](#2-arquitectura-general)
3. [Flujo Funcional Completo](#3-flujo-funcional-completo)
4. [Estados del Checklist](#4-estados-del-checklist)
5. [Reglas de Estado General de la Tarea](#5-reglas-de-estado-general-de-la-tarea)
6. [Persistencia y API](#6-persistencia-y-api)
7. [Validaciones Importantes](#7-validaciones-importantes)
8. [Errores Comunes y Soluciones](#8-errores-comunes-y-soluciones)
9. [UI, Tema Claro/Oscuro y Estilos](#9-ui-tema-clarooscuro-y-estilos)
10. [Buenas Practicas para Extender](#10-buenas-practicas-para-extender)
11. [Resumen Ejecutivo](#11-resumen-ejecutivo)

---

## 1. Introduccion

### Que es el checklist

El checklist es una lista de pendientes dentro de cada tarea (por ejemplo: "Reponer toallas", "Trapear piso", "Lavar loza").

Cada pendiente puede estar en:

- Pendiente
- Completado
- Bloqueado

Si un pendiente queda en Bloqueado, se debe registrar una nota breve explicando el bloqueo.

### Donde se usa

El panel de detalle de tarea es compartido entre:

- Vista de tareas (tabla)
- Vista Kanban

Esto permite que el comportamiento del checklist sea consistente en ambas vistas.

---

## 2. Arquitectura General

### Archivos clave del frontend

- src/components/taskDetail/TaskDetailPanel.jsx
- src/components/taskDetail/taskDetail.css
- src/components/task/Task.jsx
- src/components/kanban/Kanban.jsx
- src/components/task/TaskFunctions.jsx

### Archivos clave del backend

- roomsOps/model/ChecklistItem.java
- roomsOps/model/ChecklistStatus.java
- roomsOps/dto/TaskDto.java
- roomsOps/service/TaskService.java
- roomsOps/controller/TaskController.java

### Contrato de checklist esperado por backend

Cada item del checklist debe enviarse con esta forma:

- descripcion
- estado
- nota

No se deben enviar campos alternativos como observacion/comentario para persistencia oficial.

---

## 3. Flujo Funcional Completo

### Flujo de usuario

1. El usuario abre detalle de tarea desde Tareas o Kanban.
2. Presiona Agregar pendiente.
3. Se abre modal SweetAlert2 para ingresar descripcion.
4. El item entra como Pendiente.
5. El usuario puede cambiar estado del item a:
   - Pendiente
   - Completado
   - Bloqueado
6. Si elige Bloqueado, aparece input para nota breve.
7. Presiona Guardar cambios.
8. Se actualiza checklist y se recalcula estado general de la tarea.

### Flujo tecnico de guardado

1. Se normaliza cada item del checklist antes de guardar.
2. Se transforma a payload compatible con backend (descripcion, estado, nota).
3. Se calcula statusId general de la tarea segun reglas de checklist.
4. Se hace PUT a /api/v1/tasks/{id}.
5. Si falla backend, se intenta fallback localStorage.
6. Se refresca vista (tabla o tablero).

---

## 4. Estados del Checklist

### Pendiente

- Estado por defecto al crear item.
- No requiere nota.

### Completado

- Marca que el pendiente fue realizado.
- No requiere nota.

### Bloqueado

- Indica que el pendiente no se puede completar por un impedimento.
- Requiere nota breve.
- La nota se guarda en campo nota.

### Regla al volver a Pendiente o Completado

Al salir de Bloqueado hacia Pendiente o Completado, la nota de bloqueo se limpia para evitar inconsistencias.

---

## 5. Reglas de Estado General de la Tarea

El estado general de la tarea se deriva automaticamente desde el checklist al guardar.

### Reglas implementadas

1. Si al menos un item esta Bloqueado -> tarea Bloqueado.
2. Si todos los items estan Completado -> tarea Hecho/Completada.
3. Si hay al menos un Completado y no todos lo estan -> tarea En Progreso.
4. Si no hay completados ni bloqueados -> tarea Pendiente.

### Prioridad de reglas

La regla de Bloqueado tiene prioridad sobre las demas.

---

## 6. Persistencia y API

### Endpoint usado

- PUT /api/v1/tasks/{id}

### Campos importantes enviados

- titulo
- descripcion
- tipo
- prioridad
- fecha
- dueTime
- apartmentId
- assignedUserId
- statusId
- estadoId
- checklist

### Forma final de checklist enviada

Ejemplo:

```json
[
  {
    "descripcion": "Reponer toallas",
    "estado": "BLOQUEADO",
    "nota": "Sin stock en bodega"
  },
  {
    "descripcion": "Trapear piso",
    "estado": "HECHO",
    "nota": ""
  }
]
```

---

## 7. Validaciones Importantes

### Backend

El backend valida:

- Si estado es BLOQUEADO y nota viene vacia, rechaza la actualizacion.

Mensaje esperado en ese caso:

- "La nota es requerida cuando el checklist esta BLOQUEADO"

### Frontend

El frontend aplica:

- Normalizacion de items antes de guardar.
- Limite de longitud para nota breve.
- Limpieza de nota cuando estado deja de ser Bloqueado.

---

## 8. Errores Comunes y Soluciones

### Error: Tarea no encontrada

Posibles causas:

- Se intenta guardar con id inexistente.
- Tarea eliminada en backend y vista desactualizada.

Solucion:

- Refrescar datos y reabrir el detalle.

### Error al bloquear con mensaje

Posible causa:

- Se enviaba texto en campo incorrecto en lugar de nota.

Solucion aplicada:

- Guardar siempre el motivo de bloqueo en nota.
- Sanitizar payload del checklist antes del PUT.

### Error de contraste visual

Posible causa:

- Estilos del panel sin overrides de tema oscuro.

Solucion aplicada:

- Se agregaron estilos para html.theme-logo-dark en taskDetail.css.

---

## 9. UI, Tema Claro/Oscuro y Estilos

### Objetivo visual

- Mismo panel en Tareas y Kanban.
- Soporte de tema claro y oscuro.
- Lectura clara de estados por color.

### Elementos visuales relevantes

- Panel lateral con fondo y borde tematicos.
- Tarjetas de checklist por estado (pending/done/blocked).
- Input de motivo de bloqueo con estilo de alerta.
- Footer con acciones Cancelar y Guardar cambios.

---

## 10. Buenas Practicas para Extender

1. Mantener TaskDetailPanel como unica fuente de verdad UI para checklist.
2. Reutilizar helpers en TaskFunctions para logica de estado derivado.
3. No duplicar reglas de estado en varios archivos.
4. Al agregar estados nuevos, actualizar:
   - derivacion de estado general
   - mapeo de estados backend
   - estilos visuales
5. Mantener compatibilidad con backend: descripcion, estado, nota.

---

## 11. Resumen Ejecutivo

El checklist de RoomOps permite crear y gestionar pendientes por tarea, marcarlos como Pendiente, Completado o Bloqueado, y exige nota breve en bloqueos.

Al guardar, el sistema:

- normaliza los items,
- persiste checklist con contrato backend correcto,
- y recalcula automaticamente el estado general de la tarea.

Este comportamiento ya funciona en ambas entradas de uso (tabla de tareas y tablero Kanban), con soporte visual para modo claro y modo oscuro.
