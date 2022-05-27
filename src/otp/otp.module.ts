import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/core/modules/database.module';

import { OtpController } from './otp.controller';

import { OtpService } from './otp.service';

import { otpProviders } from './otp.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OtpController],
  providers: [OtpService, ...otpProviders],
  exports: [OtpService, ...otpProviders],
})
export class OtpModule {}
