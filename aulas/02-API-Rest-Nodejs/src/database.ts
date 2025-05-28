import { env } from './env'
import { Knex, knex as setupKnex } from 'knex'
import 'dotenv/config' // Load environment variables from .env file

export const config: Knex.Config = {
  client: 'sqlite', // Use SQLite as the database client
  connection: {
    filename: env.DATABASE_URL, // Database file path from environment variable
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts', // Use TypeScript for migrations
    directory: 'db/migrations', // Directory where migrations are stored
  },
}

export const knex = setupKnex(config)
