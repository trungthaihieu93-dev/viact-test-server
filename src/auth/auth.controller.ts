import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/login')
  async login() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

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
