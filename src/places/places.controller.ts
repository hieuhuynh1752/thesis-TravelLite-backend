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
import { PlacesService } from './places.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';
import { Place } from '../users/entities/place.entity';

@Controller('places')
@UseGuards(JwtStrategy)
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post()
  async createPlace(
    @Body()
    body: Omit<Place, 'id' | 'createdAt'>,
  ) {
    return this.placesService.checkOrCreatePlace(body);
  }

  @Get()
  async getAllPlaces() {
    return this.placesService.getAllPlaces();
  }

  @Get(':id')
  async getPlaceById(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.getPlaceById(id);
  }

  @Put(':id')
  async updatePlace(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      name?: string;
      address?: string;
    },
  ) {
    return this.placesService.updatePlace(id, body);
  }

  @Delete(':id')
  async deletePlace(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.deletePlace(id);
  }
}
