import { z } from 'zod'

import { EntitySchema } from './entity.js'
import {
  CreateMetaSchema,
  ListMetaSchema,
  ReadMetaSchema,
  UpdateMetaSchema,
} from './response/metadata.js'

export const PilotSchema = EntitySchema.extend({
  codename: z.string().nullable(),
  affiliation: z.string().nullable(),
  seriesId: z.number().nullable(),
})

export const PilotListSchema = z.array(PilotSchema)

export const CreatePilotSchema = z.object({
  name: z.string(),
  codename: z.string().optional(),
  affiliation: z.string().optional(),
  seriesId: z.number().optional(),
})

export const UpdatePilotSchema = CreatePilotSchema.extend({
  name: z.string().optional(),
})

export const PilotListResponseSchema = z.object({
  data: PilotListSchema,
  meta: ListMetaSchema,
})

export const PilotResponseSchema = z.object({
  data: PilotSchema,
  meta: ReadMetaSchema,
})

export const CreatePilotResponseSchema = z.object({
  data: PilotSchema,
  meta: CreateMetaSchema,
})

export const UpdatePilotResponseSchema = z.object({
  data: PilotSchema,
  meta: UpdateMetaSchema,
})
