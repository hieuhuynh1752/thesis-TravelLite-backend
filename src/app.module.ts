import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { PlacesModule } from './places/places.module';
import { EventParticipantsModule } from './event-participants/event-participants.module';
import { EmissionFactorsModule } from './emissionFactors/emissionFactors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.docker' : '.env',
    }),
    UsersModule,
    AuthModule,
    EventsModule,
    TravelPlansModule,
    PlacesModule,
    EventParticipantsModule,
    EmissionFactorsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
