import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

// Error hendling
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // In production, you might want to log the error to an external service
    // logErrorToService(error)
  }

  return reply.status(500).send({
    message: 'Internal server error',
    error: error.message,
  })
})
