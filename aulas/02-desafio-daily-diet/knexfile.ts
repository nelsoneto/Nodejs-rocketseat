import path from 'node:path'

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'db', 'app.db'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, 'db', 'migrations'),
  },
}
