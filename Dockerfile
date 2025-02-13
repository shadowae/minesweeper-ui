
    FROM node:18-alpine AS builder
    WORKDIR /app

    COPY package*.json ./
    RUN npm install

    COPY . .
    RUN npm run build


    FROM node:18-alpine
    WORKDIR /app

    COPY --from=builder /app/dist ./dist

    RUN npm install -g serve

    EXPOSE 8080

    # Start the static file server on port 8080
    CMD ["serve", "-s", "dist", "-l", "8080"]
