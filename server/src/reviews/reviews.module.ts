import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [ReviewsService, PrismaClient],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
