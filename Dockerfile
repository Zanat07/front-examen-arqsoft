# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Set environment variables for build - Direct backend URLs
ARG VITE_AUTH_API_URL=http://localhost:8001
ARG VITE_CALCULATOR_API_URL=http://localhost:8002
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_CALCULATOR_API_URL=$VITE_CALCULATOR_API_URL

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
