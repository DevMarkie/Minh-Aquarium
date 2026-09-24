FROM node:20-alpine AS frontend-build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY docs ./docs
COPY scripts ./scripts
COPY --from=frontend-build /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]
