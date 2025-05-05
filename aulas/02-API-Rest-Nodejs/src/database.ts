import { Knex, knex as setupKnex } from 'knex';

export const config: Knex.Config = {
  client: 'sqlite3',  // Use SQLite3 as the database client
  connection: {
    filename: './db/app.db',  // Path to the SQLite3 database file
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',  // Use TypeScript for migrations
    directory: 'db/migrations',  // Directory where migrations are stored
  },
}

export const knex = setupKnex(config);