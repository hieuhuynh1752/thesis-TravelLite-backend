import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';
import { Event } from '../users/entities/event.entity';

@Injectable()
@UseGuards(JwtStrategy)
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // Create Event
  async createEvent(data: Omit<Event, 'id' | 'participantIds'>) {
    return this.prisma.event.create({
      data: {
        title: data.title,
        creatorId: data.creatorId,
        dateTime: data.dateTime,
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
  async updateEvent(
    id: number,
    data: Omit<Event, 'id' | 'participantIds' | 'createdAt'>,
  ) {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  // Delete Event
  async deleteEvent(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
