import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'

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
    // Aqui é onde o use case é instanciado com o repositório que ele vai utilizar.
    // O use case não tem mais conexão direta com o Prisma, caso queira trocar o repositório, basta passar outro.
    const usersRepository = new PrismaUsersRepository()

    // Aqui esta sendo instanciado o use case com o repositório. Passando como parâmetro o repositório que ele vai utilizar.
    const registerUseCase = new RegisterUseCase(usersRepository)

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
