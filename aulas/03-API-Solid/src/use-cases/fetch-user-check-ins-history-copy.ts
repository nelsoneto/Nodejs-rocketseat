import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

// Teste para buscar histórico de check-ins do usuário
describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)

    // Deve conseguir realizar histórico de check-ins
    it('should be able to fetch check-in history', async () => {
      await checkInRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01',
      })

      await checkInRepository.create({
        gym_id: 'gym-02',
        user_id: 'user-01',
      })

      const { checkIns } = await sut.execute({
        userId: 'user-01',
      })
      expect(checkIns).toHaveLength(2)
    })
  })
})
