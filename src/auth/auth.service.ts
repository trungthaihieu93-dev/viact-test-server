import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';

import { isPasswordMatch } from 'src/utils/password';

import { JWTPayload } from './interfaces/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && isPasswordMatch(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload: JWTPayload = {
      email: user.email,
      username: user.username,
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
