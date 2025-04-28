# Gundam Client

A modern Vue 3 client application for the Gundam API, built with TypeScript and Vite.

## Tech Stack

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Pinia](https://pinia.vuejs.org/) - State management
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- [AG Grid](https://www.ag-grid.com/) - Data grid component
- [Socket.IO Client](https://socket.io/) - Real-time communication

## Project Structure

```none
.
├── src/              # Source files
│   ├── assets/       # Static assets
│   ├── components/   # Vue components
│   ├── views/        # Page components
│   ├── router/       # Route definitions
│   ├── stores/       # Pinia stores
│   └── types/        # TypeScript types
├── public/           # Public static files
└── scripts/          # Build and utility scripts
```

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   pnpm generate-env
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Build for production:

   ```bash
   pnpm build
   ```

5. Preview production build:

   ```bash
   pnpm preview
   ```

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run linter
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Format code
- `pnpm format:check` - Check code formatting

### Docker Support

The project includes Docker support for containerized deployment. To build and run the Docker container:

```bash
# Build the image
docker build -t gundam-client .

# Run the container
docker run -p 80:80 gundam-client
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](../../LICENSE) file for details.
