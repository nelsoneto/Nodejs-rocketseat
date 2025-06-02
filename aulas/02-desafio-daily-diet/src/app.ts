import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'

export const app = fastify()
// Configuração do servidor Fastify, que inclui o registro de plugins e rotas
app.register(cookie)
app.register(usersRoutes, {
  prefix: 'users',
})
app.register(mealsRoutes, {
  prefix: 'meals',
})
