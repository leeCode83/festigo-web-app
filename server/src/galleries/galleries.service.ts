import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Gallery } from '@prisma/client';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Injectable()
export class GalleriesService {
  constructor(private prisma: PrismaClient) {}

  async createGallery(dto: CreateGalleryDto, userId: number): Promise<Gallery> {
    const existingMedia = await this.prisma.gallery.findFirst({
      where: { imageUrl: dto.imageUrl}
    })

    if(existingMedia){
      throw new BadRequestException("Image already exist")
    }
    
    return this.prisma.gallery.create({
      data: {
        imageUrl: dto.imageUrl,
        caption: dto.caption,
        userId: userId,
      },
    });
  }

  async getAllGalleries(){
    return this.prisma.gallery.findMany();
  }
}

