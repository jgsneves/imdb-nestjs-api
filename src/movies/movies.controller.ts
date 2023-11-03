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
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ZodValidationPipe } from 'src/validators/zod-validation-pipe';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @UsePipes(new ZodValidationPipe(createMovieSchema))
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(
    @Query('directorName') directorName: string,
    @Query('genre') genre: string,
    @Query('name') name: string,
    @Query('actors') actors: string,
  ) {
    const actorsQueryParam = this.parseFindAllActorsQueryParam(actors);

    console.log('queryParams', { directorName, genre, name, actorsQueryParam });
    return this.moviesService.findAll({
      directorNameFilter: directorName,
      genreFilter: genre,
      movieNameFilter: name,
      actorsFilter: actorsQueryParam,
    });
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.moviesService.findOne(uuid);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(uuid, updateMovieDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.moviesService.remove(uuid);
  }

  private parseFindAllActorsQueryParam(actorsQueryParam?: string) {
    if (actorsQueryParam) return actorsQueryParam.split(',');
    return [];
  }
}
