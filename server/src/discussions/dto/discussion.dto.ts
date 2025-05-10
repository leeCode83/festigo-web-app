import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDiscussionDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateDiscussionDto extends PartialType(CreateDiscussionDto) {}
