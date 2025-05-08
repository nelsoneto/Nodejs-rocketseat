import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {

  app.get('/', async () => {
    const transactions = await knex('transactions').select('*')
    return { transactions }
  })

  app.get('/:id', async (request, reply) => {
    const getTrasnactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    // Validate the request parameters against the schema
    const { id } = getTrasnactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()

    if (!transaction) {
      return reply.status(404).send()
    }

    return { transaction }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions').sum('amount', { as: 'amount' }).first()
    return { summary }
  })

  app.post('/', async (request, reply) => {
    const createTrasnactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    // Validate the request body against the schema
    const { title, amount, type } = createTrasnactionBodySchema.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })
    return reply.status(201).send()
  })
}