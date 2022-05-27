import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { parseError, parseResponse } from 'src/core/responses/base';

import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  async getProfile(@Req() req, @Res() res) {
    try {
      const { userId } = req.user;

      if (!userId) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.getById(userId);

      return res.status(200).send(parseResponse(user));
    } catch (error) {
      return res.status(500).send(parseError('Internal Server Error', 500));
    }
  }
}
