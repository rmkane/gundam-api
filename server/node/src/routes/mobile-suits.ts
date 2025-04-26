import { Hono } from 'hono'
import { db } from '../db/index.js'
import { mobileSuit } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const router = new Hono()

// Get all mobile suits
router.get('/', async (c) => {
  const allMobileSuits = await db.select().from(mobileSuit)
  return c.json(allMobileSuits)
})

// Get mobile suit by ID
router.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const result = await db.select().from(mobileSuit).where(eq(mobileSuit.id, id))
  
  if (result.length === 0) {
    return c.json({ error: 'Mobile suit not found' }, 404)
  }
  
  return c.json(result[0])
})

// Get mobile suits by series ID
router.get('/series/:seriesId', async (c) => {
  const seriesId = Number(c.req.param('seriesId'))
  const mobileSuits = await db.select().from(mobileSuit).where(eq(mobileSuit.seriesId, seriesId))
  return c.json(mobileSuits)
})

export default router 
