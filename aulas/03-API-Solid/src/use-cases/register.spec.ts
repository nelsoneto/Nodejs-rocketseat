import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  // Deve ser capaz de registrar
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  // Deve colocar em hash a senha do usuário no momento do registro
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', user.password_hash)
    expect(isPasswordCorrectHashed).toBe(true)
  })

  // Não deve ser possível registrar-se com o mesmo e-mail duas vezes
  it('should not be able to register with same email twice', async () => {
    const email = 'jonhdoe@exemple.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
