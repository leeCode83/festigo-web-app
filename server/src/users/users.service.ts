import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdatePasswordDto, UpdateUsernameDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaClient) {}

    private async findUserById(userId: number): Promise<any>{
        const user = await this.prisma.user.findUnique({
            where: {id: userId},
            include: {
                bucketlist: true,
                reviews: true,
            }
        });
        return user;
    }

    async getUserInfoById(userId: number){
        const user = await this.findUserById(userId);

        if(!user){
            throw new NotFoundException("User tidak ditemukan");
        }

        return {
            name: user.username,
            email: user.email,
            createAt: user.createdAt,
            favorite: user.bucketlist,
            reviews: user.reviews
        };
    }

    async updateUsername(userId: number, dto: UpdateUsernameDto){
        const user = await this.findUserById(userId);

        if(!user) {
            throw new NotFoundException("User tidak ditemukan");
        }

        return this.prisma.user.update({
            where: {id: userId},
            data: {
                username: dto.username
            }
        })
    }

    async updatePassword(userId: number, dto: UpdatePasswordDto){
        const user = await this.findUserById(userId);

        if(!user) {
            throw new NotFoundException("User tidak ditemukan");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        return this.prisma.user.update({
            where: {id: userId},
            data: {
                password: hashedPassword
            }
        });
    }
}
