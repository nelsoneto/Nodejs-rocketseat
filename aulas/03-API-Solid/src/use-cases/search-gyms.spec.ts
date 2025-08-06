import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { it, describe, expect, beforeEach } from 'vitest'

let gymRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

// Teste para buscar academias
describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })

  // Deve conseguir buscar academias
  it('should be able to search gyms', async () => {
    await gymRepository.create({
      title: 'X one Gym',
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    })

    await gymRepository.create({
      title: 'Kubotani Gym',
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const { gyms } = await sut.execute({
      query: 'X ',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms[0]).toEqual(expect.objectContaining({ title: 'X one Gym' }))
  })

  // Deve conseguir buscar academias com paginação
  it('should be able to fetch paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5505,
        longitude: -46.6333,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Gym 21' }),
        expect.objectContaining({ title: 'Gym 22' }),
      ]),
    )
  })
})
