import { IsString, IsUrl } from 'class-validator';

export class UpdateUsernameDto {
    @IsString()
    username: string;
}

export class UpdatePasswordDto {
    @IsString()
    password: string;
}

export class UpdateAvatarDto {
    @IsString()
    @IsUrl()
    avatarUrl: string;
  }