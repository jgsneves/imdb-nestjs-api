import { ApiProperty } from '@nestjs/swagger';
import { signInValidationMessages } from 'src/constants/validation-request-body-messages';
import { z } from 'zod';

export const signInDto = z.object({
  email: z.string().email({ message: signInValidationMessages.email }),
  password: z.string(),
});

export type SignInDto = z.infer<typeof signInDto>;

export class SignInDtoSwagger {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
