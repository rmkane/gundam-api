import { z } from "zod";

export const EntitySchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable()
  })