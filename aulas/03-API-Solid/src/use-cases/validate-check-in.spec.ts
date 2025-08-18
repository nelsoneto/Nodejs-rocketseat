// Teste de validar um check-in
import { it, describe, expect, beforeEach, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { MaxNumberOfCheckInsError } from './errors/max-namber-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

// Teste para validar um check-in
describe('Validate Check-In Use Case', () => { 
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers() // ativa o uso de timers falsos
  })

  // Deve conseguir validar o check-in
  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validatedAt).toEqual(expect.any(Date))
  })

  // Não deve ser possível validar um check-in inexistente
  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  // Não deve ser possível validar check-in apos 20 minutos apos ele ser criado
  it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0)) // define o tempo do sistema para 1 de janeiro de 2023, 12:00:00 

    const createdCheckIn = await checkInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })  

    const twentyOneMinutesInMs = 1000 * 60 * 21 // 21 minutos em milissegundos

    vi.advanceTimersByTime(twentyOneMinutesInMs) // avança o tempo do sistema em 21 minutos

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)  
  })
})