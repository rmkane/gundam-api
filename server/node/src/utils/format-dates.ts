import { TimestampFields } from '../db/types.js'

interface FormattedTimestampFields {
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export const formatDates = <T extends TimestampFields>(
  item: T
): Omit<T, keyof TimestampFields> & FormattedTimestampFields => ({
  ...item,
  createdAt: item.createdAt?.toISOString() ?? new Date().toISOString(),
  updatedAt: item.updatedAt?.toISOString() ?? new Date().toISOString(),
  deletedAt: item.deletedAt?.toISOString() ?? null,
})
