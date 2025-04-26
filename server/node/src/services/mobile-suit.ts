import { db } from '../db/index.js'
import { mobileSuit, series } from '../db/schemas/index.js'
import { eq, isNull, and } from 'drizzle-orm'
import { formatDates } from '../utils/format-dates.js'

export const getMobileSuits = async (seriesId?: number) => {
  const conditions = [isNull(mobileSuit.deletedAt)]
  
  if (seriesId) {
    // Check if series exists
    const seriesExists = await db.select().from(series)
      .where(and(
        eq(series.id, seriesId),
        isNull(series.deletedAt)
      ))
      .limit(1)
    
    if (seriesExists.length === 0) {
      return { error: 'Series not found', status: 404 }
    }
    
    conditions.push(eq(mobileSuit.seriesId, seriesId))
  }
  
  const allMobileSuits = await db.select().from(mobileSuit).where(and(...conditions))
  return { data: allMobileSuits.map(formatDates), status: 200 }
}

export const getMobileSuitById = async (id: number) => {
  const result = await db.select().from(mobileSuit).where(eq(mobileSuit.id, id))
  
  if (result.length === 0) {
    return { error: 'Mobile suit not found', status: 404 }
  }

  const mobileSuitItem = result[0]
  if (mobileSuitItem.deletedAt) {
    return { error: 'Mobile suit has been deleted', status: 410 }
  }
  
  return { data: formatDates(mobileSuitItem), status: 200 }
}

export const createMobileSuit = async (data: { 
  name: string, 
  modelNumber?: string, 
  manufacturer?: string, 
  height?: number, 
  weight?: number, 
  armorMaterial?: string, 
  powerPlant?: string, 
  seriesId?: number 
}) => {
  if (!data.name) {
    return { error: 'Name is required', status: 400 }
  }

  if (data.seriesId) {
    // Check if series exists
    const seriesExists = await db.select().from(series)
      .where(and(
        eq(series.id, data.seriesId),
        isNull(series.deletedAt)
      ))
      .limit(1)
    
    if (seriesExists.length === 0) {
      return { error: 'Series not found', status: 400 }
    }
  }

  const result = await db.insert(mobileSuit).values(data).returning()
  const newMobileSuit = result[0]
  return { 
    data: formatDates(newMobileSuit), 
    status: 201,
    headers: { 'Location': `/api/v1/mobile-suits/${newMobileSuit.id}` }
  }
}

export const updateMobileSuit = async (id: number, data: { 
  name?: string, 
  modelNumber?: string, 
  manufacturer?: string, 
  height?: number, 
  weight?: number, 
  armorMaterial?: string, 
  powerPlant?: string, 
  seriesId?: number 
}) => {
  if (data.seriesId) {
    // Check if series exists
    const seriesExists = await db.select().from(series)
      .where(and(
        eq(series.id, data.seriesId),
        isNull(series.deletedAt)
      ))
      .limit(1)
    
    if (seriesExists.length === 0) {
      return { error: 'Series not found', status: 400 }
    }
  }

  const result = await db.update(mobileSuit)
    .set({
      ...data,
      updatedAt: new Date()
    })
    .where(eq(mobileSuit.id, id))
    .returning()

  if (result.length === 0) {
    return { error: 'Mobile suit not found', status: 404 }
  }

  const updatedMobileSuit = result[0]
  if (updatedMobileSuit.deletedAt) {
    return { error: 'Mobile suit has been deleted', status: 410 }
  }

  return { data: formatDates(updatedMobileSuit), status: 200 }
}

export const deleteMobileSuit = async (id: number) => {
  const result = await db.update(mobileSuit)
    .set({
      deletedAt: new Date()
    })
    .where(eq(mobileSuit.id, id))
    .returning()

  if (result.length === 0) {
    return { error: 'Mobile suit not found', status: 404 }
  }

  return { data: { message: 'Mobile suit deleted successfully' }, status: 200 }
} 
