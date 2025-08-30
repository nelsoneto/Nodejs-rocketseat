import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  // Define o schema de validação para os parâmetros de query da requisição
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90 // Valida que a latitude está entre -90 e 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180 // Valida que a longitude está entre -180 e 180
    }),
  })

  // Faz o parse e valida os parâmetros de query da requisição
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  // Cria uma instância do use case para buscar academias próximas
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  // Executa o use case com as coordenadas fornecidas
  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
