# TASKS.md - Biblioteca

## Fase 0. Preparación y verificación del entorno

- [x] Verificar la instalación y disponibilidad de Node.js, npm, Docker y las demás herramientas necesarias.
- [x] Comprobar las versiones y compatibilidad de las herramientas.
- [x] Identificar las dependencias que deben instalarse en el proyecto.
- [x] Solicitar autorización antes de instalar herramientas o dependencias faltantes.
- [x] Configurar Docker para MySQL y verificar su disponibilidad, con autorización para ejecutar los comandos correspondientes.

## Fase 1. Configuración y estructura del proyecto

- [x] Crear la estructura de carpetas definida en `ARCHITECTURE.md`.
- [x] Configurar Next.js, React, TypeScript y Tailwind CSS.
- [x] Configurar shadcn/ui y los componentes necesarios.
- [x] Configurar Prisma ORM y la conexión con MySQL.
- [x] Definir el modelo `Book` con los campos `id`, titulo, `autor` y portada.
- [x] Configurar las migraciones para crear la tabla de libros.
- [x] Preparar el almacenamiento local de las portadas.
- [x] Configurar las variables de entorno y los archivos de configuración necesarios.
- [x] Verificar la configuración inicial antes de comenzar el CRUD.

## Fase 2. Desarrollo del backend y operaciones CRUD

- [x] Implementar la consulta y el listado de libros.
- [x] Implementar el registro de libros y la recepción de imágenes.
- [x] Implementar la edición de título, autor y portada.
- [x] Implementar la eliminación de libros y la gestión de sus portadas asociadas.
- [x] Implementar las validaciones necesarias y el manejo básico de errores.
- [x] Verificar las operaciones CRUD y su persistencia en MySQL.

## Fase 3. Desarrollo del frontend y verificación final

- [x] Implementar la vista central del catálogo siguiendo `DESIGN.md`.
- [x] Mostrar los libros como rectángulos horizontales con portada, título y autor.
- [x] Implementar el formulario para agregar libros.
- [x] Implementar la selección de un libro y las acciones de editar y eliminar.
- [x] Implementar el formulario de edición y la confirmación «¿Estás seguro de editar este libro?».
- [x] Implementar la confirmación «¿Estás seguro de eliminar {titulo del libro}?» y las acciones de confirmar o cancelar.
- [x] Conectar la interfaz con el backend.
- [x] Comprobar el funcionamiento completo del CRUD, incluyendo la carga y sustitución de imágenes.
- [x] Verificar la coherencia visual con `DESIGN.md` y el cumplimiento de los requisitos del `PRD.md`.
- [x] Actualizar `README.md` con los requisitos, la configuración y los comandos de ejecución verificados.
- [x] Actualizar `MEMORY.md` con el estado final del proyecto y los pendientes, si existen.

## Bloqueos y tareas pendientes

Registrar aquí las tareas bloqueadas, los problemas encontrados y las decisiones que requieran aprobación del usuario.

- MySQL se expone en localhost:3307 porque el puerto 3306 no pudo enlazarse en este entorno.
- npm informó 7 vulnerabilidades de severidad alta durante la instalación; no se ejecutó una actualización automática.
