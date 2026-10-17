# ARCHITECTURE.md - Biblioteca

## 1. Resumen

Biblioteca será una aplicación web organizada por responsabilidades, con una interfaz desarrollada en Next.js, lógica de servidor en TypeScript y persistencia en MySQL mediante Prisma ORM.

## 2. Tecnologías

- **Lenguaje:** TypeScript.
- **Frontend:** Next.js, React, Tailwind CSS y shadcn/ui.
- **Backend:** Node.js, utilizando las capacidades de servidor y los Route Handlers de Next.js.
- **Base de datos:** MySQL.
- **ORM:** Prisma.
- **Gestión de paquetes:** npm.
- **Entorno:** Docker.

No se incorporarán tecnologías adicionales sin aprobación del usuario.

## 3. Estructura del proyecto

```text
Biblioteca/
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   └── books/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   └── books/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── services/
│   │   └── books.service.ts
│   ├── repositories/
│   │   └── books.repository.ts
│   ├── lib/
│   │   └── prisma.ts
│   └── storage/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── storage/
│   └── covers/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── README.md
└── tsconfig.json
```

La estructura es una propuesta inicial y podrá ajustarse a las convenciones reales del stack durante la implementación, sin cambiar las tecnologías ni las responsabilidades acordadas.

## 4. Responsabilidades

**Frontend**

- Mostrar el catálogo de libros.
- Presentar los formularios de registro y edición.
- Permitir seleccionar archivos de imagen.
- Solicitar confirmación antes de eliminar un libro.
- Actualizar la vista después de las operaciones CRUD.

**Backend**

- Gestionar las operaciones CRUD.
- Validar los datos recibidos.
- Coordinar el acceso a la base de datos mediante Prisma.
- Gestionar el almacenamiento y la recuperación de las portadas.

**Base de datos**

Se utilizará una única tabla `Book` con los siguientes campos:

- `id`: identificador único.
- título: título del libro.
- `au`tor: autor del libro.
- portada: referencia a la imagen almacenada.

El identificador será generado automáticamente. Los campos de título y autor almacenarán texto, mientras que `cover` almacenará la referencia a la portada, no el archivo binario.

## 5. Comunicación entre componentes

El frontend enviará solicitudes a los Route Handlers de Next.js. Estos delegarán las operaciones al código del backend, que utilizará Prisma para consultar o modificar MySQL.

Las operaciones disponibles serán:

- `GET /api/books`: listar los libros.
- `POST /api/books`: agregar un libro.
- `GET /api/books/[id]`: consultar un libro por identificador.
- `PUT /api/books/[id]`: editar un libro.
- `DELETE /api/books/[id]`: eliminar un libro.

La selección de portadas requerirá gestionar la recepción y el almacenamiento de archivos, además de guardar su referencia en la base de datos.

## 6. Base de datos y almacenamiento

Prisma definirá el modelo de datos y las migraciones necesarias para crear la tabla.

Las portadas se almacenarán como archivos, separados de los registros de MySQL. Se utilizará almacenamiento local administrado por la aplicación, sin contratar servicios externos.

Las operaciones de edición y eliminación deberán mantener coherentes los registros y sus archivos asociados, evitando dejar archivos sin utilizar.

## 7. Entorno y configuración

Docker se utilizará para gestionar el servicio MySQL mediante `docker-compose.yml`.

Las credenciales y configuraciones sensibles se definirán mediante variables de entorno. `.env.example` contendrá únicamente nombres y ejemplos no sensibles.

Las dependencias, la configuración de Prisma, las migraciones y los comandos de ejecución se documentarán en los archivos correspondientes del proyecto.

## 8. Restricciones arquitectónicas

- Mantener una única tabla de libros.
- Separar interfaz, lógica de negocio y acceso a datos.
- No introducir un framework de backend adicional.
- No añadir servicios externos de almacenamiento.
- No agregar módulos ni funcionalidades ajenos al CRUD.
- Definir las migraciones y los datos iniciales dentro del proyecto cuando correspondan.
- No instalar, ejecutar ni generar archivos o datos sin la autorización requerida.

## 9. Verificación

La implementación deberá comprobar las operaciones CRUD, la persistencia en MySQL, la carga y sustitución de portadas y la eliminación de archivos asociados cuando corresponda.

La estructura y los comandos definitivos se verificarán durante la fase de preparación del entorno.
