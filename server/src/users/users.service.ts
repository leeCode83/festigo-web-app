import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaClient) {}

    async getUserInfoById(userId: number){
        const user = await this.prisma.user.findUnique({
            where: {id: userId},
            include: {
                bucketlist: true,
                reviews: true,
            }
        });

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
}
