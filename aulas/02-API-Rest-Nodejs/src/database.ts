import { env } from './env'
import { Knex, knex as setupKnex } from 'knex'
import 'dotenv/config' // Load environment variables from .env file

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT, // Use SQLite as the database client
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL, // SQLite database file path
        }
      : env.DATABASE_URL, // For PostgreSQL, use the connection string directly
  useNullAsDefault: true,
  migrations: {
    extension: 'ts', // Use TypeScript for migrations
    directory: 'db/migrations', // Directory where migrations are stored
  },
}

export const knex = setupKnex(config)
