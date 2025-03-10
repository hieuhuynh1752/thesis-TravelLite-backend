import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';
import { Event } from '../entities/event.entity';

@Injectable()
@UseGuards(JwtStrategy)
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // Create Event
  async createEvent(data: Omit<Event, 'id' | 'participantIds'>) {
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        creatorId: data.creatorId,
        dateTime: data.dateTime,
        locationId: data.locationId,
        occurrence: data.occurrence,
      },
    });
  }

  // Read All Events
  async getAllEvents() {
    return this.prisma.event.findMany();
  }

  // Read Single Event by ID
  async getEventById(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        location: true,
        participants: {
          include: { user: true },
        },
      },
    });
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  // Update Event
  async updateEvent(id: number, data: Omit<Event, 'id' | 'createdAt'>) {
    const { creatorId, participantIds, ...rest } = data;
    const existingEvent = await this.prisma.event.findUnique({
      where: { id },
      include: { participants: { select: { userId: true } } },
    });

    if (!existingEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    const existingIds = new Set(
      existingEvent.participants.map((user) => user.userId),
    );
    const participantsToAdd = participantIds
      ?.filter((userId) => !existingIds.has(userId))
      .map((userId) => ({ userId }));

    const participantsToRemove = existingEvent.participants
      .filter((participant) => !participantIds?.includes(participant.userId))
      .map((participant) => ({ userId: participant.userId }));

    return this.prisma.event.update({
      where: { id },
      data: {
        ...rest,
        participants: {
          deleteMany: participantsToRemove,
          createMany: { data: participantsToAdd! },
        },
        updatedAt: new Date(),
      },
      include: { participants: true },
    });
  }

  // Delete Event
  async deleteEvent(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
