import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  EventParticipant,
  EventParticipantStatus,
} from '../entities/event-participant.entity';

@Injectable()
export class EventParticipantsService {
  constructor(private prisma: PrismaService) {}

  // Create Participant
  async createParticipant(data: Omit<EventParticipant, 'id' | 'assignedAt'>) {
    return this.prisma.eventParticipant.create({ data });
  }

  // Get All Participants
  async getAllParticipants() {
    return this.prisma.eventParticipant.findMany();
  }

  // Get Participant by ID
  async getParticipantById(id: number) {
    const participant = await this.prisma.eventParticipant.findUnique({
      where: { id },
    });
    if (!participant)
      throw new NotFoundException(`Participant with ID ${id} not found`);
    return participant;
  }

  // Update Participant
  async updateParticipant(
    id: number,
    data: { status: EventParticipantStatus },
  ) {
    return this.prisma.eventParticipant.update({ where: { id }, data });
  }

  // Delete Participant
  async deleteParticipant(id: number) {
    return this.prisma.eventParticipant.delete({ where: { id } });
  }
}
