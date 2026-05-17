# Manuales de Implementacion - RoomOps Front

Version: 1.0
Fecha: 2026-05-14
Publico: tecnico y no tecnico

## Objetivo de esta carpeta

Esta carpeta reune manuales separados para entender como se implemento el sistema de vistas, autenticacion, sesion, permisos por rol y acciones permitidas.
Cada documento incluye explicacion no tecnica, explicacion tecnica y ejemplos practicos.

Cada manual tiene dos enfoques:
- Explicacion no tecnica: para operacion, jefaturas o personas de negocio.
- Explicacion tecnica: para desarrollo, QA y soporte.

## Mapa de manuales

1. 01_VISTAS_Y_NAVEGACION.md
   - Rutas, estructura de pantalla, menu lateral y visibilidad de vistas.

2. 02_AUTENTICACION_Y_SESION.md
   - Login, token JWT, sesion local, expiracion y cierre de sesion.

3. 03_ROLES_Y_PERMISOS_RBAC.md
   - Matriz de permisos por rol y restricciones de acciones.

4. 04_DASHBOARD_TRABAJADOR.md
   - Dashboard personal del trabajador y logica de datos mostrados.

5. 05_GUARDADO_DE_TAREAS_Y_CHECKLIST.md
   - Como se guardan cambios desde panel de detalle y fallback local.

6. 06_TIPOS_DE_TAREA_Y_REGLAS.md
   - Reglas por tipo de tarea (Aseo, Mantencion, Repaso).

7. 07_PRUEBAS_Y_VALIDACION.md
   - Casos de prueba funcionales y tecnicos para validar todo el flujo.

8. 08_MANUAL_DE_USUARIO.md
   - Manual de uso diario con anexos separados por rol: ADMIN, SUPERVISOR y TRABAJADOR.

9. 09_IMPLEMENTACION_COMPLETA.md
   - Documento tecnico integral con detalles end-to-end y ejemplos de codigo implementado: rutas, sesiones, permisos, graficos, tablas, notificaciones, guardado y fallback.

10. 10_UNION_COMPLETA.md
   - Union de todos los manuales (00 al 09) en un solo documento. Util para lectura integral o cuando se necesita un archivo consolidado.

## Orden recomendado de lectura

1. Primero 01 y 02 para entender flujo base de la aplicacion.
2. Luego 03 para comprender permisos y limites por rol.
3. Despues 04, 05 y 06 para operacion diaria y reglas de negocio.
4. Finalmente 07 para pruebas, QA y soporte.

## Nota importante

Estos manuales describen el estado actual de implementacion del frontend. Si se modifican permisos, rutas o contratos de API, se recomienda actualizar estos documentos en la misma tarea de desarrollo.
