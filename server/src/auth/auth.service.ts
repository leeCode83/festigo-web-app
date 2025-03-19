import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaClient, private jwtService: JwtService, private configService: ConfigService) { }

    // Fungsi untuk generate JWT Token dengan secret key dari .env
    private generateToken(user: { id: number; email: string; role: string }) {
        return this.jwtService.sign(user, {
            secret: this.configService.get<string>('JWT_SECRET'), // Mengambil secret dari .env
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'), // Mengatur waktu kedaluwarsa token
        });
    }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { OR: [{ email: dto.email }, { username: dto.username }] },
        });

        if (existingUser) throw new BadRequestException('Email or username already existed');

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                password: hashedPassword
            }
        });

        const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
        return { token, username: user.username };
    }

    async login(dto: LoginDto) {
        // const { email, username, password } = dto;

        const user = await this.prisma.user.findFirst({
            where: { OR: [{ email: dto.email }, { username: dto.username }] },
        });

        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
        return { token, username: user.username };
    }
}
