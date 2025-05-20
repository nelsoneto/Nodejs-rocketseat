import { afterAll, beforeAll, test } from 'vitest'
import request from 'supertest'
import { app } from '../app'

// beforeAll É uma função que é executada uma única vez antes de todos os testes. É útil para inicializar recursos compartilhados que serão utilizados pelos testes.

// afterAll É uma função que é executada antes de cada teste. É útil para preparar o ambiente antes da execução de cada teste, por exemplo, inicializar variáveis ou limpar o banco de dados.

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('o usuario pode criar uma nova transação', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'Transação de teste',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})
