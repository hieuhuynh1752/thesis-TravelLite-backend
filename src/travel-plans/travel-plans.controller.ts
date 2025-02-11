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
  async createTravelPlan(body: TravelPlan) {
    return this.travelPlansService.createTravelPlan(body);
  }

  @Get()
  async getAllTravelPlans() {
    return this.travelPlansService.getAllTravelPlans();
  }

  @Get(':id')
  async getTravelPlanById(@Param('id', ParseIntPipe) id: number) {
    return this.travelPlansService.getTravelPlanById(id);
  }

  @Put(':id')
  async updateTravelPlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { originPlaceId: number; destinationPlaceId: number },
  ) {
    return this.travelPlansService.updateTravelPlan(id, body);
  }

  @Delete(':id')
  async deleteTravelPlan(@Param('id', ParseIntPipe) id: number) {
    return this.travelPlansService.deleteTravelPlan(id);
  }
}
