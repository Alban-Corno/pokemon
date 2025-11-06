# Stage 1: Build Stage
FROM node:18-alpine as build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Production Stage
FROM nginx:1.21.6-alpine

# Copy built Angular files to Nginx HTML folder
COPY --from=build-stage /app/dist/pokemon_mouille_front/browser /usr/share/nginx/html

# Replace Nginx default port 80 with 8080
RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
