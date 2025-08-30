import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    // Cria um novo usuário
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    // Autentica o usuário para obter o token
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const { token } = authResponse.body

    // Busca o perfil do usuário usando o token
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    // Valida a resposta do perfil
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'john.doe@example.com',
      }),
    )
  })
})
