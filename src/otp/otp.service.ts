import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { getRandomOTP } from 'src/utils/number';
import { OTP_LENGTH } from 'src/core/constants/number';

import { Otp } from './entities/otp.entity';
import { OTP_TYPES } from 'src/core/enums/otp';

@Injectable()
export class OtpService {
  constructor(
    @Inject('OTP_REPOSITORY')
    private otpRepository: Repository<Otp>,
  ) {}

  private async refresh(type: OTP_TYPES, userId: number): Promise<void> {
    await this.otpRepository.update(
      {
        user: userId,
        isActive: true,
        type,
      },
      { isActive: false },
    );
  }

  async generateOTP(type: OTP_TYPES, userId?: number): Promise<string> {
    await this.refresh(type, userId);

    const otpContent = getRandomOTP(OTP_LENGTH);

    const newOTP: Partial<Otp> = {
      content: otpContent,
      user: userId,
      type,
    };

    await this.otpRepository.insert(newOTP);

    return otpContent;
  }

  async verifyOTP(otp: string, userId: number) {}
}
