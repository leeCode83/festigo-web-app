import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto'; 

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaClient) {}

    private async getEventCards(options: { 
        where: any,
        take?: number 
    }) {
        try {
            // Fetch events with their reviews
            const events = await this.prisma.event.findMany({
                where: options.where,
                select: {
                    id: true,
                    image: true,
                    title: true,
                    date: true,
                    location: true,
                    _count: {
                        select: {
                            like: true
                        }
                    },
                    reviews: {
                        select: {
                            rating: true
                        }
                    }
                }
            });

            // Calculate average rating, transform and sort events
            const transformedEvents = events
                .map(event => ({
                    id: event.id,
                    image: event.image,
                    title: event.title,
                    date: event.date,
                    location: event.location,
                    likes: event._count.like,
                    averageRating: event.reviews.length > 0
                        ? +(event.reviews.reduce((acc, review) => acc + review.rating, 0) / event.reviews.length).toFixed(1)
                        : 0
                }))
                .sort((a, b) => b.averageRating - a.averageRating);

            // Apply limit if specified
            return options.take ? transformedEvents.slice(0, options.take) : transformedEvents;
        } catch (error) {
            throw new BadRequestException('Failed to fetch events');
        }
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
        return this.prisma.event.findMany({
            select: {
                id: true,
                title: true,
                image: true,
                date: true
            },
            orderBy: {
                createdAt: 'desc', // Urutkan berdasarkan tanggal terbaru
            },
        });
    }
    

    //ambil event berdasarkan ID
    async getEventById(id: number) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: { select: { username: true } },
                        createdAt: true
                    }
                },
                threads: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        user: { select: { username: true } },
                        createdAt: true,
                        replies: true, // Keep replies if you still need the actual reply data
                        _count: { // Add this to count replies
                            select: { replies: true }
                        }
                    }
                }
            }
        });
    
        if (!event) throw new NotFoundException('Event not found');
    
        // Flatten reviews
        const flattenedReviews = event.reviews.map((review) => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            username: review.user.username,
            createdAt: review.createdAt,
        }));
    
        // Flatten threads
        const flattenedThreads = event.threads.map((thread) => ({
            id: thread.id,
            title: thread.title,
            content: thread.content,
            username: thread.user.username,
            createdAt: thread.createdAt,
            replies: thread.replies, // Keep this if you still need the actual reply data
            replyCount: thread._count?.replies ?? 0 // Add replyCount
        }));
    
        // Return a new object with flattened data
        return {
            ...event,
            reviews: flattenedReviews,
            threads: flattenedThreads,
        };
    }
    

    //ambil event berdasarkan kategory
    async getEventsByCategory(category: string) {
       return this.getEventCards({
            where: {
                category: {
                    equals: category,
                    mode: 'insensitive', // Agar pencarian tidak case-sensitive
                }
            },
            take: 8
        });
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
            take: 8
        });
    }

    async getUpcomingEventsCards() {
        return this.getEventCards({
            where: { date: { gte: new Date() } },
            take: 8
        });
    }

    /**
     * Mengambil semua event yang akan datang untuk ditampilkan di kalender.
     * Hanya memilih field yang diperlukan untuk efisiensi.
     */
    async getAllUpcomingEvents() {
        return this.prisma.event.findMany({
            where: {
                date: {
                    gte: new Date(),
                },
            },
            select: {
                id: true,
                title: true,
                date: true,
            },
            orderBy: {
                date: 'asc',
            },
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