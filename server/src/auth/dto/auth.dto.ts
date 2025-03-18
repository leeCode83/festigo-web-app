import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string; // Email pengguna (harus valid dan tidak boleh kosong)

    @IsString()
    @IsNotEmpty()
    username: string; // Username pengguna (harus berupa string dan tidak boleh kosong)

    @IsString()
    @IsNotEmpty()
    password: string; // Password pengguna (harus berupa string dan tidak boleh kosong)
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email?: string; // Email opsional, bisa digunakan untuk login

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username?: string; // Username opsional, bisa digunakan untuk login

    @IsString()
    @IsNotEmpty()
    password: string; // Password pengguna (harus berupa string dan tidak boleh kosong)
}
