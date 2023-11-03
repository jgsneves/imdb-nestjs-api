import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { prisma } from 'src/clients/prisma-client';
import { Vote } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { createNewVoteMessages } from 'src/constants/response-messages';

type CreateVoteData = Omit<Vote, 'createdAt' | 'updatedAt'>;

@Injectable()
export class VotesService {
  async create(createVoteDto: CreateVoteDto) {
    const { movieId, userId, value } = createVoteDto;

    const vote = await prisma.vote.findMany({
      where: {
        movieId,
        userId,
      },
    });

    if (vote.length > 0)
      throw new BadRequestException(
        createNewVoteMessages.ESTE_USUARIO_JA_VOTOU_FILME,
      );

    const data: CreateVoteData = {
      id: uuid(),
      movieId,
      userId,
      value,
    };

    const result = await prisma.vote.create({ data });

    return result;
  }

  async findAll(movieIdFilter?: string) {
    const result = await prisma.vote.findMany({
      where: {
        movieId: movieIdFilter,
      },
    });

    return result;
  }

  async findVoteAverageByMovieId(movieId: string) {
    let average = 0;

    const votes = await prisma.vote.findMany({
      where: {
        movieId,
      },
      select: {
        value: true,
      },
    });

    if (votes.length === 0)
      return {
        average,
      };

    const sum = votes.reduce((prev, current) => prev + current.value, 0);
    average = sum / votes.length;

    return {
      average,
    };
  }
}
