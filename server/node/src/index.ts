/* eslint-disable no-console */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import { staticContent } from './middleware/static.js'
import { rootRouter } from './routes/root.js'
import { v1Router } from './routes/v1.js'
import { initializeSocket } from './socket.js'

const app = new OpenAPIHono()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors())

// Static files
app.use('/public/*', staticContent())

// Favicon
app.get('/favicon.ico', async (c) => {
  try {
    const file = await readFile(join(process.cwd(), 'public/favicon.ico'))
    return new Response(file, {
      headers: {
        'Content-Type': 'image/x-icon',
      },
    })
  } catch {
    return c.notFound()
  }
})

// Routes
app.route('/', rootRouter)
app.route('/api/v1', v1Router)

// Swagger UI
app.get('/docs', swaggerUI({ url: '/api/v1/openapi.json' }))

// Start server
const port = parseInt(process.env.PORT || '3000', 10)

// Initialize WebSocket server
initializeSocket()

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port),
})
