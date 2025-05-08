import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { DiscussionsModule } from './discussions/discussions.module';

@Module({
  imports: [AuthModule, EventsModule, ReviewsModule, UsersModule, DiscussionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
