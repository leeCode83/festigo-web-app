import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdatePasswordDto, UpdateUsernameDto, UpdateAvatarDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaClient) {}

    private async findUserById(userId: number): Promise<any>{
        const user = await this.prisma.user.findUnique({
            where: {id: userId},
            include: {
                bucketlist: true,
                reviews: { // Ambil ulasan
                    orderBy: { createdAt: 'desc' },
                    include: { // Sertakan event yang diulas
                        event: {
                            select: { id: true, title: true }
                        }
                    }
                },
                threads: { // Ambil diskusi
                    orderBy: { createdAt: 'desc' },
                    include: { // Sertakan event tempat diskusi dibuat
                        event: {
                            select: { id: true, title: true }
                        }
                    }
                }
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
            createdAt: user.createdAt,
            favorite: user.bucketlist,
            reviews: user.reviews,
            avatarUrl: user.avatarUrl,
            threads: user.threads
        };
    }

    // --- FUNGSI BARU DI SINI ---
    /**
     * Mengambil semua item galeri untuk seorang pengguna.
     * @param userId - ID dari pengguna yang galerinya akan diambil.
     * @returns Array dari item galeri.
     */
    async getGalleryForUser(userId: number) {
        return this.prisma.gallery.findMany({
            where: { userId: userId },
            orderBy: {
                createdAt: 'desc', // Urutkan dari yang terbaru
            },
        });
    }
    
    /**
     * Memperbarui URL avatar untuk pengguna tertentu.
     * @param userId - ID pengguna yang akan diperbarui.
     * @param dto - Objek berisi avatarUrl baru.
     */
    async updateAvatar(userId: number, dto: UpdateAvatarDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                avatarUrl: dto.avatarUrl,
            },
            select: { // Hanya kembalikan data yang relevan
                id: true,
                avatarUrl: true,
            },
        });
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
