import { z } from 'zod'

import { EntitySchema } from './entity.js'
import {
  CreateMetaSchema,
  ListMetaSchema,
  ReadMetaSchema,
  UpdateMetaSchema,
} from './response/metadata.js'

export const MobileSuitSchema = EntitySchema.extend({
  modelNumber: z.string().nullable(),
  manufacturer: z.string().nullable(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  armorMaterial: z.string().nullable(),
  powerPlant: z.string().nullable(),
  seriesId: z.number().nullable(),
})

export const MobileSuitListSchema = z.array(MobileSuitSchema)

export const CreateMobileSuitSchema = z.object({
  name: z.string(),
  modelNumber: z.string().optional(),
  manufacturer: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  armorMaterial: z.string().optional(),
  powerPlant: z.string().optional(),
  seriesId: z.number().optional(),
})

export const UpdateMobileSuitSchema = CreateMobileSuitSchema.extend({
  name: z.string().optional(),
})

export const MobileSuitListResponseSchema = z.object({
  data: MobileSuitListSchema,
  meta: ListMetaSchema,
})

export const MobileSuitResponseSchema = z.object({
  data: MobileSuitSchema,
  meta: ReadMetaSchema,
})

export const CreateMobileSuitResponseSchema = z.object({
  data: MobileSuitSchema,
  meta: CreateMetaSchema,
})

export const UpdateMobileSuitResponseSchema = z.object({
  data: MobileSuitSchema,
  meta: UpdateMetaSchema,
})
