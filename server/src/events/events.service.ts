import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto'; 

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaClient) {}

    private async getEventCards(options: { 
        where: any, 
        includeRating?: boolean,
        orderBy?: any,
        take?: number 
    }) {
        const events = await this.prisma.event.findMany({
            where: options.where,
            select: {
                id: true,
                image: true,
                title: true,
                description: true,
                date: true,
                location: true,
                ticketUrl: true,
                _count: {
                    select: {
                        like: true
                    }
                },
                reviews: options.includeRating ? {
                    select: {
                        rating: true
                    }
                } : undefined
            },
            orderBy: options.orderBy,
            take: options.take
        });

        return events.map(event => {
            const baseEvent = {
                id: event.id,
                image: event.image,
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
                ticketUrl: event.ticketUrl,
                like: event._count.like
            };

            if (options.includeRating && event.reviews) {
                return {
                    ...baseEvent,
                    averageRating: event.reviews.length > 0
                        ? event.reviews.reduce((sum, r) => sum + r.rating, 0) / event.reviews.length
                        : 0
                };
            }

            return baseEvent;
        });
    }

    //Membuat event baru
    async createEvent(dto: CreateEventDto) {
        return this.prisma.event.create({
            data: {
                ...dto,
                date: new Date(dto.date)
            },
        });
    }

    // Ambil semua event
    async getAllEvents() {
        return this.prisma.event.findMany();
    }

    //ambil event berdasarkan ID
    async getEventById(id: number) {
        const event = await this.prisma.event.findUnique({
            where: { id }
        });

        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    //ambil event berdasarkan kategory
    async getEventsByCategory(category: string) {
        const events = await this.prisma.event.findMany({
            where: {
                category: {
                    equals: category,
                    mode: 'insensitive', // Agar pencarian tidak case-sensitive
                },
            },
        });

        if (!events.length) {
            throw new NotFoundException(`No events found for category: ${category}`);
        }

        return events;
    }

    //Mengudate event
    async updateEvent(id: number, dto: UpdateEventDto) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event) throw new NotFoundException('Event not found');

        const { id: _, createdAt, updatedAt, ...eventData } = event;
        return this.prisma.event.update({
            where: { id },
            data: {
                ...eventData,
                ...dto,
                date: dto.date ? new Date(dto.date) : event.date
            },
        });
    }

    //Menghapus event
    async deleteEvent(id: number) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event) throw new NotFoundException('Event not found');

        await this.prisma.event.delete({ where: { id } });
        return { message: 'Event deleted successfully' };
    }

    async getPopularEventsCards() {
        return this.getEventCards({
            where: { date: { lte: new Date() } },
            includeRating: true,
            orderBy: { like: { _count: 'desc' } },
            take: 8
        });
    }

    async getUpcomingEventsCards() {
        return this.getEventCards({
            where: { date: { gte: new Date() } },
            orderBy: { like: { _count: 'asc' } }
        });
    }

    async createBucketlist(userId: number, eventId: number){
        const existingEvent = await this.prisma.event.findUnique({
            where: { id: eventId}
        });

        if(!existingEvent){
            throw new NotFoundException("Event not found");
        }

        const userBucketlist = await this.prisma.bucketlist.create({
            data: {
                userId,
                eventId
            }
        });

        return userBucketlist;
    }
}
