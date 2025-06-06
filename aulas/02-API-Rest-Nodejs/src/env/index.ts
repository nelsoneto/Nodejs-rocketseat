import { z } from 'zod'
import { config } from 'dotenv'

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' }) // Load environment variables from .env.test file for testing
} else {
  config() // Load environment variables from .env file for other environments
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'), // Environment type
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']), // Database client type
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333), // Server port, default is 3333
})
const _env = envSchema.safeParse(process.env) // Validate and parse environment variables using Zod
if (_env.success === false) {
  console.error('Invalid environment variables!!!!', _env.error.format()) // Log error if validation fails
  throw new Error('Invalid environment variables') // Throw error to stop execution
}
export const env = _env.data // Export validated environment variables

console.log('Usando banco de dados:', env.DATABASE_URL)
