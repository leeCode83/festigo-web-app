import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserById(@Request() req){
        return this.usersService.getUserInfoById(req.user.id);
    }
}
