import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TravelPlan } from '@prisma/client';

@Injectable()
export class TravelPlansService {
  constructor(private prisma: PrismaService) {}

  async createTravelPlan(data: TravelPlan) {
    return this.prisma.travelPlan.create({ data });
  }

  async getAllTravelPlans() {
    return this.prisma.travelPlan.findMany();
  }

  async getTravelPlanById(id: number) {
    const plan = await this.prisma.travelPlan.findUnique({ where: { id } });
    if (!plan)
      throw new NotFoundException(`Travel Plan with ID ${id} not found`);
    return plan;
  }

  async updateTravelPlan(
    id: number,
    data: { originPlaceId: number; destinationPlaceId: number },
  ) {
    return this.prisma.travelPlan.update({ where: { id }, data });
  }

  async deleteTravelPlan(id: number) {
    return this.prisma.travelPlan.delete({ where: { id } });
  }
}
