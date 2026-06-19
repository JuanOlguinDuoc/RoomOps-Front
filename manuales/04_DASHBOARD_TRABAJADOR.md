# Manual 04 - Dashboard del Trabajador

Version: 1.1

## 1) Explicacion no tecnica

### Objetivo
Mostrar al trabajador solo informacion accionable para su jornada.

### Que incluye
- Resumen rapido de carga diaria.
- Tarea mas urgente.
- Progreso del dia.
- Lista de tareas recientes.
- Accesos directos a modulos operativos.

### Ejemplo no tecnico
Escenario de inicio de turno:
- Marta abre la app a las 08:00.
- Ve 3 pendientes, 1 en progreso, 0 hechas hoy.
- El panel le muestra como urgente una tarea Aseo con fecha de hoy.

Resultado:
- Marta no necesita revisar listas largas.
- Sabe de inmediato por cual tarea comenzar.

## 2) Explicacion tecnica

### Archivo principal
src/components/home/Home.jsx

### Decision de vista
Home evalua canViewAdminDashboard():
- true -> dashboard administrativo
- false -> WorkerDashboard

### Dataset base de WorkerDashboard
Se cargan en paralelo:
- getTasks()
- getApartments()
- getStatuses()

Luego:
- myTasks = filterTasksByPermissions(tasks)

Con esto, el trabajador nunca consume una lista global en pantalla.

## 3) Metricas y como se calculan

### Pendientes
Cuenta tareas cuyo estado normalizado es pending.

### En progreso
Cuenta tareas cuyo estado normalizado es in-progress.

### Hechas hoy
Cuenta tareas en done cuya fecha coincide con el dia actual.

### Progreso diario
Formula:
```text
progressPercent = round((completedCount / totalMyTasks) * 100)
```

### Tarea urgente
Se busca entre pending + in-progress y se ordena por:
- fecha
- hora limite

La primera del orden se muestra como "Proxima tarea urgente".

## 4) Ejemplo tecnico con datos

Entrada filtrada del trabajador:
```json
[
	{"id": 1, "titulo": "Aseo apto 301", "fecha": "2026-05-14", "dueTime": "16:00", "statusId": 1},
	{"id": 2, "titulo": "Repaso apto 204", "fecha": "2026-05-14", "dueTime": "16:00", "statusId": 2},
	{"id": 3, "titulo": "Mantencion apto 101", "fecha": "2026-05-13", "dueTime": "15:00", "statusId": 3}
]
```

Salida visual esperada:
- Pendientes: 1
- En progreso: 1
- Hechas hoy: 0
- Progreso: 33%
- Urgente: Aseo apto 301

## 5) Interaccion de detalle

Al hacer click en tarea:
- se abre TaskDetailPanel
- se muestran apartamento, asignado, fecha, hora limite, checklist

Los mapas apartmentNameById y statusNameById se pasan ya convertidos a texto para evitar errores de render.

## 6) UX aplicada

- Loading state explicito: "Cargando tus tareas..."
- Badges de tipo/prioridad/estado
- Indicador ATRASADA cuando vence fecha+hora
- Accion clara: boton "Ver detalle"

## 7) Mantenimiento y evolucion

Si agregas una metrica nueva:
1. Crear calculo con useMemo.
2. Agregar tarjeta visual.
3. Validar impacto en mobile.
4. Probar con tareas vacias y con alto volumen.
