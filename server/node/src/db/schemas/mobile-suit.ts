import { integer, pgTable, real, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { series } from './series.js'

export const mobileSuit = pgTable('mobile_suit', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  modelNumber: varchar('model_number', { length: 50 }),
  manufacturer: varchar('manufacturer', { length: 100 }),
  height: real('height'),
  weight: real('weight'),
  armorMaterial: varchar('armor_material', { length: 50 }),
  powerPlant: varchar('power_plant', { length: 100 }),
  seriesId: integer('series_id').references(() => series.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
})
