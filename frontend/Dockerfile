# Production Dockerfile
FROM node:18-slim
WORKDIR /frontend_app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]