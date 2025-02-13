# ----- Stage 1: Build the Application -----
    FROM node:18-alpine AS builder

    # Set the working directory
    WORKDIR /app

    # Copy package files and install dependencies (cache-friendly)
    COPY package*.json ./
    RUN npm install

    # Copy the rest of your source code
    COPY . .

    # Build the project using your build script (adjust if necessary)
    RUN npm run build

    # ----- Stage 2: Serve the Application using Node.js -----
    FROM node:18-alpine

    # Set the working directory in the production image
    WORKDIR /app

    # Copy the build output from the builder stage (assuming output is in "dist")
    COPY --from=builder /app/dist ./dist

    # Install a lightweight static file server globally.
    # "serve" is a popular option for serving static sites.
    RUN npm install -g serve

    # Expose port 8080 (or any port you prefer)
    EXPOSE 8080

    # Start the static file server on port 8080
    CMD ["serve", "-s", "dist", "-l", "8080"]