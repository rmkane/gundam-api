import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import seriesRouter from './routes/series.js'
import pilotsRouter from './routes/pilots.js'
import mobileSuitsRouter from './routes/mobile-suits.js'

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

// API routes
app.route('/api/series', seriesRouter)
app.route('/api/pilots', pilotsRouter)
app.route('/api/mobile-suits', mobileSuitsRouter)

const port = process.env.PORT || 3000

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
}) 
