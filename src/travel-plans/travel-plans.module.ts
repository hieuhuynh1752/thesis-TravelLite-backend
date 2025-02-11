import { Module } from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TravelPlansController],
  providers: [TravelPlansService, PrismaService],
  exports: [TravelPlansService],
})
export class TravelPlansModule {}
