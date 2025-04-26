import { z } from 'zod'

export const ListMetaSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number()
})

export const ReadMetaSchema = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const CreateMetaSchema = z.object({
  createdAt: z.string().datetime(),
})

export const UpdateMetaSchema = z.object({
  updatedAt: z.string().datetime()
})
