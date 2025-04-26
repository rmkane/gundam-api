import { Hono } from 'hono'
import { db } from '../db/index.js'
import { series } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const router = new Hono()

// Get all series
router.get('/', async (c) => {
  const allSeries = await db.select().from(series)
  return c.json(allSeries)
})

// Get series by ID
router.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(series).where(eq(series.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Series not found' }, 404)
  }
  
  return c.json(result[0])
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

  return c.json(result[0], 201)
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

  return c.json(result[0])
})

// Delete series
router.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.delete(series)
    .where(eq(series.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Series not found' }, 404)
  }

  return c.json({ message: 'Series deleted successfully' })
})

export default router 