# Manual 07 - Pruebas y Validacion

Version: 1.1

## 1) Explicacion no tecnica

### Objetivo
Comprobar que el sistema se comporta correctamente para cada rol y en condiciones reales de uso.

### Que valida este plan
- Acceso correcto por perfil.
- Limites de acciones por rol.
- Guardado de checklist desde dashboard trabajador.
- Consistencia de reglas por tipo de tarea.

## 2) Matriz funcional esperada

### ADMIN
Debe poder:
- Ver dashboard general.
- Gestionar usuarios.
- Gestionar apartamentos.
- Gestionar todas las tareas.

### SUPERVISOR
Debe poder:
- Ver dashboard general.
- Ver usuarios en lectura.
- Operar tareas y kanban.

### TRABAJADOR
Debe poder:
- Ver dashboard personal.
- Ver solo tareas propias.
- Guardar checklist en detalle.
- Ver kanban personal.

No debe poder:
- Administrar usuarios.
- Ver dashboard administrativo.

## 3) Casos de prueba con detalle

### Caso A - Login y sesion
Pasos:
1. Ir a /login.
2. Ingresar credenciales validas.
3. Confirmar redireccion.
4. Abrir menu y verificar modulos segun rol.

Criterio de aceptacion:
- Sesion activa.
- Menu correcto.

Evidencia sugerida:
- captura de menu por rol.

### Caso B - Sesion expirada
Pasos:
1. Simular token vencido en localStorage.
2. Refrescar pagina.

Criterio de aceptacion:
- Redireccion a /login.
- Sesion limpia.

### Caso C - Trabajador guarda checklist
Pasos:
1. Login con trabajador.
2. Abrir Home personal.
3. Entrar a detalle de tarea.
4. Marcar 1 item HECHO y 1 BLOQUEADO con nota.
5. Guardar cambios.
6. Reabrir detalle.

Criterio de aceptacion:
- Cambios persistidos.
- Estado de tarea coherente con checklist.

### Caso D - Filtro por propietario
Pasos:
1. Preparar tareas de 2 usuarios.
2. Login como trabajador A.
3. Revisar lista en Home/Tasks/Kanban.

Criterio de aceptacion:
- Solo aparecen tareas del trabajador A.

### Caso E - Reglas por tipo
Pasos:
1. Crear/editar tarea tipo Repaso.
2. Verificar prioridad y hora limite.

Criterio de aceptacion:
- Se aplica BAJA y deadline esperado para Repaso.

## 4) Validacion tecnica minima

Revisar errores en:
- src/components/home/Home.jsx
- src/service/permissions.js
- src/components/taskDetail/TaskDetailPanel.jsx

Revisar red en guardado checklist:
- Debe existir llamada PUT updateTask.
- Si falla API, debe haber fallback local y notificacion.

## 5) Criterios de salida (Definition of Done)

Se considera validado cuando:
1. Todos los casos A-E pasan en ambiente de prueba.
2. No hay errores de compilacion en archivos criticos.
3. No hay fugas de permisos entre roles.
4. Guardado de checklist funciona en backend y fallback local.

## 6) Guia rapida de diagnostico

Sintoma: menu vacio
- Revisar role normalizado en currentUser.

Sintoma: trabajador ve tareas ajenas
- Revisar isTaskOwner y campos de asignacion del backend.

Sintoma: guardar no persiste
- Revisar onSaveChecklist conectado en Home.
- Revisar respuesta de updateTask.
- Revisar updateTaskLocal si API fallo.
