import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [AuthModule, UserModule, OtpModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
