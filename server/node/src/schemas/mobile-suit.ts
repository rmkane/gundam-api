import { z } from 'zod'

export const MobileSuitSchema = z.object({
  id: z.number(),
  name: z.string(),
  modelNumber: z.string().nullable(),
  manufacturer: z.string().nullable(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  armorMaterial: z.string().nullable(),
  powerPlant: z.string().nullable(),
  seriesId: z.number().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable()
})

export const CreateMobileSuitSchema = z.object({
  name: z.string(),
  modelNumber: z.string().optional(),
  manufacturer: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  armorMaterial: z.string().optional(),
  powerPlant: z.string().optional(),
  seriesId: z.number().optional()
})

export const UpdateMobileSuitSchema = CreateMobileSuitSchema 
