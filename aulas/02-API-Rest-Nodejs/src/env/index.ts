import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'), // Environment type
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})
const _env = envSchema.safeParse(process.env) // Validate and parse environment variables using Zod
if (_env.success === false) {
  console.error('Invalid environment variables!!!!', _env.error.format()) // Log error if validation fails
  throw new Error('Invalid environment variables') // Throw error to stop execution
}
export const env = _env.data // Export validated environment variables
