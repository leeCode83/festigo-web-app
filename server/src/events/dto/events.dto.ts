import { IsString, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class CreateEventDto {
    @IsString()
    category: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    date: string; // Format ISO 8601 (contoh: "2025-05-30T18:00:00.000Z")

    @IsString()
    location: string;

    @IsOptional()
    @IsUrl()
    image?: string; // Bisa berupa URL atau path gambar

    @IsOptional()
    @IsUrl()
    ticketUrl?: string; // Link eksternal untuk pembelian tiket
}

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    date?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsUrl()
    image?: string;

    @IsOptional()
    @IsUrl()
    ticketUrl?: string;
}
