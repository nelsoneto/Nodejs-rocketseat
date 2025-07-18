import { env } from '@/env'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : [],
})

export { prisma }
