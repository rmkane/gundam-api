FROM node:23-slim

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the application in development mode
CMD ["pnpm", "dev", "--host"] 
