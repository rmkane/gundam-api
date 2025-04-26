import { eq, isNull, and } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '../db/index.js'
import { pilot, series } from '../db/schemas/index.js'
import { CreatePilotSchema, UpdatePilotSchema } from '../schemas/index.js'
import { formatDates } from '../utils/format-dates.js'

type CreatePilotData = z.infer<typeof CreatePilotSchema>
type UpdatePilotData = z.infer<typeof UpdatePilotSchema>

export const getPilots = async (seriesId?: number) => {
  const conditions = [isNull(pilot.deletedAt)]

  if (seriesId) {
    // Check if series exists
    const seriesExists = await db
      .select()
      .from(series)
      .where(and(eq(series.id, seriesId), isNull(series.deletedAt)))
      .limit(1)

    if (seriesExists.length === 0) {
      return { error: 'Series not found', status: 404 }
    }

    conditions.push(eq(pilot.seriesId, seriesId))
  }

  const allPilots = await db
    .select()
    .from(pilot)
    .where(and(...conditions))
  return { data: allPilots.map(formatDates), status: 200 }
}

export const getPilotById = async (id: number) => {
  const result = await db.select().from(pilot).where(eq(pilot.id, id))

  if (result.length === 0) {
    return { error: 'Pilot not found', status: 404 }
  }

  const pilotItem = result[0]
  if (pilotItem.deletedAt) {
    return { error: 'Pilot has been deleted', status: 410 }
  }

  return { data: formatDates(pilotItem), status: 200 }
}

export const createPilot = async (data: CreatePilotData) => {
  if (!data.name) {
    return { error: 'Name is required', status: 400 }
  }

  if (data.seriesId) {
    // Check if series exists
    const seriesExists = await db
      .select()
      .from(series)
      .where(and(eq(series.id, data.seriesId), isNull(series.deletedAt)))
      .limit(1)

    if (seriesExists.length === 0) {
      return { error: 'Series not found', status: 400 }
    }
  }

  const result = await db.insert(pilot).values(data).returning()
  const newPilot = result[0]
  return {
    data: formatDates(newPilot),
    status: 201,
    headers: { Location: `/api/v1/pilots/${newPilot.id}` },
  }
}

export const updatePilot = async (id: number, data: UpdatePilotData) => {
  if (data.name === null || data.name === '') {
    return { error: 'Name is required', status: 400 }
  }

  if (data.seriesId) {
    // Check if series exists
    const seriesExists = await db
      .select()
      .from(series)
      .where(and(eq(series.id, data.seriesId), isNull(series.deletedAt)))
      .limit(1)

    if (seriesExists.length === 0) {
      return { error: 'Series not found', status: 400 }
    }
  }

  const result = await db
    .update(pilot)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(pilot.id, id))
    .returning()

  if (result.length === 0) {
    return { error: 'Pilot not found', status: 404 }
  }

  const updatedPilot = result[0]
  if (updatedPilot.deletedAt) {
    return { error: 'Pilot has been deleted', status: 410 }
  }

  return { data: formatDates(updatedPilot), status: 200 }
}

export const deletePilot = async (id: number) => {
  const result = await db
    .update(pilot)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(pilot.id, id))
    .returning()

  if (result.length === 0) {
    return { error: 'Pilot not found', status: 404 }
  }

  return { data: { message: 'Pilot deleted successfully' }, status: 200 }
}
