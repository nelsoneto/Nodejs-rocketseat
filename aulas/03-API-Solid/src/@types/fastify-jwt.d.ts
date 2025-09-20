// Renomeie este arquivo para fastify-jwt.d.ts
import "@fastify/jwt"

declare module "@fastify/jwt" {
    // A propriedade 'payload' é usada para tipar o payload ao assinar com `jwtSign`
    // A propriedade 'user' é usada para tipar o `request.user`
  interface FastifyJWT {
    user: {
      role: 'MEMBER' | 'ADMIN',
      sub: string
    }
  }
}
