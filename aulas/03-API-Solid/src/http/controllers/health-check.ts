import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma' // Você precisará de uma instância do Prisma Client aqui

export async function healthCheck(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Uma query simples para verificar a conectividade com o banco de dados
    await prisma.$queryRaw`SELECT 1`

    return reply.status(200).send({ status: 'ok', database: 'healthy' })
  } catch (error) {
    return reply.status(503).send({ status: 'error', database: 'unhealthy' })
  }
}
