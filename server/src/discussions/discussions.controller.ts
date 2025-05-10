import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/discussion.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('discussions')
export class DiscussionsController {
    constructor(private readonly discussionsService: DiscussionsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createDiscussion(@Request() req, @Body() createDiscussionDto: CreateDiscussionDto) {
        return this.discussionsService.createDiscussion(req.user.id,createDiscussionDto);
    }
}
