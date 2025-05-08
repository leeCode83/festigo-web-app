import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUsernameDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserById(@Request() req){
        return this.usersService.getUserInfoById(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('update-username')
    async updateUsername(@Request() req, @Body() dto: UpdateUsernameDto){
        return this.usersService.updateUsername(req.user.id, dto);
    }
    
}
