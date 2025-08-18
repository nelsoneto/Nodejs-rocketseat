import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymRepository {
  findById(id: string){
    const gym = prisma.gym.findUnique({
      where: {
        id,
      },
    });
    return gym; 
  }

  findManyNearby({ latitude, longitude }: FindManyNearbyParams){
    const gyms = prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) < 10
    `;
    return gyms;
  }

  searchMany(query: string, page: number){
    const gyms = prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return gyms;
  }

  create(data: Prisma.GymCreateInput){
    const gym = prisma.gym.create({
      data,
    });
    return gym;
  }
}
  