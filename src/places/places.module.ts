import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, PrismaService],
  exports: [PlacesService],
})
export class PlacesModule {}
