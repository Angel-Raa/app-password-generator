# Generador de Contraseñas — Documentación e Instalación

Este proyecto es una aplicación web para generar contraseñas seguras, desarrollada con las siguientes tecnologías:

- **Next.js**: Framework de React para aplicaciones web modernas.
- **Prisma**: ORM para la gestión de bases de datos.
- **TanStack Query**: Manejo eficiente de datos asíncronos y caché.
- **Tailwind CSS**: Framework de utilidades CSS para estilos rápidos y responsivos.
- **shadcn/ui**: Componentes UI accesibles y personalizables.

## Requisitos previos

- Node.js (v18 o superior) o Bun.js
- Bun o npm
- Acceso a una base de datos compatible con Prisma (por ejemplo: PostgreSQL, MySQL, SQLite)

## Instalación

1. **Clonar el repositorio**

    \`\`\`bash
    git clone https://github.com/Angel-Raa/app-password-generator.git
    cd app-password-generator
    \`\`\`

2. **Instalar dependencias**

    \`\`\`bash
    bun install
    # o
    npm install
    \`\`\`

3. **Configurar variables de entorno**

    - Copia el archivo `.env.example` a `.env` y configura las variables necesarias, especialmente la conexión de base de datos para Prisma.

4. **Configurar la base de datos con Prisma**

    \`\`\`bash
    bunx prisma migrate dev --name init
    # o
    npx prisma migrate dev --name init
    \`\`\`

5. **Ejecutar el proyecto en modo desarrollo**

    \`\`\`bash
    bun run dev
    # o
    npm run dev
    \`\`\`

6. **Acceder a la aplicación**

    - Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## Recursos adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
