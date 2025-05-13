import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateDiscussionDto } from './dto/discussion.dto';

@Injectable()
export class DiscussionsService {
    constructor(private prisma: PrismaClient) {}

    async createDiscussion(userId: number, dto: CreateDiscussionDto) {
        // Validate that the event exists
        const event = await this.prisma.event.findUnique({
            where: { id: dto.eventId }
        });

        if (!event) {
            throw new NotFoundException(`Event with ID ${dto.eventId} not found`);
        }

        // Membuat thread diskusi, data yang digunakan dapat dilihat di DTO discussion
        try {
            const thread = await this.prisma.thread.create({
                data: {
                    eventId: dto.eventId,
                    userId: userId,
                    title: dto.title,
                    content: dto.content
                }
            });
            return thread;
        } catch (error) {
            throw new BadRequestException('Failed to create discussion thread');
        }
    }
}
