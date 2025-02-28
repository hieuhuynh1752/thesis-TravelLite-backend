import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';
import { PlacesService } from '../places/places.service';
import { EventParticipantsService } from '../event-participants/event-participants.service';
import { TravelPlansService } from '../travel-plans/travel-plans.service';
import { Event } from '../entities/event.entity';
import { Place } from '../entities/place.entity';
import { EventParticipantStatus } from '../entities/event-participant.entity';

@Controller('events')
@UseGuards(JwtStrategy)
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private placesService: PlacesService,
    private participantsService: EventParticipantsService,
  ) {}

  // Create Event
  @Post()
  async createEvent(
    @Body()
    body: {
      eventData: Omit<Event, 'id' | 'createdAt'>;
      participantIds: number[];
      placeData: Omit<Place, 'id' | 'createdAt'>;
    },
  ) {
    const placeObject: Place = await this.placesService.checkOrCreatePlace(
      body.placeData,
    );
    const eventObject: Event = await this.eventsService.createEvent({
      ...body.eventData,
      locationId: placeObject.id,
    });
    for (const participantId of body.participantIds) {
      await this.participantsService.createParticipant({
        userId: participantId,
        eventId: eventObject.id,
      });
    }
    await this.participantsService.createParticipant({
      userId: body.eventData.creatorId,
      eventId: eventObject.id,
      status: EventParticipantStatus.ACCEPTED,
    });
    return eventObject;
  }

  // Get All Events
  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  // Get Single Event
  @Get(':id')
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.getEventById(id);
  }

  // Update Event
  @Put(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: Omit<Event, 'id' | 'createdAt' | 'participantIds'>,
  ) {
    return this.eventsService.updateEvent(id, body);
  }

  // Delete Event
  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.deleteEvent(id);
  }
}
