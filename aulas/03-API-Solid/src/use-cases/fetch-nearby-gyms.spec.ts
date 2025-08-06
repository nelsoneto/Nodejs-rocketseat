import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymRepository
let sut: FetchNearByGymsUseCase

// Teste para listar academias próximas
describe('Fetch NearBy Gyms Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearByGymsUseCase(gymRepository)
  })

  // Deve conseguir listar academias próximas
  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Gym perto',
      description: null,
      phone: null,
      latitude: -23.5578854,
      longitude: -46.6626897,
    })

    await gymRepository.create({
      title: 'Gym longe',
      description: null,
      phone: null,
      latitude: -23.5578854,
      longitude: -46.6626897 + 0.5, // Aproximadamente
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5578854,
      userLongitude: -46.6626897,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: 'Gym perto' })]),
    )
  })
})
