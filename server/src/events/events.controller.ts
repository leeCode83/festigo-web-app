import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('events')
export class EventsController {
    constructor(private eventService: EventsService) { }

    // Endpoint untuk membuat event baru
    @Post()
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('ADMIN')
    async createEvent(@Body() dto: CreateEventDto) {
        return this.eventService.createEvent(dto);
    } //Berhasil

    // Endpoint untuk mendapatkan semua event
    @Get()
    async getAllEvents() {
        return this.eventService.getAllEvents();
    } //Berhasil

    // Endpoint untuk mendapatkan event berdasarkan ID
    @Get('event/:id')
    async getEventById(@Param('id') id: number) {
        return this.eventService.getEventById(Number(id));
    } //Berhasil

    // Endpoint untuk mendapatkan event berdasarkan kategori
    @Get('category/:category')
    async getEventsByCategory(@Param('category') category: string) {
        return this.eventService.getEventsByCategory(category);
    } //Berhasil

    // Endpoint untuk mengupdate event berdasarkan ID
    @Patch(':id')
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('ADMIN')
    async updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
        return this.eventService.updateEvent(Number(id), dto);
    } //Berhasil

    // Endpoint untuk menghapus event berdasarkan ID
    @Delete(':id')
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('ADMIN')
    async deleteEvent(@Param('id') id: string) {
        return this.eventService.deleteEvent(Number(id));
    } //Berhasil

    @Get('popular')
    async getPopularEventsCards() {
        return this.eventService.getPopularEventsCards();
    }

    @Get('upcoming')
    async getUpcomingEventCards(){
        return this.eventService.getUpcomingEventsCards();
    }

    @Get('upcoming/all')
    async getAllUpcomingEvents() {
        return this.eventService.getAllUpcomingEvents();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('bucketlist/:id')
    async createBucketlist(@Request() req, @Param('id') id: number){
        return this.eventService.createBucketlist(req.user.id, Number(id));
    }
}
