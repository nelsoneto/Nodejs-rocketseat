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

    if (!checkIn) {
      return null;
    }

    return {
      id: checkIn.id,
      userId: checkIn.user_id,
      gymId: checkIn.gym_id,
      createdAt: checkIn.createdAt,
      validatedAt: checkIn.validated,
    };
  }
  async findByUserIdOnDate(userId: string, date: Date){
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const checkInOnSameDay = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return checkInOnSameDay ? {
      id: checkInOnSameDay.id,
      userId: checkInOnSameDay.user_id,
      gymId: checkInOnSameDay.gym_id,
      createdAt: checkInOnSameDay.createdAt,
      validatedAt: checkInOnSameDay.validated,
  
    } : null;
  
  }
  async findManyByUserId(userId: string, page: number){
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return checkIns.map((checkIn) => ({
      id: checkIn.id,
      userId: checkIn.user_id,
      gymId: checkIn.gym_id,
      createdAt: checkIn.createdAt,
      validatedAt: checkIn.validated,
    }));
  }

  async countByUserId(userId: string){
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput){
    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: data.gymId,
        user_id: data.userId,
        validated: data.validatedAt ? data.validatedAt : null,
      },
    });

    return {
      id: checkIn.id,
      userId: checkIn.user_id,
      gymId: checkIn.gym_id,
      createdAt: checkIn.createdAt,
      validatedAt: checkIn.validated,
    };
  }

  async save(data: CheckIn){
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return {
      id: checkIn.id,
      userId: checkIn.user_id,
      gymId: checkIn.gym_id,
      createdAt: checkIn.createdAt,
      validatedAt: checkIn.validated,
    };
  }  

}