# Gundam API

A modern API for Gundam data, built with Node.js and Hono.

## Project Structure

```none
.
├── assets/           # Static assets and documentation
├── client/           # Client application
│   └── vue/         # Vue.js frontend
├── server/          # Server application
│   └── node/        # Node.js API server
│       └── src/
│           ├── routes/     # API endpoints
│           ├── services/   # Business logic
│           ├── schemas/    # Data validation
│           └── db/         # Database schema
├── sql/             # SQL scripts and migrations
├── docker-compose.yml  # Docker compose configuration
└── Makefile         # Build and development commands
```

## Server

The server is a Node.js application built with:

- [Hono](https://hono.dev/) - Fast, lightweight web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Zod](https://zod.dev/) - Schema validation
- [TypeScript](https://www.typescriptlang.org/) - Type safety

### Features

- RESTful API endpoints
- OpenAPI/Swagger documentation
- Type-safe database operations
- Request validation
- Error handling
- Soft deletion
- Timestamp tracking

### Getting Started

1. Install dependencies:

   ```bash
   cd server/node
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Access the API documentation:

   > <http://localhost:3000/docs>

## Client

The client is a Vue 3 application built with:

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Pinia](https://pinia.vuejs.org/) - State management
- [Vue Router](https://router.vuejs.org/) - Official router
- [AG Grid](https://www.ag-grid.com/) - Data grid component

See the [client README](client/vue/README.md) for detailed setup instructions.

## Development

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm 8+
- Docker and Docker Compose (for containerized development)

### Quick Start

1. Clone the repository
2. Copy environment files:
   ```bash
   cp server/node/.env.example server/node/.env
   cp client/vue/.env.example client/vue/.env
   ```
3. Start the development environment:
   ```bash
   make dev
   ```

### Available Commands

- `make dev` - Start development environment
- `make build` - Build all components
- `make test` - Run tests
- `make lint` - Run linter
- `make format` - Format code
- `make db:generate` - Generate database migrations
- `make db:push` - Push database changes

### Docker Support

The project includes Docker support for both development and production. Use `docker-compose.yml` for local development:

```bash
docker-compose up -d
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
