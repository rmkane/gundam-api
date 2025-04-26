import { OpenAPIHono } from '@hono/zod-openapi'
import type { Context } from 'hono'
import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const rootRouter = new OpenAPIHono()

// Root route
rootRouter.get('/', (c: Context) => {
  const html = readFileSync(join(__dirname, '..', 'templates', 'index.html'), 'utf-8')
  return c.html(html)
})

// API root route
rootRouter.get('/api', (c: Context) => {
  return c.json({
    name: 'Gundam API',
    description: 'API for Gundam series, pilots, and mobile suits data',
    versions: {
      v1: {
        status: 'current',
        url: '/api/v1',
        documentation: '/api/v1/docs'
      }
      // When v2 is added in the future:
      // v2: {
      //   status: 'beta',
      //   url: '/api/v2',
      //   documentation: '/api/v2/docs'
      // }
    },
    latestVersion: 'v1',
    defaultVersion: 'v1'
  })
})

// Health check route
rootRouter.get('/health', (c: Context) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})
