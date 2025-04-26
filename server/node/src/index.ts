import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { rootRouter } from './routes/root.js'
import { v1Router } from './routes/v1.js'

const app = new OpenAPIHono()

// Mount root routes
app.route('/', rootRouter)

// Mount v1 router
app.route('/api/v1', v1Router)

const port = process.env.PORT || 3000

// eslint-disable-next-line no-console
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})
