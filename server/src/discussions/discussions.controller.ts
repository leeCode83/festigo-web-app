import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto, CreateReplyDto } from './dto/discussion.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('discussions')
export class DiscussionsController {
    constructor(private readonly discussionsService: DiscussionsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createDiscussion(@Request() req, @Body() createDiscussionDto: CreateDiscussionDto) {
        return this.discussionsService.createDiscussion(req.user.id, createDiscussionDto);
    }

    @Get('/:id')
    async getDiscussionById(@Param('id') threadId: number){
        return this.discussionsService.showForumById(Number(threadId))
    }

    @Post('reply')
    @UseGuards(AuthGuard('jwt'))
    async createReply(@Request() req, @Body() createReplyDto: CreateReplyDto) {
        return this.discussionsService.createReply(req.user.id, createReplyDto);
    }
}
