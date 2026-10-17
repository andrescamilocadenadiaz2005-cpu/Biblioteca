# Biblioteca

Aplicación local para consultar y administrar libros con título, autor y portada.

## Requisitos

- Node.js 24 o posterior y npm.
- Docker Desktop con Docker Compose.

## Configuración local

Desde la raíz del proyecto, copia `.env.example` como `.env` y luego instala las dependencias:

```powershell
Copy-Item .env.example .env
npm install
```

Inicia MySQL y prepara Prisma:

```powershell
docker compose up -d mysql
npm run prisma:generate
npm run prisma:migrate -- --name init
```

El contenedor publica MySQL en `localhost:3307`. La configuración también crea una base de datos shadow dedicada para las migraciones de desarrollo.

Ejecuta la aplicación:

```powershell
npm run dev
```

Abre `http://localhost:3000` en el navegador. Para generar una compilación de producción, usa `npm run build`; para servir esa compilación, ejecuta `npm run start`.

## Portadas

Las portadas se seleccionan como archivos JPG, PNG, GIF o WebP de hasta 5 MB. Se guardan localmente en `storage/covers/`; la base de datos almacena la referencia del archivo.
