import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  // Deve ser capaz de criar uma academia
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Teste',
      description: 'Uma academia para testes',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    expect(gym.id).toEqual(expect.any(String))
    expect(gym.title).toEqual('Academia Teste')
  })
})
