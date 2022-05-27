import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JWTPayload } from '../interfaces/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JWTPayload, done: any) {
    const user = await this.userService.findExistedUser(
      payload.email,
      payload.username,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid Token');
    }

    done(null, { userId: payload.id });
  }
}
