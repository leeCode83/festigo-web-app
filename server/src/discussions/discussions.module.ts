import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [DiscussionsService, PrismaClient],
  controllers: [DiscussionsController]
})
export class DiscussionsModule {}
