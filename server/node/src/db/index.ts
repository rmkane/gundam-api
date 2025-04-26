import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schemas/index.js'

const conf = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'gundam_db'
};

const connectionString = `postgres://${conf.user}:${conf.password}@${conf.host}:${conf.port}/${conf.database}`

const client = postgres(connectionString)
export const db = drizzle(client, { schema })
