import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { Context } from 'hono'
import { z } from 'zod'

import {
  CreateMobileSuitResponseSchema,
  CreateMobileSuitSchema,
  MobileSuitListResponseSchema,
  MobileSuitResponseSchema,
  UpdateMobileSuitResponseSchema,
  UpdateMobileSuitSchema,
} from '../schemas/index.js'
import { BooleanParamSchema, NumberParamSchema } from '../schemas/request/query.js'
import {
  BadRequestResponseSchema,
  GoneResponseSchema,
  InternalServerErrorResponseSchema,
  NotFoundResponseSchema,
} from '../schemas/response/error.js'
import * as mobileSuitService from '../services/mobile-suit.js'

const router = new OpenAPIHono()

// Route definitions
const getMobileSuitsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Mobile Suits'],
  description: 'Get all mobile suits',
  request: {
    query: z.object({
      seriesId: NumberParamSchema.optional(),
      includeDeleted: BooleanParamSchema.describe('Include deleted mobile suits in the response'),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: MobileSuitListResponseSchema,
        },
      },
      description: 'List of all mobile suits',
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

const getMobileSuitByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Mobile Suits'],
  description: 'Get a mobile suit by ID',
  request: {
    params: z.object({
      id: NumberParamSchema,
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: MobileSuitResponseSchema,
        },
      },
      description: 'Mobile suit found',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema,
        },
      },
      description: 'Mobile suit not found',
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema,
        },
      },
      description: 'Mobile suit has been deleted',
    },
  },
})

const createMobileSuitRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Mobile Suits'],
  description: 'Create a new mobile suit',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateMobileSuitSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: CreateMobileSuitResponseSchema,
        },
      },
      description: 'Mobile suit created successfully',
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

const updateMobileSuitRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['Mobile Suits'],
  description: 'Update a mobile suit',
  request: {
    params: z.object({
      id: NumberParamSchema,
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateMobileSuitSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UpdateMobileSuitResponseSchema,
        },
      },
      description: 'Mobile suit updated successfully',
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
      description: 'Mobile suit not found',
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema,
        },
      },
      description: 'Mobile suit has been deleted',
    },
  },
})

const deleteMobileSuitRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Mobile Suits'],
  description: 'Delete a mobile suit (soft delete)',
  request: {
    params: z.object({
      id: z.string().transform(Number),
    }),
  },
  responses: {
    204: {
      description: 'Mobile suit deleted successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema,
        },
      },
      description: 'Mobile suit not found',
    },
  },
})

// Controllers
const getMobileSuitsController = async (c: Context) => {
  const seriesId = c.req.query('seriesId')
  const includeDeleted = c.req.query('includeDeleted') === 'true'
  const result = await mobileSuitService.getMobileSuits(
    seriesId ? Number(seriesId) : undefined,
    includeDeleted
  )

  if (result.error) {
    return c.json({ error: result.error }, result.status as 404)
  }

  if (!result.data) {
    return c.json({ error: 'No mobile suits found' }, 404)
  }

  return c.json(
    { data: result.data, meta: { page: 1, pageSize: 10, total: result.data.length } },
    200
  )
}

const getMobileSuitByIdController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const result = await mobileSuitService.getMobileSuitById(id)

  if (result.error) {
    return c.json({ error: result.error }, result.status as 404 | 410)
  }

  if (!result.data) {
    return c.json({ error: 'Mobile suit not found' }, 404)
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

const createMobileSuitController = async (c: Context) => {
  const body = await c.req.json()
  const result = await mobileSuitService.createMobileSuit(body)

  if (result.error) {
    return c.json({ error: result.error }, 400)
  }

  if (!result.data) {
    return c.json({ error: 'Failed to create mobile suit' }, 500)
  }

  return c.json({ data: result.data, meta: { createdAt: result.data.createdAt } }, 201, {
    Location: `/api/v1/mobile-suits/${result.data.id}`,
  })
}

const updateMobileSuitController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const result = await mobileSuitService.updateMobileSuit(id, body)

  if (result.error) {
    return c.json({ error: result.error }, result.status as 400 | 404 | 410)
  }

  if (!result.data) {
    return c.json({ error: 'Mobile suit not found' }, 404)
  }

  return c.json({ data: result.data, meta: { updatedAt: result.data.updatedAt } }, 200)
}

const deleteMobileSuitController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const result = await mobileSuitService.deleteMobileSuit(id)

  if (result.error) {
    return c.json({ error: result.error }, 404)
  }

  return c.json({ message: 'Mobile suit deleted successfully' }, 200)
}

// Route handlers
router.openapi(getMobileSuitsRoute, getMobileSuitsController)
router.openapi(getMobileSuitByIdRoute, getMobileSuitByIdController)
router.openapi(createMobileSuitRoute, createMobileSuitController)
router.openapi(updateMobileSuitRoute, updateMobileSuitController)
router.openapi(deleteMobileSuitRoute, deleteMobileSuitController)

export default router
