import { Hono } from 'hono'
import { db } from '../db/index.js'
import { mobileSuit } from '../db/schema.js'
import { eq, isNull, and } from 'drizzle-orm'

const router = new Hono()

// Get all mobile suits
router.get('/', async (c) => {
  const allMobileSuits = await db.select().from(mobileSuit).where(isNull(mobileSuit.deletedAt))
  return c.json(allMobileSuits)
})

// Get mobile suit by ID
router.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(mobileSuit).where(eq(mobileSuit.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Mobile suit not found' }, 404)
  }

  const mobileSuitItem = result[0]
  if (mobileSuitItem.deletedAt) {
    return c.json({ error: 'Mobile suit has been deleted' }, 410)
  }
  
  return c.json(mobileSuitItem)
})

// Get mobile suits by series ID
router.get('/series/:seriesId', async (c) => {
  const seriesId = Number(c.req.param('seriesId'))
  const mobileSuits = await db.select().from(mobileSuit)
    .where(and(
      eq(mobileSuit.seriesId, seriesId),
      isNull(mobileSuit.deletedAt)
    ))
  return c.json(mobileSuits)
})

// Create new mobile suit
router.post('/', async (c) => {
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
  return c.json(newMobileSuit, 201, {
    'Location': `/api/mobile-suits/${newMobileSuit.id}`
  })
})

// Update mobile suit
router.put('/:id', async (c) => {
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

  return c.json(updatedMobileSuit)
})

// Delete mobile suit
router.delete('/:id', async (c) => {
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

  return c.json({ message: 'Mobile suit deleted successfully' })
})

export default router 
