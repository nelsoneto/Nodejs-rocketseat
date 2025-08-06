import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { GetUserMetricUserCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricUserCase

// Teste para obter métricas do usuário
describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricUserCase(checkInRepository)
  })
  // Deve conseguir obter a contagem de check-ins do usuário
  it('should be able to get check-ins count from user metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { CheckInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(CheckInsCount).toEqual(2)
  })
})
