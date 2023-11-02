import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { email: userEmail, id, name, role } = user;

    const payload = { sub: id, email: userEmail, name, role };

    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: 60000,
    };
  }
}
