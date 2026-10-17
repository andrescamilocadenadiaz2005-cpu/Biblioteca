# TASKS.md - Biblioteca

## Fase 0. Preparación y verificación del entorno

- [ ] Verificar la instalación y disponibilidad de Node.js, npm, Docker y las demás herramientas necesarias.
- [ ] Comprobar las versiones y compatibilidad de las herramientas.
- [ ] Identificar las dependencias que deben instalarse en el proyecto.
- [ ] Solicitar autorización antes de instalar herramientas o dependencias faltantes.
- [ ] Configurar Docker para MySQL y verificar su disponibilidad, con autorización para ejecutar los comandos correspondientes.

## Fase 1. Configuración y estructura del proyecto

- [ ] Crear la estructura de carpetas definida en `ARCHITECTURE.md`.
- [ ] Configurar Next.js, React, TypeScript y Tailwind CSS.
- [ ] Configurar shadcn/ui y los componentes necesarios.
- [ ] Configurar Prisma ORM y la conexión con MySQL.
- [ ] Definir el modelo `Book` con los campos `id`, titulo, `autor` y portada.
- [ ] Configurar las migraciones para crear la tabla de libros.
- [ ] Preparar el almacenamiento local de las portadas.
- [ ] Configurar las variables de entorno y los archivos de configuración necesarios.
- [ ] Verificar la configuración inicial antes de comenzar el CRUD.

## Fase 2. Desarrollo del backend y operaciones CRUD

- [ ] Implementar la consulta y el listado de libros.
- [ ] Implementar el registro de libros y la recepción de imágenes.
- [ ] Implementar la edición de título, autor y portada.
- [ ] Implementar la eliminación de libros y la gestión de sus portadas asociadas.
- [ ] Implementar las validaciones necesarias y el manejo básico de errores.
- [ ] Verificar las operaciones CRUD y su persistencia en MySQL.

## Fase 3. Desarrollo del frontend y verificación final

- [ ] Implementar la vista central del catálogo siguiendo `DESIGN.md`.
- [ ] Mostrar los libros como rectángulos horizontales con portada, título y autor.
- [ ] Implementar el formulario para agregar libros.
- [ ] Implementar la selección de un libro y las acciones de editar y eliminar.
- [ ] Implementar el formulario de edición y la confirmación «¿Estás seguro de editar este libro?».
- [ ] Implementar la confirmación «¿Estás seguro de eliminar {titulo del libro}?» y las acciones de confirmar o cancelar.
- [ ] Conectar la interfaz con el backend.
- [ ] Comprobar el funcionamiento completo del CRUD, incluyendo la carga y sustitución de imágenes.
- [ ] Verificar la coherencia visual con `DESIGN.md` y el cumplimiento de los requisitos del `PRD.md`.
- [ ] Actualizar `README.md` con los requisitos, la configuración y los comandos de ejecución verificados.
- [ ] Actualizar `MEMORY.md` con el estado final del proyecto y los pendientes, si existen.

## Bloqueos y tareas pendientes

Registrar aquí las tareas bloqueadas, los problemas encontrados y las decisiones que requieran aprobación del usuario.
