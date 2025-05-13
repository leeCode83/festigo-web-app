import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReviewDto, UpdateReviewDto } from './dto/reviews.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewService: ReviewsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post(':eventId')
    createReview(@Request() req, @Param('eventId') eventId: number, @Body() dto: CreateReviewDto) {
        return this.reviewService.createReview(req.user.id, Number(eventId), dto);
    }   //berhasil

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    updateReview(@Request() req, @Param('id') reviewId: number, @Body() dto: UpdateReviewDto) {
        return this.reviewService.updateReview(req.user.id, Number(reviewId), dto);
    }   //Berhasil

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteReview(@Request() req, @Param('id') reviewId: number) {
        return this.reviewService.deleteReview(req.user.id, Number(reviewId));
    }   //Berhasil

    //Melihat semua review yang dibuat oleh user tertentu
    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:userId')
    getReviewsByUser(@Param('userId') userId: number) {
        return this.reviewService.getReviewsByUser(Number(userId));
    }   //Berhasil
}
