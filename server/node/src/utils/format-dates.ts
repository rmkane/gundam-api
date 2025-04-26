import { TimestampFields } from '../db/types.js'

export const formatDates = <T extends TimestampFields>(item: T): Omit<T, keyof TimestampFields> & {
  createdAt: string
  updatedAt: string
  deletedAt: string | null
} => ({
  ...item,
  createdAt: item.createdAt?.toISOString() ?? new Date().toISOString(),
  updatedAt: item.updatedAt?.toISOString() ?? new Date().toISOString(),
  deletedAt: item.deletedAt?.toISOString() ?? null
}) 
