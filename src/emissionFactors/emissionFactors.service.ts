import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmissionFactor } from '../entities/emission-factor.entity';

@Injectable()
export class EmissionFactorsService {
  constructor(private prisma: PrismaService) {}

  async createEmissionFactor(
    data: Omit<EmissionFactor, 'id'>,
  ): Promise<EmissionFactor> {
    return this.prisma.emissionFactor.create({ data });
  }

  async getAllEmissionFactors() {
    return this.prisma.emissionFactor.findMany();
  }

  async getEmissionFactorById(id: number) {
    const emissionFactor = await this.prisma.emissionFactor.findUnique({
      where: { id },
    });
    if (!emissionFactor)
      throw new NotFoundException(`EmissionFactor with ID ${id} not found`);
    return emissionFactor;
  }

  async updateEmissionFactor(
    id: number,
    data: {
      vehicleType?: string;
      value?: number;
    },
  ) {
    return this.prisma.emissionFactor.update({ where: { id }, data });
  }

  async deleteEmissionFactor(id: number) {
    return this.prisma.emissionFactor.delete({ where: { id } });
  }

  async checkOrCreateEmissionFactor(
    data: Omit<EmissionFactor, 'id'>,
  ): Promise<EmissionFactor> {
    const existingEmissionFactor = await this.prisma.emissionFactor.findUnique({
      where: { vehicleType: data.vehicleType },
    });
    if (existingEmissionFactor) {
      return existingEmissionFactor;
    }
    return this.createEmissionFactor(data);
  }

  async calculateEmissions(steps: any[]) {
    return await Promise.all(
      steps.map(async (step) => {
        const { distance, vehicleType, type } = step;

        const co2 = await this.calculateEmissionsForStep(
          distance,
          type,
          vehicleType,
        );
        return { ...step, co2: parseFloat((co2 / 1000).toFixed(2)) };
      }),
    );
  }

  private async calculateEmissionsForStep(
    distance: number,
    type: string,
    vehicleType?: string,
  ): Promise<number> {
    const factorRecord = await this.prisma.emissionFactor.findUnique({
      where: { vehicleType: vehicleType || type },
    });
    const factor = factorRecord?.value || 0;
    return (distance / 1000) * factor;
  }
}
