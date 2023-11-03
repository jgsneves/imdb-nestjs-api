import { z } from 'zod';

export const createVoteScheme = z.object({
  value: z.number().min(0).max(4),
  userId: z.string().uuid(),
  movieId: z.string().uuid(),
});

export type CreateVoteDto = z.infer<typeof createVoteScheme>;
