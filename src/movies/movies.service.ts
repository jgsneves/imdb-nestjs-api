import { Injectable } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from '@prisma/client';
import { prisma } from 'src/clients/prisma-client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { v4 as uuid } from 'uuid';

type OmitMovieData = Omit<Movie, 'createdAt' | 'updatedAt' | 'releaseDate'>;

interface CreateMovieData extends OmitMovieData {
  releaseDate: string;
}

@Injectable()
export class MoviesService {
  async create(createMovieDto: CreateMovieDto) {
    const { actors, directorName, genre, name, releaseDate } = createMovieDto;
    const data: CreateMovieData = {
      actors,
      directorName,
      genre,
      id: uuid(),
      name,
      releaseDate,
    };

    const result = await prisma.movie.create({
      data,
    });

    return result;
  }

  async findAll() {
    const result = await prisma.movie.findMany();

    return result;
  }

  async findOne(guid: string) {
    const result = await prisma.movie.findUnique({ where: { id: guid } });

    return result;
  }

  async update(guid: string, updateMovieDto: UpdateMovieDto) {
    const result = await prisma.movie.update({
      where: { id: guid },
      data: { ...updateMovieDto },
    });

    return result;
  }

  async remove(guid: string) {
    await prisma.movie.delete({ where: { id: guid } });
  }
}
