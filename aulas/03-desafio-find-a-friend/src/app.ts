import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'

export const app = Fastify()
const prisma = new PrismaClient()

prisma.org.create({
  data: {
    name: 'Teste',
    email: 'teste@teste.com',
    password_hash: '123456',
    address: 'Rua teste, 123',
    city: 'São Paulo',
    cep: '12345678',
    whatsapp: '11999999999',
  },
})
