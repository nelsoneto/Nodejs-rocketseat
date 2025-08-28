// Renomeie este arquivo para fastify-jwt.d.ts
import "@fastify/jwt"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    // A propriedade 'payload' é usada para tipar o payload ao assinar com `jwtSign`
    // A propriedade 'user' é usada para tipar o `request.user`
    user: {
      sub: string
    }
  }
}
