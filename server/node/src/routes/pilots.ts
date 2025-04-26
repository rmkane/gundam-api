import { OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { db } from '../db/index.js'
import { pilot, series } from '../db/schemas/index.js'
import { eq, isNull, and } from 'drizzle-orm'
import { PilotSchema, CreatePilotSchema, UpdatePilotSchema } from '../schemas/index.js'

const router = new OpenAPIHono()

// Route definitions
const getPilotsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Pilots'],
  description: 'Get all pilots',
  request: {
    query: z.object({
      seriesId: z.string().transform(Number).optional()
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(PilotSchema)
        }
      },
      description: 'List of all pilots'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Series not found'
    }
  }
})

const getPilotByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Pilots'],
  description: 'Get a pilot by ID',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PilotSchema
        }
      },
      description: 'Pilot found'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Pilot not found'
    },
    410: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Pilot has been deleted'
    }
  }
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
          schema: CreatePilotSchema
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: PilotSchema
        }
      },
      description: 'Pilot created successfully'
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Invalid request body'
    }
  }
})

const updatePilotRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['Pilots'],
  description: 'Update a pilot',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdatePilotSchema
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PilotSchema
        }
      },
      description: 'Pilot updated successfully'
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Invalid request body'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Pilot not found'
    },
    410: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Pilot has been deleted'
    }
  }
})

const deletePilotRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Pilots'],
  description: 'Delete a pilot (soft delete)',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Pilot deleted successfully'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Pilot not found'
    }
  }
})

// Helper function to format dates
const formatDates = (item: any) => ({
  ...item,
  createdAt: item.createdAt?.toISOString() ?? null,
  updatedAt: item.updatedAt?.toISOString() ?? null,
  deletedAt: item.deletedAt?.toISOString() ?? null
})

// Route handlers
router.openapi(getPilotsRoute, async (c) => {
  const seriesId = c.req.query('seriesId')
  const conditions = [isNull(pilot.deletedAt)]
  
  if (seriesId) {
    // Check if series exists
    const seriesExists = await db.select().from(series)
      .where(and(
        eq(series.id, Number(seriesId)),
        isNull(series.deletedAt)
      ))
      .limit(1)
    
    if (seriesExists.length === 0) {
      return c.json({ error: 'Series not found' }, 404)
    }
    
    conditions.push(eq(pilot.seriesId, Number(seriesId)))
  }
  
  const allPilots = await db.select().from(pilot).where(and(...conditions))
  return c.json(allPilots.map(formatDates), 200)
})

router.openapi(getPilotByIdRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(pilot).where(eq(pilot.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Pilot not found' }, 404)
  }

  const pilotItem = result[0]
  if (pilotItem.deletedAt) {
    return c.json({ error: 'Pilot has been deleted' }, 410)
  }
  
  return c.json(formatDates(pilotItem))
})

router.openapi(createPilotRoute, async (c) => {
  const body = await c.req.json()
  const { name, codename, affiliation, seriesId } = body

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const result = await db.insert(pilot).values({
    name,
    codename,
    affiliation,
    seriesId
  }).returning()

  const newPilot = result[0]
  return c.json(formatDates(newPilot), 201, {
    'Location': `/api/v1/pilots/${newPilot.id}`
  })
})

router.openapi(updatePilotRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const { name, codename, affiliation, seriesId } = body

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const result = await db.update(pilot)
    .set({
      name,
      codename,
      affiliation,
      seriesId,
      updatedAt: new Date()
    })
    .where(eq(pilot.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Pilot not found' }, 404)
  }

  const updatedPilot = result[0]
  if (updatedPilot.deletedAt) {
    return c.json({ error: 'Pilot has been deleted' }, 410)
  }

  return c.json(formatDates(updatedPilot))
})

router.openapi(deletePilotRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.update(pilot)
    .set({
      deletedAt: new Date()
    })
    .where(eq(pilot.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Pilot not found' }, 404)
  }

  return c.json({ message: 'Pilot deleted successfully' }, 200)
})

export default router 
