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
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  // Não deve ser possível validar um check-in inexistente
  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})