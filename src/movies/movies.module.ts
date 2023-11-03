import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { VotesService } from 'src/votes/votes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, VotesService, PrismaService],
})
export class MoviesModule {}
