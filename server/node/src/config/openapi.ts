export const openApiConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Gundam API v1',
    version: '1.0.0',
    description: 'API for Gundam series, pilots, and mobile suits data',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local development server',
    },
  ],
}
