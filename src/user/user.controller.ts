import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  async getProfile(@Req() req) {
    try {
      console.log(req);
      const { userId } = req.userId;

      if (!userId) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.getById(userId);

      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
