import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/core/modules/database.module';

import { UserController } from './user.controller';

import { UserService } from './user.service';

import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [...userProviders, UserService],
})
export class UserModule {}
