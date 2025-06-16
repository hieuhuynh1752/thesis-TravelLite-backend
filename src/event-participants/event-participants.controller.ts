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
import { EventParticipantsService } from './event-participants.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';
import { EventParticipantStatus } from '../entities/event-participant.entity';

@Controller('participants')
@UseGuards(JwtStrategy)
export class EventParticipantsController {
  constructor(private participantsService: EventParticipantsService) {}

  @Post()
  async createParticipant(@Body() body: { userId: number; eventId: number }) {
    return this.participantsService.createParticipant({
      ...body,
      status: EventParticipantStatus.ACCEPTED,
    });
  }

  @Get()
  async getAllParticipants() {
    return this.participantsService.getAllParticipants();
  }

  @Get(':id')
  async getParticipantById(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.getParticipantById(id);
  }

  @Put(':id')
  async updateParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: EventParticipantStatus },
  ) {
    return this.participantsService.updateParticipant(id, body);
  }

  @Delete(':id')
  async deleteParticipant(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.deleteParticipant(id);
  }
}
