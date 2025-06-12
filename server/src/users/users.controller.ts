import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAvatarDto, UpdateUsernameDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserById(@Request() req){
        return this.usersService.getUserInfoById(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me/gallery')
    async getMyGallery(@Request() req) {
        // Endpoint ini khusus untuk mengambil galeri milik pengguna yang sedang login
        return this.usersService.getGalleryForUser(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('avatar')
    async updateAvatar(@Request() req, @Body() dto: UpdateAvatarDto) {
        return this.usersService.updateAvatar(req.user.id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('update-username')
    async updateUsername(@Request() req, @Body() dto: UpdateUsernameDto){
        return this.usersService.updateUsername(req.user.id, dto);
    }
    
}
