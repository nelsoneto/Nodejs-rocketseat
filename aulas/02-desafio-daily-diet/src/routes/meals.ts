import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { db } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exist'
import { isValid } from 'date-fns'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkSessionIdExists)

  // ==== CRIAR UMA REFEIÇÃO ====
  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      dateTime: z.string(),
      isOnDiet: z.boolean(),
    })
    const { name, description, dateTime, isOnDiet } =
      createMealBodySchema.parse(request.body)

    // LÓGICA DE VALIDAÇÃO DA DATA
    const parsedDate = new Date(dateTime) // Tenta converter a string para uma data

    if (!isValid(parsedDate)) {
      // Verifica se a data resultante é válida
      return reply.status(400).send({
        error: 'Bad Request',
        message:
          'Invalid date format. Please use a valid format like "YYYY-MM-DD HH:mm".',
      })
    }
    // FIM DA LÓGICA DE VALIDAÇÃO

    const { sessionId } = request.cookies
    const user = await db('users').where({ session_id: sessionId }).first()

    await db('meals').insert({
      id: randomUUID(),
      user_id: user.id,
      name,
      description,
      date_time: dateTime,
      is_on_diet: isOnDiet,
    })

    return reply.status(201).send()
  })

  // ==== LISTAR AS REFEIÇÕES ====
  app.get('/', async (request) => {
    const { sessionId } = request.cookies
    const user = await db('users').where({ session_id: sessionId }).first()

    const meals = await db('meals').where({ user_id: user.id }).select()
    return { meals }
  })

  // ==== VISUALIZAR UMA REFEIÇÃO ====
  app.get('/:id', async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getMealParamsSchema.parse(request.params)
    const { sessionId } = request.cookies
    const user = await db('users').where({ session_id: sessionId }).first()

    const meal = await db('meals') // db('meals') é a tabela de refeições
      .where({
        id,
        user_id: user.id,
      })
      .first()

    if (!meal) {
      return reply.status(404).send({ error: 'Meal not found' })
    }

    return { meal }
  })

  // ==== EDITAR UMA REFEIÇÃO ====
  app.patch('/:id', async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getMealParamsSchema.parse(request.params)

    const updateMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      dateTime: z.string().optional(),
      isOnDiet: z.boolean().optional(),
    })

    const updateData = updateMealBodySchema.parse(request.body)

    // Se o usuário enviou uma nova data, validamos ela
    if (updateData.dateTime) {
      const parsedDate = new Date(updateData.dateTime)
      if (!isValid(parsedDate)) {
        return reply.status(400).send({
          error: 'Bad Request',
          message:
            'Invalid date format. Please use a valid format like "YYYY-MM-DD HH:mm".',
        })
      }
      // Substituímos a string simples pela data completa em formato ISO
      updateData.dateTime = parsedDate.toISOString()
    }

    const { sessionId } = request.cookies
    const user = await db('users').where({ session_id: sessionId }).first()

    if (!user) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const meal = await db('meals')
      .where({
        id,
        user_id: user.id,
      })
      .first()

    if (!meal) {
      return reply.status(404).send({ error: 'Meal not found' })
    }

    await db('meals')
      .where({ id })
      .update({
        name: updateData.name ?? meal.name,
        description: updateData.description ?? meal.description,
        date_time: updateData.dateTime ?? meal.date_time,
        is_on_diet: updateData.isOnDiet ?? meal.is_on_diet,
      })

    return reply.status(204).send()
  })

  // ==== DELETAR UMA REFEIÇÃO ====
  app.delete('/:id', async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getMealParamsSchema.parse(request.params)
    const { sessionId } = request.cookies
    const user = await db('users').where({ session_id: sessionId }).first()

    await db('meals').where({ id, user_id: user.id }).delete()

    return reply.status(204).send()
  })

  // ==== MÉTRICAS ==== Copilot que gerou essa rota
  app.get('/metrics', async (request) => {
    const { sessionId } = request.cookies
    const user = await db('users').where({ session_id: sessionId }).first()

    const meals = await db('meals')
      .where({ user_id: user.id })
      .orderBy('date_time')

    const totalMeals = meals.length
    const totalMealsOnDiet = meals.filter((meal) => meal.is_on_diet).length
    const totalMealsOffDiet = totalMeals - totalMealsOnDiet

    const { bestOnDietSequence } = meals.reduce(
      (acc, meal) => {
        if (meal.is_on_diet) {
          acc.currentSequence += 1
        } else {
          acc.bestOnDietSequence =
            acc.currentSequence > acc.bestOnDietSequence
              ? acc.currentSequence
              : acc.bestOnDietSequence
          acc.currentSequence = 0
        }
        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    return {
      totalMeals,
      totalMealsOnDiet,
      totalMealsOffDiet,
      bestOnDietSequence,
    }
  })
}
