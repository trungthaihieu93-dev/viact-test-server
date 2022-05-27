import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { RateLimiterModule } from './rate-limiter/rate-limiter.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ResponseInterceptor } from './core/interceptors/response.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    OtpModule,
    EmailModule,
    RateLimiterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
