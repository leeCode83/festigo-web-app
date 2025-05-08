import { IsString } from 'class-validator';

export class UpdateUsernameDto {
    @IsString()
    username: string;
}

export class UpdatePasswordDto {
    @IsString()
    password: string;
}