import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.docker' : '.env',
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
