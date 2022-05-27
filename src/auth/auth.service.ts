import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';

import { generateHash, isPasswordMatch } from 'src/utils/password';

import { JWTPayload } from './interfaces/jwt';
import { ResetPasswordFormDTO } from './dtos/auth.dto';
import e from 'express';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.fetchUserCredentials(email);

    if (user && (await isPasswordMatch(pass, user.password))) {
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

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async resetPassword(resetPasswordFormDto: ResetPasswordFormDTO) {
    const { email, oldPassword, newPassword } = resetPasswordFormDto;

    const user = await this.userService.fetchUserCredentials(email);

    if (user && (await isPasswordMatch(oldPassword, user.password))) {
      const payload: Partial<User> = {
        password: await generateHash(newPassword),
      };

      await this.userService.update(user.id, payload);
    } else {
      throw new BadRequestException('Wrong password');
    }
  }
}
