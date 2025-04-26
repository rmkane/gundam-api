import { eq, isNull } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../db/index.js'
import { series } from '../db/schemas/index.js'
import { CreateSeriesSchema, UpdateSeriesSchema } from '../schemas/index.js'
import { formatDates } from '../utils/format-dates.js'

type CreateSeriesData = z.infer<typeof CreateSeriesSchema>
type UpdateSeriesData = z.infer<typeof UpdateSeriesSchema>

export const getSeries = async () => {
  const allSeries = await db.select().from(series).where(isNull(series.deletedAt))
  return allSeries.map(formatDates)
}

export const getSeriesById = async (id: number) => {
  const result = await db.select().from(series).where(eq(series.id, id))

  if (result.length === 0) {
    return { error: 'Series not found', status: 404 }
  }

  const seriesItem = result[0]
  if (seriesItem.deletedAt) {
    return { error: 'Series has been deleted', status: 410 }
  }

  return { data: formatDates(seriesItem), status: 200 }
}

export const createSeries = async (data: CreateSeriesData) => {
  if (!data.name) {
    return { error: 'Name is required', status: 400 }
  }

  const result = await db.insert(series).values(data).returning()
  const newSeries = result[0]
  return {
    data: formatDates(newSeries),
    status: 201,
    headers: { 'Location': `/api/v1/series/${newSeries.id}` }
  }
}

export const updateSeries = async (id: number, data: UpdateSeriesData) => {
  if (data.name === null || data.name === '') {
    return { error: 'Name is required', status: 400 }
  }

  const result = await db.update(series)
    .set({
      ...data,
      updatedAt: new Date()
    })
    .where(eq(series.id, id))
    .returning()

  if (result.length === 0) {
    return { error: 'Series not found', status: 404 }
  }

  const updatedSeries = result[0]
  if (updatedSeries.deletedAt) {
    return { error: 'Series has been deleted', status: 410 }
  }

  return { data: formatDates(updatedSeries), status: 200 }
}

export const deleteSeries = async (id: number) => {
  const result = await db.update(series)
    .set({
      deletedAt: new Date()
    })
    .where(eq(series.id, id))
    .returning()

  if (result.length === 0) {
    return { error: 'Series not found', status: 404 }
  }

  return { data: formatDates(result[0]), status: 200 }
}
