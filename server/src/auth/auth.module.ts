import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { JwtStrategy } from './strategy/jwt.strategy'; 
import { RolesGuard } from './guard/roles.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, JwtService, PrismaClient, JwtStrategy, RolesGuard, ConfigService],
  controllers: [AuthController]
})
export class AuthModule { }
