import { Module } from '@nestjs/common';
import { EmissionFactorsService } from './emissionFactors.service';
import { EmissionFactorsController } from './emissionFactors.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EmissionFactorsController],
  providers: [EmissionFactorsService, PrismaService],
  exports: [EmissionFactorsService],
})
export class EmissionFactorsModule {}
