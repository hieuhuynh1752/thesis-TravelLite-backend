import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Place } from '../users/entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async createPlace(data: Omit<Place, 'id' | 'createdAt'>): Promise<Place> {
    return this.prisma.place.create({ data });
  }

  async getAllPlaces() {
    return this.prisma.place.findMany();
  }

  async getPlaceById(id: number) {
    const place = await this.prisma.place.findUnique({ where: { id } });
    if (!place) throw new NotFoundException(`Place with ID ${id} not found`);
    return place;
  }

  async updatePlace(
    id: number,
    data: {
      name?: string;
      address?: string;
    },
  ) {
    return this.prisma.place.update({ where: { id }, data });
  }

  async deletePlace(id: number) {
    return this.prisma.place.delete({ where: { id } });
  }

  async checkOrCreatePlace(
    data: Omit<Place, 'id' | 'createdAt'>,
  ): Promise<Place> {
    const existingPlace = await this.prisma.place.findUnique({
      where: { googlePlaceId: data.googlePlaceId },
    });
    if (existingPlace) {
      return existingPlace;
    }
    return this.createPlace(data);
  }
}
