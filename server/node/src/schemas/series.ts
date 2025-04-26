import { z } from 'zod'

export const SeriesSchema = z.object({
  id: z.number(),
  name: z.string(),
  yearStart: z.number().nullable(),
  yearEnd: z.number().nullable(),
  description: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable()
})

export const CreateSeriesSchema = z.object({
  name: z.string(),
  yearStart: z.number().optional(),
  yearEnd: z.number().optional(),
  description: z.string().optional()
})

export const UpdateSeriesSchema = CreateSeriesSchema 
