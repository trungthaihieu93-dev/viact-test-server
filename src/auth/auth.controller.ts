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
} from '@nestjs/common';

import { parseResponse } from 'src/core/responses/base';

import { LocalAuthGuard } from './guards/local.guard';
import { LoginFormDTO, RegisterFormDTO } from './dtos/auth.dto';

import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
      throw new InternalServerErrorException(error);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register() {
    try {
    } catch (error) {
      console.error(error);
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
