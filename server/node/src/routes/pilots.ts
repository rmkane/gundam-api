import { OpenAPIHono } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { Context } from 'hono'
import { z } from 'zod'

import {
  CreatePilotResponseSchema,
  CreatePilotSchema,
  PilotListResponseSchema,
  PilotResponseSchema,
  UpdatePilotResponseSchema,
  UpdatePilotSchema,
} from '../schemas/index.js'
import {
  BadRequestResponseSchema,
  GoneResponseSchema,
  InternalServerErrorResponseSchema,
  NotFoundResponseSchema,
} from '../schemas/responses.js'
import * as pilotService from '../services/pilot.js'

const router = new OpenAPIHono()

// Route definitions
const getPilotsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Pilots'],
  description: 'Get all pilots',
  request: {
    query: z.object({
      seriesId: z.string().transform(Number).optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PilotListResponseSchema,
        },
      },
      description: 'List of all pilots',
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

const getPilotByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Pilots'],
  description: 'Get a pilot by ID',
  request: {
    params: z.object({
      id: z.string().transform(Number),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PilotResponseSchema,
        },
      },
      description: 'Pilot found',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema,
        },
      },
      description: 'Pilot not found',
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema,
        },
      },
      description: 'Pilot has been deleted',
    },
  },
})

const createPilotRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Pilots'],
  description: 'Create a new pilot',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreatePilotSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: CreatePilotResponseSchema,
        },
      },
      description: 'Pilot created successfully',
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

const updatePilotRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['Pilots'],
  description: 'Update a pilot',
  request: {
    params: z.object({
      id: z.string().transform(Number),
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdatePilotSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UpdatePilotResponseSchema,
        },
      },
      description: 'Pilot updated successfully',
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
      description: 'Pilot not found',
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema,
        },
      },
      description: 'Pilot has been deleted',
    },
  },
})

const deletePilotRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Pilots'],
  description: 'Delete a pilot (soft delete)',
  request: {
    params: z.object({
      id: z.string().transform(Number),
    }),
  },
  responses: {
    204: {
      description: 'Pilot deleted successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema,
        },
      },
      description: 'Pilot not found',
    },
  },
})

// Controllers
const getPilotsController = async (c: Context) => {
  const seriesId = c.req.query('seriesId')
  const result = await pilotService.getPilots(seriesId ? Number(seriesId) : undefined)

  if (result.error) {
    return c.json({ error: result.error }, result.status as 404)
  }

  if (!result.data) {
    return c.json({ error: 'No pilots found' }, 404)
  }

  return c.json(
    { data: result.data, meta: { page: 1, pageSize: 10, total: result.data.length } },
    200
  )
}

const getPilotByIdController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const result = await pilotService.getPilotById(id)

  if (result.error) {
    return c.json({ error: result.error }, result.status as 404 | 410)
  }

  if (!result.data) {
    return c.json({ error: 'Pilot not found' }, 404)
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

const createPilotController = async (c: Context) => {
  const body = await c.req.json()
  const result = await pilotService.createPilot(body)

  if (result.error) {
    return c.json({ error: result.error }, 400)
  }

  if (!result.data) {
    return c.json({ error: 'Failed to create pilot' }, 500)
  }

  return c.json({ data: result.data, meta: { createdAt: result.data.createdAt } }, 201, {
    Location: `/api/v1/pilots/${result.data.id}`,
  })
}

const updatePilotController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const result = await pilotService.updatePilot(id, body)

  if (result.error) {
    return c.json({ error: result.error }, result.status as 400 | 404 | 410)
  }

  if (!result.data) {
    return c.json({ error: 'Pilot not found' }, 404)
  }

  return c.json({ data: result.data, meta: { updatedAt: result.data.updatedAt } }, 200)
}

const deletePilotController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const result = await pilotService.deletePilot(id)

  if (result.error) {
    return c.json({ error: result.error }, 404)
  }

  return c.json({ message: 'Pilot deleted successfully' }, 200)
}

// Route handlers
router.openapi(getPilotsRoute, getPilotsController)
router.openapi(getPilotByIdRoute, getPilotByIdController)
router.openapi(createPilotRoute, createPilotController)
router.openapi(updatePilotRoute, updatePilotController)
router.openapi(deletePilotRoute, deletePilotController)

export default router
