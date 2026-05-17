# Manual 06 - Tipos de Tarea y Reglas de Negocio

Version: 1.1

## 1) Explicacion no tecnica

### Para que sirve
Estandariza la operacion para que el equipo no decida prioridad y urgencia de forma distinta cada dia.

### Reglas actuales
- Mantencion: prioridad ALTA.
- Aseo: prioridad MEDIA y hora limite definida por flujo de trabajo.
- Repaso: prioridad BAJA y hora limite 16:00.

### Ejemplo no tecnico
Si se crean dos tareas el mismo dia:
- "Fuga de agua" (Mantencion)
- "Repaso final" (Repaso)

La primera debe aparecer con mayor urgencia para ejecucion.

## 2) Explicacion tecnica

### Archivo de reglas base
src/components/task/TaskFunctions.jsx

Funcion central:
- getPriorityByType(type)

Mapeo:
- mantencion -> ALTA
- aseo -> MEDIA
- repaso -> BAJA

### Archivo de presentacion/urgencia
src/components/home/Home.jsx

Funciones:
- getTaskTypeLabel(task)
- getTaskDeadlineTime(task)
- getTaskPriorityKey(task)
- isTaskOverdue(task, statusById)

Estas funciones afectan:
- badge mostrado
- orden de tarea urgente
- indicador ATRASADA

## 3) Ejemplo tecnico guiado

Entrada:
```json
{
	"tipo": "Repaso",
	"fecha": "2026-05-14"
}
```

Resolucion esperada:
- prioridad calculada: BAJA
- dueTime sugerido para repaso: 16:00

Salida visual:
- badge de prioridad BAJA
- hora limite visible en tarjeta/panel

## 4) Dato importante de consistencia

Actualmente hay reglas en frontend para mostrar y ordenar.
Para consistencia completa entre clientes (web, mobile, integraciones), la recomendacion es validar tambien en backend:
- tipo valido
- prioridad coherente
- hora limite por tipo

## 5) Guia para agregar un nuevo tipo

Supongamos nuevo tipo: "Inspeccion".

Pasos:
1. Agregar opcion en formularios de creacion y edicion.
2. Definir prioridad en getPriorityByType.
3. Definir hora limite en getTaskDeadlineTime.
4. Verificar labels en getTaskTypeLabel/getTaskPriorityKey.
5. Probar filtro, badges y orden de urgencia.
6. Documentar regla en este manual.

## 6) Casos de prueba minimos

1. Crear tarea de cada tipo y validar prioridad asignada.
2. Validar hora limite renderizada por tipo.
3. Confirmar que tarea con hora vencida marque ATRASADA.
4. Confirmar que tipo nuevo no rompe filtros ni formularios.
