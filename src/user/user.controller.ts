import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/me')
  async getProfile() {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}
