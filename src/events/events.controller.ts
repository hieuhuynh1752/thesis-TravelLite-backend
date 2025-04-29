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
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private placesService: PlacesService,
    private participantsService: EventParticipantsService,
  ) {}

  // Create Event
  @UseGuards(JwtStrategy)
  @Post()
  async createEvent(
    @Body()
    body: {
      eventData: Omit<Event, 'id' | 'createdAt' | 'locationId'>;
      placeData: Omit<Place, 'id' | 'createdAt'>;
    },
  ) {
    const placeObject: Place = await this.placesService.checkOrCreatePlace(
      body.placeData,
    );
    console.log(placeObject);
    const eventObject: Event = await this.eventsService.createEvent({
      ...body.eventData,
      locationId: placeObject.id,
    });
    if (body.eventData.participantIds) {
      for (const participantId of body.eventData.participantIds) {
        await this.participantsService.createParticipant({
          userId: participantId,
          eventId: eventObject.id,
        });
      }
    }
    await this.participantsService.createParticipant({
      userId: body.eventData.creatorId,
      eventId: eventObject.id,
      status: EventParticipantStatus.ACCEPTED,
    });
    return eventObject;
  }

  // Get All Events
  @UseGuards(JwtStrategy)
  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  // Get Public Events
  @Get('/public')
  async getPublicEvents() {
    return this.eventsService.getPublicEvents();
  }

  // Get Public Single Event
  @Get('/public/:id')
  async getPublicEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.getPublicEventById(id);
  }

  // Get Single Event
  @UseGuards(JwtStrategy)
  @Get(':id')
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.getEventById(id);
  }

  // Update Event
  @UseGuards(JwtStrategy)
  @Put(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      eventData: Omit<Event, 'id' | 'createdAt'>;
      placeData: Omit<Place, 'id' | 'createdAt'> | undefined;
    },
  ) {
    let placeId = body.eventData.locationId;
    if (body.placeData) {
      const placeObject: Place = await this.placesService.checkOrCreatePlace(
        body.placeData,
      );
      placeId = placeObject.id;
    }
    // const eventObject: Event = await this.eventsService.getEventById(id);
    // if (body.eventData.participantIds) {
    //   for (const participantId of body.eventData.participantIds) {
    //     await this.participantsService.checkOrCreateParticipant({
    //       userId: participantId,
    //       eventId: id,
    //     });
    //   }
    //   if (eventObject.participantIds) {
    //     for (const participantId of eventObject.participantIds.filter(
    //       (participant) =>
    //         !body.eventData.participantIds?.includes(participant),
    //     )) {
    //       await this.participantsService.deleteParticipantWithSettings(
    //         participantId,
    //         id,
    //       );
    //     }
    //   }
    // }
    const participantIds = body.eventData.participantIds;
    participantIds?.unshift(body.eventData.creatorId);
    return this.eventsService.updateEvent(id, {
      ...body.eventData,
      participantIds: participantIds,
      locationId: placeId,
    });
  }

  // Delete Event
  @UseGuards(JwtStrategy)
  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.deleteEvent(id);
  }
}
