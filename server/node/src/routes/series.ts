import { OpenAPIHono } from '@hono/zod-openapi'
import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'
import { db } from '../db/index.js'
import { series } from '../db/schema.js'
import { eq, isNull } from 'drizzle-orm'

const router = new OpenAPIHono()

// Schema definitions
const SeriesSchema = z.object({
  id: z.number(),
  name: z.string(),
  yearStart: z.number().nullable(),
  yearEnd: z.number().nullable(),
  description: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable()
})

const CreateSeriesSchema = z.object({
  name: z.string(),
  yearStart: z.number().optional(),
  yearEnd: z.number().optional(),
  description: z.string().optional()
})

const UpdateSeriesSchema = CreateSeriesSchema

// Route definitions
const getSeriesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Series'],
  description: 'Get all series',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(SeriesSchema)
        }
      },
      description: 'List of all series'
    }
  }
})

const getSeriesByIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Series'],
  description: 'Get a series by ID',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SeriesSchema
        }
      },
      description: 'Series found'
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
    },
    410: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Series has been deleted'
    }
  }
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
          schema: CreateSeriesSchema
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: SeriesSchema
        }
      },
      description: 'Series created successfully'
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

const updateSeriesRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: ['Series'],
  description: 'Update a series',
  request: {
    params: z.object({
      id: z.string().transform(Number)
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateSeriesSchema
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SeriesSchema
        }
      },
      description: 'Series updated successfully'
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
      description: 'Series not found'
    },
    410: {
      content: {
        'application/json': {
          schema: z.object({
            error: z.string()
          })
        }
      },
      description: 'Series has been deleted'
    }
  }
})

const deleteSeriesRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: ['Series'],
  description: 'Delete a series (soft delete)',
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
      description: 'Series deleted successfully'
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

// Helper function to format dates
const formatDates = (item: any) => ({
  ...item,
  createdAt: item.createdAt?.toISOString() ?? null,
  updatedAt: item.updatedAt?.toISOString() ?? null,
  deletedAt: item.deletedAt?.toISOString() ?? null
})

// Route handlers
router.openapi(getSeriesRoute, async (c) => {
  const allSeries = await db.select().from(series).where(isNull(series.deletedAt))
  return c.json(allSeries.map(formatDates))
})

router.openapi(getSeriesByIdRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(series).where(eq(series.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Series not found' }, 404)
  }

  const seriesItem = result[0]
  if (seriesItem.deletedAt) {
    return c.json({ error: 'Series has been deleted' }, 410)
  }
  
  return c.json(formatDates(seriesItem))
})

router.openapi(createSeriesRoute, async (c) => {
  const body = await c.req.json()
  const { name, yearStart, yearEnd, description } = body

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const result = await db.insert(series).values({
    name,
    yearStart,
    yearEnd,
    description
  }).returning()

  const newSeries = result[0]
  return c.json(formatDates(newSeries), 201, {
    'Location': `/api/v1/series/${newSeries.id}`
  })
})

router.openapi(updateSeriesRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()
  const { name, yearStart, yearEnd, description } = body

  if (!name) {
    return c.json({ error: 'Name is required' }, 400)
  }

  const result = await db.update(series)
    .set({
      name,
      yearStart,
      yearEnd,
      description,
      updatedAt: new Date()
    })
    .where(eq(series.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Series not found' }, 404)
  }

  const updatedSeries = result[0]
  if (updatedSeries.deletedAt) {
    return c.json({ error: 'Series has been deleted' }, 410)
  }

  return c.json(formatDates(updatedSeries))
})

router.openapi(deleteSeriesRoute, async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.update(series)
    .set({
      deletedAt: new Date()
    })
    .where(eq(series.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Series not found' }, 404)
  }

  return c.json({ message: 'Series deleted successfully' }, 200)
})

export default router 
