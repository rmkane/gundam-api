import { Hono } from 'hono'
import { db } from '../db/index.js'
import { pilot } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const router = new Hono()

// Get all pilots
router.get('/', async (c) => {
  const allPilots = await db.select().from(pilot)
  return c.json(allPilots)
})

// Get pilot by ID
router.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(pilot).where(eq(pilot.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Pilot not found' }, 404)
  }
  
  return c.json(result[0])
})

// Get pilots by series ID
router.get('/series/:seriesId', async (c) => {
  const seriesId = Number(c.req.param('seriesId'))
  const pilots = await db.select().from(pilot).where(eq(pilot.seriesId, seriesId))
  return c.json(pilots)
})

// Create new pilot
router.post('/', async (c) => {
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

  return c.json(result[0], 201)
})

// Update pilot
router.put('/:id', async (c) => {
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

  return c.json(result[0])
})

// Delete pilot
router.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.delete(pilot)
    .where(eq(pilot.id, id))
    .returning()

  if (result.length === 0) {
    return c.json({ error: 'Pilot not found' }, 404)
  }

  return c.json({ message: 'Pilot deleted successfully' })
})

export default router 
