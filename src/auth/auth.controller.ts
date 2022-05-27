import {
  Body,
  Controller,
  Post,
  Res,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { parseError, parseResponse } from 'src/core/responses/base';

import { LocalAuthGuard } from './guards/local.guard';
import { LoginFormDTO, RegisterFormDTO } from './dtos/auth.dto';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
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
      const user = await this.userService.findByEmail(registerForm.email);

      if (user) {
        return res.status(400).send(parseError('User existed!', 400));
      }

      const result = await this.userService.create(registerForm);

      return res.status(201).send(parseResponse(result));
    } catch (error) {
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
