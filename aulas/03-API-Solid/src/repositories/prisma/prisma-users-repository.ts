import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
    return null;
  }
    return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    passwordHash: user.password_hash, // 👈 converte manualmente
  };
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
     if (!user) {
       return null;
   }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    passwordHash: user.password_hash, // 👈 converte manualmente
  };

    
  }

async create(data: Prisma.UserCreateInput) {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password_hash: data.passwordHash, // 👈 Certifique-se de que isso está sendo fornecido
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt, // Usar created_at se for o nome no BD
    passwordHash: user.password_hash,
  };
}

}
