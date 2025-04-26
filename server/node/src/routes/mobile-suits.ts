import { OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { Context } from 'hono'
import { MobileSuitSchema, CreateMobileSuitSchema, UpdateMobileSuitSchema } from '../schemas/index.js'
import { NotFoundResponseSchema, BadRequestResponseSchema, GoneResponseSchema, InternalServerErrorResponseSchema, MessageResponseSchema } from '../schemas/responses.js'
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
      seriesId: z.string().transform(Number).optional()
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(MobileSuitSchema)
        }
      },
      description: 'List of all mobile suits'
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema
        }
      },
      description: 'Series not found'
    }
  }
})

const getMobileSuitByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Mobile Suits'],
  description: 'Get a mobile suit by ID',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: MobileSuitSchema
        }
      },
      description: 'Mobile suit found'
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema
        }
      },
      description: 'Mobile suit not found'
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema
        }
      },
      description: 'Mobile suit has been deleted'
    }
  }
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
          schema: CreateMobileSuitSchema.extend({
            height: z.number().nullable(),
            weight: z.number().nullable()
          })
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: MobileSuitSchema.extend({
            height: z.number().nullable(),
            weight: z.number().nullable()
          })
        }
      },
      description: 'Mobile suit created successfully'
    },
    400: {
      content: {
        'application/json': {
          schema: BadRequestResponseSchema
        }
      },
      description: 'Invalid request body'
    },
    500: {
      content: {
        'application/json': {
          schema: InternalServerErrorResponseSchema
        }
      },
      description: 'Internal server error'
    }
  }
})

const updateMobileSuitRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['Mobile Suits'],
  description: 'Update a mobile suit',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateMobileSuitSchema.extend({
            height: z.number().nullable(),
            weight: z.number().nullable()
          })
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: MobileSuitSchema.extend({
            height: z.number().nullable(),
            weight: z.number().nullable()
          })
        }
      },
      description: 'Mobile suit updated successfully'
    },
    400: {
      content: {
        'application/json': {
          schema: BadRequestResponseSchema
        }
      },
      description: 'Invalid request body'
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema
        }
      },
      description: 'Mobile suit not found'
    },
    410: {
      content: {
        'application/json': {
          schema: GoneResponseSchema
        }
      },
      description: 'Mobile suit has been deleted'
    }
  }
})

const deleteMobileSuitRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Mobile Suits'],
  description: 'Delete a mobile suit (soft delete)',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: MessageResponseSchema
        }
      },
      description: 'Mobile suit deleted successfully'
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundResponseSchema
        }
      },
      description: 'Mobile suit not found'
    }
  }
})

// Controllers
const getMobileSuitsController = async (c: Context) => {
  const seriesId = c.req.query('seriesId')
  const result = await mobileSuitService.getMobileSuits(seriesId ? Number(seriesId) : undefined)
  
  if (result.error) {
    return c.json({ error: result.error }, result.status as 404)
  }
  
  return c.json(result.data, 200)
}

const getMobileSuitByIdController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const result = await mobileSuitService.getMobileSuitById(id)
  
  if (result.error) {
    return c.json({ error: result.error }, result.status as 404 | 410)
  }
  
  return c.json(result.data, 200)
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
  
  return c.json(result.data, 201, {
    'Location': `/api/v1/mobile-suits/${result.data.id}`
  })
}

const updateMobileSuitController = async (c: Context) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const result = await mobileSuitService.updateMobileSuit(id, body)
  
  if (result.error) {
    return c.json({ error: result.error }, result.status as 400 | 404 | 410)
  }
  
  return c.json(result.data, 200)
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
