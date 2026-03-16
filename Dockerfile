# Etapa de construcción
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración del proyecto
COPY package.json yarn.lock* ./

# Instalar dependencias
RUN yarn install --frozen-lockfile --production=false

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN yarn build

# Etapa de producción
FROM nginx:alpine AS production

# Copiar el archivo de configuración de nginx personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
