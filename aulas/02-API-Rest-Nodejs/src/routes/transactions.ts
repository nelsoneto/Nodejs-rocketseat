import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExist } from '../middlewares/check-session-id-exist'

export async function transactionsRoutes(app: FastifyInstance) {
  // Middleware to check if sessionId exists in the request cookies
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExist],
    },
    async (request, reply) => {
      const getTrasnactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      // Validate the request parameters against the schema
      const { id } = getTrasnactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      if (!transaction) {
        return reply.status(404).send()
      }
      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()
      return { summary }
    },
  )

  app.post(
    '/',

    async (request, reply) => {
      const createTrasnactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })

      // Validate the request body against the schema
      const { title, amount, type } = createTrasnactionBodySchema.parse(
        request.body,
      )

      let sessionId = request.cookies.sessionId
      if (!sessionId) {
        sessionId = randomUUID()
        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
      }

      await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })
      return reply.status(201).send()
    },
  )
}
