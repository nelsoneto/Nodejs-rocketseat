import { z } from 'zod'
import { config } from 'dotenv'

// Faz a leitura do arquivo .env e carrega as variáveis de ambiente
config()

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
