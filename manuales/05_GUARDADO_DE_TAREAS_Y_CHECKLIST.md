# Manual 05 - Guardado de Tareas y Checklist

Version: 1.1

## 1) Explicacion no tecnica

### Problema original
El trabajador podia marcar checklist en el panel de detalle, pero al pulsar Guardar no se persistia.

### Solucion implementada
Se conecto el panel de detalle con un callback real de guardado.

Comportamiento final:
- Si el servidor esta disponible, guarda en backend.
- Si el servidor falla, guarda en copia local para no perder trabajo.
- Al finalizar, recarga datos para reflejar estado real.

### Ejemplo no tecnico
Escenario:
- Usuario marca 2 items como HECHO y 1 como BLOQUEADO con nota.
- Presiona Guardar.

Resultado esperado:
- Ve mensaje de exito.
- Al reabrir la tarea, los cambios siguen presentes.

## 2) Explicacion tecnica

### Archivos involucrados
- src/components/home/Home.jsx
- src/components/taskDetail/TaskDetailPanel.jsx
- src/components/task/TaskFunctions.jsx
- src/service/taskService.js

### Contrato entre panel y dashboard
TaskDetailPanel llama:
- onSaveChecklist(task, sanitizedChecklist)

Si no existe esa prop, el panel solo se cierra. Esta fue la causa original del bug.

### Como quedo en WorkerDashboard
Se implemento handleSaveTaskChecklist(task, checklistItems) y se paso al panel como:
- onSaveChecklist={handleSaveTaskChecklist}

## 3) Flujo tecnico de guardado

1. TaskDetailPanel normaliza cada item:
    - descripcion
    - estado (PENDIENTE/HECHO/BLOQUEADO)
    - nota (solo cuando BLOQUEADO)
2. Llama callback con la tarea y checklist saneado.
3. WorkerDashboard construye payload completo.
4. Resuelve statusId global con resolveTaskStatusIdFromChecklist.
5. Intenta updateTask(taskId, payload).
6. Si falla API, intenta updateTaskLocal(taskId, payload).
7. Muestra toast segun resultado.
8. Ejecuta refreshWorkerData().
9. Si todo bien, panel cierra.

## 4) Ejemplo tecnico de payload

```json
{
   "titulo": "Aseo apto 301",
   "descripcion": "Aseo general",
   "tipo": "Aseo",
   "prioridad": "MEDIA",
   "fecha": "2026-05-14",
   "dueTime": "18:00",
   "apartmentId": 301,
   "assignedUserId": 17,
   "statusId": 2,
   "estadoId": 2,
   "checklist": [
      { "descripcion": "Reponer toallas", "estado": "HECHO", "nota": "" },
      { "descripcion": "Revisar minibar", "estado": "BLOQUEADO", "nota": "Falta stock" }
   ]
}
```

## 5) Reglas de resiliencia

Prioridad de persistencia:
1. Backend (fuente principal)
2. LocalStorage (fallback de continuidad)

Notificaciones:
- Exito: Checklist actualizado
- Fallback activado: aviso de copia local por falla del servidor
- Error final: mensaje tecnico de falla

## 6) Casos de prueba recomendados

1. Guardado exitoso con backend en linea.
2. Guardado con backend caido (validar fallback local).
3. Checklist vacio (no debe romper).
4. Item bloqueado sin nota (verificar validacion esperada de negocio).
5. Reapertura inmediata de tarea para confirmar persistencia.
