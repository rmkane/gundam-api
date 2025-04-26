import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// Simple GET route
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to the Gundam API',
    version: '1.0.0'
  })
})

// Health check route
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

const port = process.env.PORT || 3000

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
}) 