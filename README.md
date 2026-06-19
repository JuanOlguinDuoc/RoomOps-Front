### Descripción del Frontend (Client-Side)

La capa Frontend de **RoomsOps** es una aplicación de página única (SPA) diseñada específicamente para digitalizar y optimizar la experiencia de usuario (UX) en terreno de los operarios de limpieza y administradores hoteleros. 

El desarrollo se rige bajo los siguientes pilares de arquitectura:

* **Enfoque Responsive orientado a movilidad:** La interfaz prioriza la usabilidad en dispositivos móviles mediante estilos adaptativos y componentes optimizados para operación en terreno, permitiendo la actualización ágil de tareas desde habitaciones y zonas de servicio.
* **Operación visual e interactiva:** Implementa un tablero Kanban dinámico con la librería `@dnd-kit`, habilitando la gestión de tareas mediante acciones de arrastrar y soltar entre estados operativos (Pendiente, En Progreso, Hecho y Bloqueado).
* **Comunicación asíncrona por entorno:** El consumo de API se realiza con Axios sobre una URL base configurable por entorno, utilizando HTTPS en despliegues de producción y AWS, y HTTP en entorno local de desarrollo.
* **Feedback reactivo inmediato:** Incorpora mecanismos de retroalimentación visual para eventos de éxito, validación y error mediante React-Toastify y SweetAlert2, junto con control de sesión ante respuestas no autorizadas (401), mejorando la trazabilidad de cada acción del usuario.

### Tecnologías de Frontend Utilizadas

* **React (19.2.4):** Construcción de componentes y vistas reactivas.
* **React DOM (19.2.4):** Renderizado de la aplicación en el navegador.
* **Vite (8.0.4):** Entorno de desarrollo rápido y build de producción.
* **CoreUI React (5.10.0):** Componentes UI para panel administrativo.
* **CoreUI CSS (5.6.1):** Base visual complementaria del sistema de componentes.
* **Bootstrap (5.3.8):** Utilidades de layout y estilos responsivos.
* **React Router DOM (7.14.1):** Navegación y control de rutas protegidas.
* **Axios (1.15.1):** Consumo de API REST y manejo de cabeceras de autenticación.
* **@dnd-kit/core (6.3.1):** Motor principal de drag and drop.
* **@dnd-kit/sortable (10.0.0):** Utilidades para ordenamiento y comportamiento de listas drag and drop.
* **@dnd-kit/utilities (3.2.2):** Helpers de transformación y utilidades visuales para drag and drop.
* **SweetAlert2 (11.26.24):** Modales de confirmación y alertas contextuales.
* **React-Toastify (11.1.0):** Notificaciones tipo toast para feedback inmediato.
* **Lucide React (1.11.0):** Iconografía moderna y consistente.
* **CoreUI Icons (3.1.0) y CoreUI Icons React (2.3.0):** Iconografía adicional para navegación y acciones administrativas.