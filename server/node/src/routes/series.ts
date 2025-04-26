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

export default router 