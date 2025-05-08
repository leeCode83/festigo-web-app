import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';

/**
 * Module that handles all user-related operations.
 *
 * Contains the following:
 * - `UsersService`: Service that contains all the user-related business logic.
 * - `UsersController`: Controller that handles user-related HTTP requests.
 * - `PrismaClient`: The Prisma client that is used to interact with the database.
 */
@Module({
  providers: [UsersService, PrismaClient],
  controllers: [UsersController]
})
export class UsersModule {}
