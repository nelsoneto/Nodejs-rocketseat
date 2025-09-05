import { FastifyInstance } from 'fastify'
import { healthCheck } from '../users/health-check'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/health', healthCheck)
  app.get('check-ins/metrics', metrics)
  app.get('/check-ins', history)
  
  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
