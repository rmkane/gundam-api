import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import type { Context } from 'hono'

import { openApiConfig } from '../config/openapi.js'

import mobileSuitsRouter from './mobile-suits.js'
import pilotsRouter from './pilots.js'
import seriesRouter from './series.js'

export const v1Router = new OpenAPIHono()

// V1 API root route
v1Router.get('/', (c: Context) => {
  return c.json({
    version: '1.0.0',
    description: 'Gundam API v1 endpoints',
    documentation: '/api/v1/docs',
    endpoints: {
      series: '/api/v1/series',
      pilots: '/api/v1/pilots',
      mobileSuits: '/api/v1/mobile-suits',
    },
  })
})

// Swagger UI for v1
v1Router.get('/docs', swaggerUI({ url: '/api/v1/doc' }))

// OpenAPI documentation for v1
v1Router.doc('/doc', openApiConfig)

// Add routes to v1 router
v1Router.route('/series', seriesRouter)
v1Router.route('/pilots', pilotsRouter)
v1Router.route('/mobile-suits', mobileSuitsRouter)
