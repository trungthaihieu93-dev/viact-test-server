import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JWT_EXPIRE_TIME } from 'src/core/config/auth';

import { UserModule } from 'src/user/user.module';
import { OtpModule } from 'src/otp/otp.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule,
    OtpModule,
    JwtModule.register({
      secret: process?.env?.JWT_SECRET_KEY || 'jwt_secret',
      signOptions: { expiresIn: JWT_EXPIRE_TIME },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
