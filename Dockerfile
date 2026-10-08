# Dockerfile para Small-projects: Gateway unificado en Node.js + PHP CLI
FROM node:20-alpine

# Instalar intérprete PHP para procesar scripts .php del gateway
RUN apk add --no-cache php php-cli

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias de Node.js e instalar
COPY package*.json ./
RUN npm install --omit=dev

# Copiar el contenido del monorepo
COPY . .

# Configurar puerto unificado
ENV PORT=8000
EXPOSE 8000

# Verificación de salud del contenedor para Dokploy/Docker
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8000/health || exit 1

# Iniciar servidor gateway unificado
CMD ["npm", "start"]
