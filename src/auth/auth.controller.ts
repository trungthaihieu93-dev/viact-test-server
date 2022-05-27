import {
  Body,
  Controller,
  Post,
  Res,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';

import { parseError, parseResponse } from 'src/core/responses/base';

import { LocalAuthGuard } from './guards/local.guard';
import { LoginFormDTO, RegisterFormDTO } from './dtos/auth.dto';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { OtpService } from 'src/otp/otp.service';

import { OTP_TYPES } from 'src/core/enums/otp';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private otpService: OtpService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() _: LoginFormDTO, @Req() req, @Res() res) {
    try {
      const token = await this.authService.login(req.user);

      return res.status(200).send(
        parseResponse({
          access_token: token,
        }),
      );
    } catch (error) {
      return res.status(500).send(parseError('Internal Server Error', 500));
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register(@Body() registerForm: RegisterFormDTO, @Res() res) {
    try {
      const existedUser = await this.userService.findExistedUser(
        registerForm.email,
        registerForm.username,
      );

      if (existedUser) {
        return res.status(400).send(parseError('User existed!', 400));
      }

      // create new user
      const newUser = await this.userService.create(registerForm);

      // generate OTP
      const otp = await this.otpService.generateOTP(
        OTP_TYPES.REGISTRATION,
        newUser.id,
      );

      // TODO: send email

      return res.status(201).send(parseResponse('Registered successfully!'));
    } catch (error) {
      console.log(error);
      return res.status(500).send(parseError('Internal Server Error', 500));
    }
  }

  @Post('/reset-password')
  async resetPassword() {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}
