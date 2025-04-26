import { Hono } from 'hono'
import { db } from '../db/index.js'
import { series } from '../db/schema.js'
import { eq, isNull } from 'drizzle-orm'

const router = new Hono()

// Get all series
router.get('/', async (c) => {
  const allSeries = await db.select().from(series).where(isNull(series.deletedAt))
  return c.json(allSeries)
})

// Get series by ID
router.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(series).where(eq(series.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Series not found' }, 404)
  }

  const seriesItem = result[0]
  if (seriesItem.deletedAt) {
    return c.json({ error: 'Series has been deleted' }, 410)
  }
  
  return c.json(seriesItem)
})

// Create new series
router.post('/', async (c) => {
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
  return c.json(newSeries, 201, {
    'Location': `/api/series/${newSeries.id}`
  })
})

// Update series
router.put('/:id', async (c) => {
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

  return c.json(updatedSeries)
})

// Delete series
router.delete('/:id', async (c) => {
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

  return c.json({ message: 'Series deleted successfully' })
})

export default router 
