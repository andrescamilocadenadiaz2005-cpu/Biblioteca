# RULES.md - Biblioteca

## 1. Regla de oro

**No instalar, ejecutar, generar ni modificar nada sin autorización explícita del usuario para la acción correspondiente.**

Esto incluye instalaciones de dependencias, comandos, scripts, aplicaciones, migraciones, generación de datos y modificaciones de archivos. La autorización para una acción no implica autorización para otras acciones distintas.

## 2. Respeto a las instrucciones y al alcance

- Seguir las instrucciones explícitas del usuario y la documentación aprobada.
- No inventar requisitos, funcionalidades, datos ni comportamientos.
- No ampliar el alcance del proyecto por iniciativa propia.
- No implementar funcionalidades ajenas al CRUD de libros.
- Si existe una ambigüedad importante o una contradicción, consultar antes de tomar una decisión que altere lo acordado.

## 3. Tecnologías aprobadas

Utilizar exclusivamente el stack definido en `ARCHITECTURE.md`:

- TypeScript.
- Next.js y React.
- Tailwind CSS y shadcn/ui.
- Node.js y npm.
- MySQL y Prisma ORM.
- Docker.

No incorporar frameworks, librerías, servicios externos ni tecnologías adicionales sin aprobación del usuario.

## 4. Protección de archivos y datos

- Inspeccionar la estructura y los archivos existentes antes de modificarlos.
- No eliminar, sobrescribir ni reemplazar archivos que contengan información o resultados existentes sin autorización.
- No recrear el proyecto desde cero para resolver problemas que puedan solucionarse de forma localizada.
- No modificar configuraciones existentes sin comprobar su propósito y sus posibles consecuencias.
- No eliminar registros ni archivos de imágenes como parte de tareas de limpieza no autorizadas.
- Proteger las credenciales y no incluir secretos en el código, los documentos públicos ni el repositorio.

## 5. Organización del código

- Respetar la estructura de carpetas aprobada en `ARCHITECTURE.md`.
- Mantener separadas la interfaz, la lógica de negocio y el acceso a datos.
- Mantener la lógica del CRUD en los módulos de backend correspondientes.
- Utilizar Prisma para las operaciones con MySQL.
- Evitar duplicar código, crear abstracciones innecesarias o introducir capas que no aporten valor al proyecto.
- No mover ni renombrar archivos sin una razón justificada y la autorización correspondiente cuando afecte a la estructura acordada.

## 6. Reglas del CRUD

- Administrar únicamente libros.
- Respetar los campos definidos: identificador, título, autor y referencia a la portada.
- No permitir que una operación afecte accidentalmente a otros libros.
- Mostrar los cambios realizados en el catálogo.
- No eliminar un libro sin confirmación explícita del usuario dentro de la interfaz.
- Cancelar una operación de edición debe descartar los cambios pendientes.
- Cancelar una eliminación debe conservar el registro y devolver al usuario a la vista anterior.
- No informar de una operación exitosa si realmente ha fallado.

## 7. Gestión de portadas

- Permitir seleccionar archivos de imagen desde el dispositivo del usuario.
- No sustituir la selección de archivos por campos de URL.
- Mantener las referencias de las imágenes coherentes con los registros de MySQL.
- Al editar un libro, conservar la portada actual si no se selecciona otra.
- Al reemplazar una portada, evitar eliminar el archivo anterior antes de comprobar que la actualización se ha completado correctamente.
- Al eliminar un libro, gestionar su archivo asociado sin afectar a las portadas de otros libros.
- No añadir servicios externos de almacenamiento sin autorización.
- No aceptar archivos arbitrarios como si fueran imágenes válidas; aplicar comprobaciones básicas de tipo y tamaño una vez definidos sus límites.

## 8. Base de datos y Prisma

- Mantener una única tabla de libros, salvo aprobación expresa de un cambio.
- Definir el modelo y las migraciones dentro del proyecto.
- No modificar ni eliminar datos existentes durante migraciones sin autorización.
- No utilizar comandos destructivos de Prisma sin aprobación explícita.
- No recrear la base de datos para solucionar errores sin investigar primero la causa.
- Mantener coherencia entre el esquema de Prisma, la tabla MySQL y el código que utiliza sus datos.
- No generar registros de prueba ni datos iniciales sin autorización.

## 9. Diseño e interfaz

- Respetar `DESIGN.md` y sus especificaciones visuales.
- Utilizar fondo negro, detalles dorados y Times New Roman.
- Mantener el listado de libros en rectángulos horizontales con portada, título y autor.
- Conservar una única vista central para el catálogo.
- Mostrar las acciones de edición y eliminación correspondientes al libro seleccionado.
- Mantener los mensajes de confirmación definidos en la documentación.
- No agregar páginas, menús, animaciones ni funcionalidades visuales que no hayan sido solicitados.
- Priorizar una interfaz clara, consistente y funcional.

## 10. Validación y errores

- Comprobar que los datos recibidos sean adecuados antes de guardarlos.
- Mostrar mensajes comprensibles cuando una operación falle.
- Gestionar los errores de base de datos y de almacenamiento de imágenes sin exponer credenciales ni detalles sensibles.
- No añadir sistemas complejos de reintentos, recuperación o manejo de errores que no sean necesarios para este proyecto.
- No ocultar errores ni simular resultados exitosos.

## 11. Gestión de tareas y memoria

- Consultar `TASKS.md` antes de comenzar una tarea de implementación.
- Trabajar únicamente en tareas autorizadas.
- Actualizar `TASKS.md` cuando cambie el estado real de una tarea.
- Actualizar `MEMORY.md` después de avances importantes y antes de finalizar una sesión de trabajo.
- Registrar en `DECISIONS.md` las decisiones importantes que hayan sido aprobadas.
- No marcar tareas como completadas sin evidencia de su finalización.
- No modificar los requisitos aprobados para hacer coincidir la documentación con una implementación incorrecta.

## 12. Gestión de cambios

- Solicitar aprobación antes de cambiar el stack, la arquitectura, el alcance o una decisión previamente aprobada.
- Explicar brevemente el motivo de un cambio propuesto y sus consecuencias.
- No asumir que una sugerencia del agente ha sido aceptada.
- Si una instrucción nueva contradice una decisión anterior, aclarar el conflicto antes de realizar cambios importantes.
- Mantener actualizados los documentos afectados cuando el usuario apruebe un cambio.

## 13. Verificación y entrega

- No afirmar que el proyecto funciona si no se ha comprobado.
- Diferenciar las verificaciones realizadas de las pendientes.
- No ejecutar pruebas, instalaciones, compilaciones ni comandos sin la autorización correspondiente.
- Documentar los problemas pendientes y las limitaciones conocidas.
- Respetar los criterios de aceptación del `PRD.md`.
- Mantener `README.md` actualizado con las instrucciones de instalación y ejecución que hayan sido verificadas.

## 14. Principio de simplicidad

Implementar únicamente lo necesario para cumplir los requisitos aprobados.

No añadir funcionalidades, dependencias, patrones arquitectónicos, validaciones excesivas ni mecanismos de recuperación por iniciativa propia. Ante varias soluciones válidas, preferir la más sencilla que respete la arquitectura y los requisitos del proyecto.