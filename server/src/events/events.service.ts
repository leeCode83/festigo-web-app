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
}
