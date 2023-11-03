import { createMovieValidationMessages } from 'src/constants/validation-request-body-messages';
import { z } from 'zod';

export const createMovieSchema = z.object({
  name: z.string({ required_error: createMovieValidationMessages.name }),
  releaseDate: z.string().datetime({
    message: createMovieValidationMessages.releaseDate,
  }),
  genre: z.string({ required_error: createMovieValidationMessages.genre }),
  directorName: z.string({
    required_error: createMovieValidationMessages.directorName,
  }),
  actors: z.string().array().nonempty({
    message: createMovieValidationMessages.actors,
  }),
});

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
