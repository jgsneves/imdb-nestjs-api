import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { VotesService } from 'src/votes/votes.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, VotesService],
})
export class MoviesModule {}
