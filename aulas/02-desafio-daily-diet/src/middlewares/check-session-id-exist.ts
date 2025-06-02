import { FastifyRequest, FastifyReply } from 'fastify'

// Middleware que verifica se o sessionId existe nos cookies
export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
