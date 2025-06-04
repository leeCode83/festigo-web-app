import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createGallery(@Body() dto: CreateGalleryDto, @Request() req) {
    return this.galleriesService.createGallery(dto, req.user.id);
  }

  @Get()
  async getGalleries(){
    return this.galleriesService.getAllGalleries();
  }
}
