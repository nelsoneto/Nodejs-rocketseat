import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-namber-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository // Assuming you have a similar in-memory repository for gyms
let sut: CheckInUseCase

// Testes unitários para o caso de uso de Check-in
describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      phone: '123456789',
      description: 'Description of Gym 01',
      latitude: -23.5505, // Exemplo de latitude
      longitude: -46.6333, // Exemplo de longitude
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // Deve conseguir realizar check-in
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5505, // Exemplo de latitude
      userLongitude: -46.6333, // Exemplo de longitude
    })
    console.log(checkIn.createdAt)
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Não deve conseguir realizar check-in duas vezes no mesmo dia
  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5505, // Exemplo de latitude
      userLongitude: -46.6333, // Exemplo de longitude
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5505, // Exemplo de latitude
        userLongitude: -46.6333, // Exemplo de longitude
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  // Deve conseguir realizar check-in em dias diferentes
  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5505, // Exemplo de latitude
      userLongitude: -46.6333, // Exemplo de longitude
    })

    vi.setSystemTime(new Date(2023, 3, 2, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5505, // Exemplo de latitude
      userLongitude: -46.6333, // Exemplo de longitude
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Não deve conseguir realizar check-in em uma academia distante
  it('should not be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-02',
      title: 'Gym 02',
      phone: '987654321',
      description: 'Description of Gym 02',
      latitude: new Decimal(-23.5505), // Exemplo de latitude
      longitude: new Decimal(-46.6333), // Exemplo de longitude
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.56, // Latitude diferente, distante da academia
        userLongitude: -46.64, // Longitude diferente, distante da academia
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
