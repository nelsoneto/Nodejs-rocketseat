import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { db } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  // ==== CRIAR UM USUÁRIO ====
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
    })
    const { name } = createUserBodySchema.parse(request.body)
    // Verifica se o usuário já existe
    const sessionId = randomUUID()
    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
    // Insere o usuário no banco de dados
    await db('users').insert({
      id: randomUUID(),
      name,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
