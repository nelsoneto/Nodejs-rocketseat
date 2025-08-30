import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// SOLID - D - Dependency Inversion Principle
// O arquivo que precisar do use case, como é o caso desse controller, deve importar o use case enviando como parâmetro o repositório que ele vai utilizar.

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
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
