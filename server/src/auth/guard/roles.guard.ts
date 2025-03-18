import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        // Mendapatkan role yang dibutuhkan dari metadata
        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

        // Jika endpoint tidak membutuhkan role tertentu, izinkan akses
        if (!requiredRoles) {
            return true;
        }

        // Mendapatkan request dari context
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new ForbiddenException('No authentication token provided');
        }

        // Mendapatkan token dari header
        const token = authHeader.split(' ')[1];

        try {
            // Decode JWT untuk mendapatkan informasi user
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            });
            // console.log('Decoded Token:', decoded); // Log hasil decode

            // Memeriksa apakah role user sesuai dengan yang dibutuhkan
            if (!requiredRoles.includes(decoded.role)) {
                throw new ForbiddenException('You do not have permission to access this resource');
            }

            return true;
        } catch (error) {
            console.error('JWT Verification Error:', error); // Log error
            throw new ForbiddenException('Invalid or expired token');
        }
    }
}
