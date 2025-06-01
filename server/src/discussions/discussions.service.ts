import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateDiscussionDto, CreateReplyDto } from './dto/discussion.dto';

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

    async showForumById(threadId: number){
        try{
            return await this.prisma.thread.findUnique({
                where: { id: threadId},
                include: {
                    replies: true
                }
            });
        } catch (error){
            throw new NotFoundException(`Thread with ID ${threadId} not found`);
        }
    }

    /**
     * Creates a reply to a discussion thread
     * @param userId - ID of the user creating the reply
     * @param dto - Data for creating the reply
     * @returns The created reply
     * @throws NotFoundException if the discussion thread doesn't exist
     * @throws BadRequestException if reply creation fails
     */
    async createReply(userId: number, dto: CreateReplyDto) {
        // Validate that the discussion thread exists
        const thread = await this.prisma.thread.findUnique({
            where: { id: dto.discussionId }
        });

        if (!thread) {
            throw new NotFoundException(`Discussion thread with ID ${dto.discussionId} not found`);
        }

        // Create the reply
        try {
            const reply = await this.prisma.reply.create({
                data: {
                    threadId: dto.discussionId,
                    userId: userId,
                    content: dto.content
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            return reply;
        } catch (error) {
            throw new BadRequestException('Failed to create reply');
        }
    }
}
