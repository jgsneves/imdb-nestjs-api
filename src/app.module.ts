import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [UsersModule, AuthModule, MoviesModule, VotesModule],
})
export class AppModule {}
