# Gundam API

A simple API built with Hono and TypeScript.

## Setup

1. Install pnpm (if not already installed):

    ```bash
    npm install -g pnpm
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Set up environment variables:

    ```bash
    # Generate the initial .env file with default values
    ./scripts/generate-env.sh

    # Review and modify the .env file as needed
    ```

4. Development mode:

    ```bash
    pnpm dev
    ```

5. Build for production:

    ```bash
    pnpm build
    ```

6. Start production server:

    ```bash
    pnpm start
    ```

## Database Migrations

Before running any Drizzle migration commands, you must:

1. Generate the initial `.env` file using the script above
2. Build the project to compile TypeScript files:

    ```bash
    pnpm build
    ```

Then you can run the migration commands:

```bash
# Generate migration files
pnpm db:generate

# Push migrations to the database
pnpm db:push
```

## Available Routes

- `GET /`: Welcome message
- `GET /health`: Health check endpoint

## Development

The server will automatically restart when you make changes to the source code in development mode.
