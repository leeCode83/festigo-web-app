import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaClient } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [EventsService, PrismaClient, RolesGuard, JwtService],
  controllers: [EventsController]
})
export class EventsModule {}
