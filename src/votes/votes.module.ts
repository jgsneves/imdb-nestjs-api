import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [VotesController],
  providers: [VotesService, PrismaService],
  exports: [VotesService],
})
export class VotesModule {}
