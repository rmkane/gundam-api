import { pgTable, serial, varchar, integer, text, timestamp, decimal, primaryKey } from 'drizzle-orm/pg-core'

export const series = pgTable('series', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  yearStart: integer('year_start'),
  yearEnd: integer('year_end'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const pilot = pgTable('pilot', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  codename: varchar('codename', { length: 50 }),
  affiliation: varchar('affiliation', { length: 100 }),
  seriesId: integer('series_id').references(() => series.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const mobileSuit = pgTable('mobile_suit', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  modelNumber: varchar('model_number', { length: 50 }),
  manufacturer: varchar('manufacturer', { length: 100 }),
  height: decimal('height', { precision: 5, scale: 2 }), // in meters
  weight: decimal('weight', { precision: 6, scale: 2 }), // in metric tons
  armorMaterial: varchar('armor_material', { length: 50 }),
  powerPlant: varchar('power_plant', { length: 100 }),
  seriesId: integer('series_id').references(() => series.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const pilotMobileSuit = pgTable('pilot_mobile_suit', {
  pilotId: integer('pilot_id').references(() => pilot.id),
  mobileSuitId: integer('mobile_suit_id').references(() => mobileSuit.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.pilotId, table.mobileSuitId] }),
})) 
