# MEMORIA DE SESIÓN

## Fase 0 - Preparación y verificación del entorno

- Fecha de verificación: 2026-10-17.
- Node.js 24.19.0; npm 11.17.0 (`npm.cmd` funciona, PowerShell bloquea `npm.ps1`); Docker 29.7.2; Docker Compose 5.5.1; Git 2.51.0.windows.2.
- Docker/Compose inicialmente mostraban acceso denegado al leer `C:\Users\Pc\.docker\config.json`; se ejecutaron las acciones autorizadas con acceso al motor.
- Se revisaron contenedores y volúmenes existentes antes de iniciar el servicio del proyecto.

## Fase 1 - Configuración y estructura

- Se creó la estructura inicial para frontend, backend, Prisma y almacenamiento local de portadas.
- Se configuraron Next.js 16.4.2, React 19.3, TypeScript, Tailwind CSS 4, shadcn/ui y Prisma ORM 7.10.1 con adaptador MariaDB/MySQL.
- Se definió `Book` (`id`, `title`, `author`, `cover`) y se generó/aplicó `prisma/migrations/20261017154515_init`.
- Se generó Prisma Client en `prisma/generated/prisma` (no versionado).
- MySQL 8.4 está activo en Docker, host `localhost:3307` hacia puerto interno 3306. El 3306 local no pudo enlazarse; no se encontró un listener y se eligió 3307.
- Se añadió una base shadow dedicada `biblioteca_shadow` con privilegios de migración limitados al usuario `biblioteca`; el único esquema de aplicación sigue siendo la tabla `Book`.
- Se creó `.env` local (ignorado por Git) con valores de desarrollo; `.env.example` refleja las variables y puertos.
- `npm install` instaló 463 paquetes y reportó 7 vulnerabilidades altas. No se ejecutó `npm audit fix` ni otra actualización automática.
- Verificaciones: `docker compose config --quiet`, MySQL responde, `prisma migrate status` informa el esquema actualizado, `next build` pasó y `tsc --noEmit` pasó. No se ejecutaron pruebas de CRUD.
- Fase 1 completada. Fases 2 y 3 siguen pendientes.