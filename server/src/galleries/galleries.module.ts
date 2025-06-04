import { Module } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { GalleriesController } from './galleries.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [GalleriesService, PrismaClient],
  controllers: [GalleriesController]
})
export class GalleriesModule {}
