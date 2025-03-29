import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto'; 

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaClient) { }
    //Membuat event baru
    async createEvent(dto: CreateEventDto) {
        return this.prisma.event.create({
            data: {
                category: dto.category,
                title: dto.title,
                description: dto.description,
                date: new Date(dto.date),
                location: dto.location,
                image: dto.image,
                ticketUrl: dto.ticketUrl,
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
        return this.prisma.event.findMany({
            where: {
                category: {
                    equals: category,
                    mode: 'insensitive', // Agar pencarian tidak case-sensitive
                },
            },
        });
    }

    //Mengudate event
    async updateEvent(id: number, dto: UpdateEventDto) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event) throw new NotFoundException('Event not found');

        return this.prisma.event.update({
            where: { id },
            data: {
                category: dto.category || event.category,
                title: dto.title || event.title,
                description: dto.description || event.description,
                date: dto.date ? new Date(dto.date) : event.date,
                location: dto.location || event.location,
                image: dto.image || event.image,
                ticketUrl: dto.ticketUrl || event.ticketUrl,
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
        const events = await this.prisma.event.findMany({
            where: {
                date: {
                    lte: new Date()
                }
            },
            select: {
                id: true,
                image: true,
                title: true,
                reviews: { select: { rating: true } }, // Ambil semua rating
                _count: { select: { like: true } }, // Ambil jumlah like
                date: true
            },
            orderBy: {
                like: { _count: 'desc' }, // Urutkan berdasarkan jumlah like
            },
            take: 8, // Ambil 8 event teratas
        });

        // Hitung rata-rata rating secara manual
        return events.map(event => ({
            id: event.id,
            image: event.image,
            title: event.title,
            date: event.date,
            like: event._count.like, // Ambil langsung nilai like tanpa _count
            averageRating: event.reviews.length ? event.reviews.reduce((sum, r) => sum + r.rating, 0) / event.reviews.length : 0, // Jika tidak ada review, rating = 0
        }));
    }

    async getUpcomingEventsCards() {
        const events = await this.prisma.event.findMany({
            where: {
                date: {
                    gte: new Date()
                }
            },
            select: {
                id: true,
                image: true,
                title: true,
                _count: { select: { like: true } }, // Ambil jumlah like
                date: true,
                ticketUrl: true
            },
            orderBy: {
                like: { _count: 'asc' }
            },
        });

        return events.map(event => ({
            id: event.id,
            image: event.image,
            title: event.title,
            date: event.date,
            ticketUrl: event.ticketUrl,
            like: event._count.like
        }));
    }
}
