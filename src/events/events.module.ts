import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PlacesService } from '../places/places.service';
import { EventParticipantsService } from '../event-participants/event-participants.service';
import { TravelPlansService } from '../travel-plans/travel-plans.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService, PlacesService, EventParticipantsService, TravelPlansService],
  exports: [EventsService],
})
export class EventsModule {}
