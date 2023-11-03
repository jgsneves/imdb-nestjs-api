import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto, createVoteScheme } from './dto/create-vote.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ZodValidationPipe } from '../validators/zod-validation-pipe';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(createVoteScheme))
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @Get()
  findAll(@Query('movieId', ParseUUIDPipe) movieId: string) {
    return this.votesService.findAll(movieId);
  }
}
