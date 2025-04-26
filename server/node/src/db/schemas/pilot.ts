import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { series } from './series.js'

export const pilot = pgTable('pilot', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  codename: varchar('codename', { length: 50 }),
  affiliation: varchar('affiliation', { length: 100 }),
  seriesId: integer('series_id').references(() => series.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
})
