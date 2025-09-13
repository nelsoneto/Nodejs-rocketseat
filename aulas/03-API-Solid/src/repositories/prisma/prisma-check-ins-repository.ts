import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string){
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date){
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const checkInOnSameDay = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return checkInOnSameDay;
  
  }
  async findManyByUserId(userId: string, page: number){
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return checkIns;
  }

  async countByUserId(userId: string){
    const count = await prisma.checkIn.count({
      where: {
        userId,
      },
    });

    return count;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput){
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(data: CheckIn){
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }  
}