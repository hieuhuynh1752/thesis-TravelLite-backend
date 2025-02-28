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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmissionFactorsService } from './emissionFactors.service';
import { JwtStrategy } from '../auth/jwt/jwt.guard';
import { EmissionFactor } from '../entities/emission-factor.entity';

@Controller('emissionFactors')
@UseGuards(JwtStrategy)
export class EmissionFactorsController {
  constructor(private emissionFactorsService: EmissionFactorsService) {}

  @Post()
  async createEmissionFactor(
    @Body()
    body: Omit<EmissionFactor, 'id'>,
  ) {
    return this.emissionFactorsService.checkOrCreateEmissionFactor(body);
  }

  @Get()
  async getAllEmissionFactors() {
    return this.emissionFactorsService.getAllEmissionFactors();
  }

  @Get(':id')
  async getEmissionFactorById(@Param('id', ParseIntPipe) id: number) {
    return this.emissionFactorsService.getEmissionFactorById(id);
  }

  @Put(':id')
  async updateEmissionFactor(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      vehicleType?: string;
      value?: number;
    },
  ) {
    return this.emissionFactorsService.updateEmissionFactor(id, body);
  }

  @Delete(':id')
  async deleteEmissionFactor(@Param('id', ParseIntPipe) id: number) {
    return this.emissionFactorsService.deleteEmissionFactor(id);
  }

  @Post('calculate')
  async calculateEmissions(@Body() body: any) {
    try {
      const { steps } = body;
      if (!Array.isArray(steps)) {
        throw new HttpException(
          { error: "Invalid input: 'steps' must be an array." },
          HttpStatus.BAD_REQUEST,
        );
      }
      const enrichedSteps =
        await this.emissionFactorsService.calculateEmissions(steps);
      return { steps: enrichedSteps };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { error: 'Internal server error.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
