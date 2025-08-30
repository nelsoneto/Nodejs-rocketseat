import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// SOLID - D - Dependency Inversion Principle
// O arquivo que precisar do use case, como é o caso desse controller, deve importar o use case enviando como parâmetro o repositório que ele vai utilizar.

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone:  z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90 
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }), 
  })

  const { title, description, phone, latitude, longitude  } = createGymBodySchema.parse(request.body)

  try {
    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      // Se o erro for do tipo UserAlreadyExistsError, retorna um erro 409 (Conflict)
      return reply.status(409).send({ message: error.message })
    }

    throw error
    // reply.status(500).send() // TODO fix me
  }

  return reply.status(201).send()
}
