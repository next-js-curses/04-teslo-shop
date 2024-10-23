# Descripción
Ecommerce desarrolladon con next js

# Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.template```, renombrarlo a ```.env``` y cambiar las variables del entorno
3. Instalar dependencias ```pnpm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prima migrate dev```
6. Ejecutar seed ```pnpm run seed```
7. Correr el proyecto ```pnpm run dev```


# Correr en prod