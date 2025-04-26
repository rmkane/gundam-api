import { z } from 'zod'
import { EntitySchema } from './entity.js'
import { CreateMetaSchema, ListMetaSchema, ReadMetaSchema, UpdateMetaSchema } from './metadata.js'

export const SeriesSchema = EntitySchema.extend({
  yearStart: z.number().nullable(),
  yearEnd: z.number().nullable(),
  description: z.string().nullable()
})

export const SeriesListSchema = z.array(SeriesSchema)

export const CreateSeriesSchema = z.object({
  name: z.string(),
  yearStart: z.number().optional(),
  yearEnd: z.number().optional(),
  description: z.string().optional()
})

export const UpdateSeriesSchema = CreateSeriesSchema.extend({
  name: z.string().optional()
})

export const SeriesListResponseSchema = z.object({
  data: SeriesListSchema,
  meta: ListMetaSchema
})

export const SeriesResponseSchema = z.object({
  data: SeriesSchema,
  meta: ReadMetaSchema
})

export const CreateSeriesResponseSchema = z.object({
  data: SeriesSchema,
  meta: CreateMetaSchema
})

export const UpdateSeriesResponseSchema = z.object({
  data: SeriesSchema,
  meta: UpdateMetaSchema
})
