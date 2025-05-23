import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { Context } from 'hono'
import { z } from 'zod'

import {
  CreateSeriesResponseSchema,
  CreateSeriesSchema,
  SeriesListResponseSchema,
  SeriesResponseSchema,
  UpdateSeriesResponseSchema,
  UpdateSeriesSchema,
} from '../schemas/index.js'
import { BooleanParamSchema, NumberParamSchema } from '../schemas/request/query.js'
import {
  BadRequestResponseSchema,
  GoneResponseSchema,
  InternalServerErrorResponseSchema,
  NotFoundResponseSchema,
} from '../schemas/response/error.js'
import * as seriesService from '../services/series.js'

const router = new OpenAPIHono()

// Route definitions
const getSeriesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Series'],
  description: 'Get all series',
  request: {
    query: z.object({
      includeDeleted: BooleanParamSchema.optional().describe(
        'Include deleted series in the response'
      ),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SeriesListResponseSchema,
        },
      },
      description: 'List of all series',
    },
  },
})

const getSeriesByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Series'],
  description: 'Get a series by ID',
  request: {
    params: z.object({
      id: NumberParamSchema,
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SeriesResponseSchema,
        },
      },
      description: 'Series found',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema,
        },
      },
      description: 'Series not found',
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema,
        },
      },
      description: 'Series has been deleted',
    },
  },
})

const createSeriesRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Series'],
  description: 'Create a new series',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateSeriesSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: CreateSeriesResponseSchema,
        },
      },
      description: 'Series created successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: BadRequestResponseSchema,
        },
      },
      description: 'Invalid request body',
    },
    500: {
      content: {
        'application/json': {
          schema: InternalServerErrorResponseSchema,
        },
      },
      description: 'Internal server error',
    },
  },
})

const updateSeriesRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['Series'],
  description: 'Update a series',
  request: {
    params: z.object({
      id: NumberParamSchema,
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateSeriesSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UpdateSeriesResponseSchema,
        },
      },
      description: 'Series updated successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: BadRequestResponseSchema,
        },
      },
      description: 'Invalid request body',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema,
        },
      },
      description: 'Series not found',
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema,
        },
      },
      description: 'Series has been deleted',
    },
  },
})

const deleteSeriesRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Series'],
  description: 'Delete a series (soft delete)',
  request: {
    params: z.object({
      id: NumberParamSchema,
    }),
  },
  responses: {
    204: {
      description: 'Series deleted successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema,
        },
      },
      description: 'Series not found',
    },
  },
})

// Controllers
const getSeriesController = async (c: Context) => {
  const includeDeleted = c.req.query('includeDeleted') === 'true'
  const series = await seriesService.getSeries(includeDeleted)
  return c.json({ data: series, meta: { page: 1, pageSize: 10, total: series.length } }, 200)
}

const getSeriesByIdController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const result = await seriesService.getSeriesById(id)

  if (result.error) {
    return c.json({ error: result.error }, result.status as 404 | 410)
  }

  if (!result.data) {
    return c.json({ error: 'Series not found' }, 404)
  }

  return c.json(
    {
      data: result.data,
      meta: {
        id: result.data.id,
        createdAt: result.data.createdAt,
        updatedAt: result.data.updatedAt,
      },
    },
    200
  )
}

const createSeriesController = async (c: Context) => {
  const body = await c.req.json()
  const result = await seriesService.createSeries(body)

  if (result.error) {
    return c.json({ error: result.error }, 400)
  }

  if (!result.data) {
    return c.json({ error: 'Failed to create series' }, 500)
  }

  return c.json({ data: result.data, meta: { createdAt: result.data.createdAt } }, 201, {
    Location: `/api/v1/series/${result.data.id}`,
  })
}

const updateSeriesController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const result = await seriesService.updateSeries(id, body)

  if (result.error) {
    return c.json({ error: result.error }, result.status as 400 | 404 | 410)
  }

  if (!result.data) {
    return c.json({ error: 'Series not found' }, 404)
  }

  return c.json(
    {
      data: result.data,
      meta: { updatedAt: result.data.updatedAt },
    },
    200
  )
}

const deleteSeriesController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const result = await seriesService.deleteSeries(id)

  if (result.error) {
    return c.json({ error: result.error }, 404)
  }

  if (!result.data) {
    return c.json({ error: 'Series not found' }, 404)
  }

  return new Response(null, { status: 204 })
}

// Route handlers
router.openapi(getSeriesRoute, getSeriesController)
router.openapi(getSeriesByIdRoute, getSeriesByIdController)
router.openapi(createSeriesRoute, createSeriesController)
router.openapi(updateSeriesRoute, updateSeriesController)
router.openapi(deleteSeriesRoute, deleteSeriesController)

export default router
