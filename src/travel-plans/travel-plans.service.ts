import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, TravelPlan } from '@prisma/client';

@Injectable()
export class TravelPlansService {
  constructor(private prisma: PrismaService) {}

  async createTravelPlan(data: TravelPlan) {
    return this.prisma.travelPlan.create({
      data: {
        eventParticipantId: data.eventParticipantId,
        origin: data.origin,
        destination: data.destination,
        totalCo2: data.totalCo2,
        travelMode: data.travelMode,
        travelSteps: data.travelSteps as Prisma.InputJsonValue[],
        routeDetails: data.routeDetails as
          | Prisma.InputJsonValue
          | Prisma.NullTypes.JsonNull,
      },
    });
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

  async getTravelPlanByParticipantId(participantId: number) {
    const plan = await this.prisma.travelPlan.findUnique({
      where: { eventParticipantId: participantId },
    });
    if (!plan)
      throw new NotFoundException(
        `Travel Plan with participantId ${participantId} not found`,
      );
    return plan;
  }

  async updateTravelPlanByParticipantId(
    participantId: number,
    data: TravelPlan,
  ) {
    return this.prisma.travelPlan.update({
      where: { eventParticipantId: participantId },
      data: {
        eventParticipantId: data.eventParticipantId,
        origin: data.origin,
        destination: data.destination,
        totalCo2: data.totalCo2,
        travelMode: data.travelMode,
        travelSteps: data.travelSteps as Prisma.InputJsonValue[],
        routeDetails: data.routeDetails as
          | Prisma.InputJsonValue
          | Prisma.NullTypes.JsonNull,
      },
    });
  }

  async deleteTravelPlan(id: number) {
    return this.prisma.travelPlan.delete({ where: { id } });
  }
}
