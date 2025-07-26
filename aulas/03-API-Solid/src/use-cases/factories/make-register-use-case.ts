import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  // Aqui é onde o use case é instanciado com o repositório que ele vai utilizar.
  const usersRepository = new PrismaUsersRepository()
  // Aqui esta sendo instanciado o use case com o repositório. Passando como parâmetro o repositório que ele vai utilizar.
  const registerUseCase = new RegisterUseCase(usersRepository)
  return registerUseCase
}
