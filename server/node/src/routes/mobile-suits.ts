import { OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { db } from '../db/index.js'
import { mobileSuit, series } from '../db/schemas/index.js'
import { eq, isNull, and } from 'drizzle-orm'
import { MobileSuitSchema, CreateMobileSuitSchema, UpdateMobileSuitSchema } from '../schemas/index.js'

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
          schema: z.object({
            error: z.string()
          })
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
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Mobile suit not found'
    },
    410: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
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
          schema: CreateMobileSuitSchema
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: MobileSuitSchema
        }
      },
      description: 'Mobile suit created successfully'
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
          schema: UpdateMobileSuitSchema
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: MobileSuitSchema
        }
      },
      description: 'Mobile suit updated successfully'
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
      description: 'Mobile suit not found'
    },
    410: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
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
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Mobile suit deleted successfully'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Mobile suit not found'
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
router.openapi(getMobileSuitsRoute, async (c) => {
  const seriesId = c.req.query('seriesId')
  const conditions = [isNull(mobileSuit.deletedAt)]
  
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
    
    conditions.push(eq(mobileSuit.seriesId, Number(seriesId)))
  }
  
  const allMobileSuits = await db.select().from(mobileSuit).where(and(...conditions))
  return c.json(allMobileSuits.map(formatDates), 200)
})

router.openapi(getMobileSuitByIdRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(mobileSuit).where(eq(mobileSuit.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Mobile suit not found' }, 404)
  }

  const mobileSuitItem = result[0]
  if (mobileSuitItem.deletedAt) {
    return c.json({ error: 'Mobile suit has been deleted' }, 410)
  }
  
  return c.json(formatDates(mobileSuitItem))
})

router.openapi(createMobileSuitRoute, async (c) => {
  const body = await c.req.json()
  const { name, modelNumber, manufacturer, height, weight, armorMaterial, powerPlant, seriesId } = body

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const result = await db.insert(mobileSuit).values({
    name,
    modelNumber,
    manufacturer,
    height,
    weight,
    armorMaterial,
    powerPlant,
    seriesId
  }).returning()

  const newMobileSuit = result[0]
  return c.json(formatDates(newMobileSuit), 201, {
    'Location': `/api/v1/mobile-suits/${newMobileSuit.id}`
  })
})

router.openapi(updateMobileSuitRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const { name, modelNumber, manufacturer, height, weight, armorMaterial, powerPlant, seriesId } = body

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const result = await db.update(mobileSuit)
    .set({
      name,
      modelNumber,
      manufacturer,
      height,
      weight,
      armorMaterial,
      powerPlant,
      seriesId,
      updatedAt: new Date()
    })
    .where(eq(mobileSuit.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Mobile suit not found' }, 404)
  }

  const updatedMobileSuit = result[0]
  if (updatedMobileSuit.deletedAt) {
    return c.json({ error: 'Mobile suit has been deleted' }, 410)
  }

  return c.json(formatDates(updatedMobileSuit))
})

router.openapi(deleteMobileSuitRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.update(mobileSuit)
    .set({
      deletedAt: new Date()
    })
    .where(eq(mobileSuit.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Mobile suit not found' }, 404)
  }

  return c.json({ message: 'Mobile suit deleted successfully' }, 200)
})

export default router 
