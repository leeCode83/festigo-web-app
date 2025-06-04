import { IsUrl, IsString } from "class-validator";

export class CreateGalleryDto {
  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsString()
  caption?: string;
}
