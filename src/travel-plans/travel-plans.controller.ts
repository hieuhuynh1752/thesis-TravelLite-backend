import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';
import { TravelPlan } from '@prisma/client';

@Controller('travel-plans')
@UseGuards(JwtStrategy)
export class TravelPlansController {
  constructor(private travelPlansService: TravelPlansService) {}

  @Post()
  async createTravelPlan(@Body() body: { data: TravelPlan }) {
    return this.travelPlansService.createTravelPlan(body.data);
  }

  @Get()
  async getAllTravelPlans() {
    return this.travelPlansService.getAllTravelPlans();
  }

  @Get(':id')
  async getTravelPlanById(@Param('id', ParseIntPipe) id: number) {
    return this.travelPlansService.getTravelPlanById(id);
  }

  @Get('/participant/:participantId')
  async getTravelPlansByParticipantId(
    @Param('participantId', ParseIntPipe) participantId: number,
  ) {
    return this.travelPlansService.getTravelPlansByParticipantId(participantId);
  }

  @Put('/:id')
  async updateTravelPlanByParticipantId(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { data: TravelPlan },
  ) {
    return this.travelPlansService.updateTravelPlanByPlanId(id, body.data);
  }

  @Delete(':id')
  async deleteTravelPlan(@Param('id', ParseIntPipe) id: number) {
    return this.travelPlansService.deleteTravelPlan(id);
  }
}
