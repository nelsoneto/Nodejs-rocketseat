import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

// Teste para buscar histórico de check-ins do usuário
describe('Fetch User Check-in History Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  // Deve conseguir realizar histórico de check-ins
  it('should be able to fetch check-in history', async () => {
    await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })
    expect(checkIns).toHaveLength(2)
    // contendo os check-ins criados
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ gymId: 'gym-01' }),
        expect.objectContaining({ gymId: 'gym-02' }),
      ]),
    )
  })

  // Deve conseguir realizar histórico de check-ins por paginação
  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ gymId: 'gym-21' }),
        expect.objectContaining({ gymId: 'gym-22' }),
      ]),
    )
  })
})
