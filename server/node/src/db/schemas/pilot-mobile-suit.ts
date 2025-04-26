import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { mobileSuit } from './mobile-suit.js'
import { pilot } from './pilot.js'

export const pilotMobileSuit = pgTable(
  'pilot_mobile_suit',
  {
    pilotId: integer('pilot_id').references(() => pilot.id),
    mobileSuitId: integer('mobile_suit_id').references(() => mobileSuit.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.pilotId, table.mobileSuitId] }),
  })
)
