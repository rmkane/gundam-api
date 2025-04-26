# Gundam API

A modern API for Gundam data, built with Node.js and Hono.

## Project Structure

```none
.
├── server/
│   └── node/           # Node.js API server
│       └── src/
│           ├── routes/     # API endpoints
│           ├── services/   # Business logic
│           ├── schemas/    # Data validation
│           └── db/         # Database schema
└── client/            # Client application (in development)
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

A client application is currently in development. It will provide a user interface for interacting with the API.

## Development

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm 8+

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter
- `pnpm format` - Format code
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push database changes

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
