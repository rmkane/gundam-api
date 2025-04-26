import { pgTable, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core'

export const series = pgTable('series', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  yearStart: integer('year_start'),
  yearEnd: integer('year_end'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at')
}) 
