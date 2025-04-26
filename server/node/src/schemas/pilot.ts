import { z } from 'zod'

export const PilotSchema = z.object({
  id: z.number(),
  name: z.string(),
  codename: z.string().nullable(),
  affiliation: z.string().nullable(),
  seriesId: z.number().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable()
})

export const CreatePilotSchema = z.object({
  name: z.string(),
  codename: z.string().optional(),
  affiliation: z.string().optional(),
  seriesId: z.number().optional()
})

export const UpdatePilotSchema = CreatePilotSchema 