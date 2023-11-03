import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, createMovieSchema } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ZodValidationPipe } from '../validators/zod-validation-pipe';
import { VotesService } from '../votes/votes.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly votesService: VotesService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ZodValidationPipe(createMovieSchema))
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(
    @Query('directorName') directorName?: string,
    @Query('genre') genre?: string,
    @Query('name') name?: string,
    @Query('actors') actors?: string,
  ) {
    const actorsQueryParam = this.parseFindAllActorsQueryParam(actors);

    return this.moviesService.findAll({
      directorNameFilter: directorName,
      genreFilter: genre,
      movieNameFilter: name,
      actorsFilter: actorsQueryParam,
    });
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.moviesService.findOne(uuid);
  }

  @Get(':uuid/votes-average')
  findOneMovieAverage(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.votesService.findVoteAverageByMovieId(uuid);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(uuid, updateMovieDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.moviesService.remove(uuid);
  }

  private parseFindAllActorsQueryParam(actorsQueryParam?: string) {
    if (actorsQueryParam) return actorsQueryParam.split(',');
    return [];
  }
}
