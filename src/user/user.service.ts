import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { RegisterFormDTO } from 'src/auth/dtos/auth.dto';

import { generateHash } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(newUser: RegisterFormDTO): Promise<InsertResult> {
    newUser.password = await generateHash(newUser.password);

    return this.userRepository.insert(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOneBy({
      id,
    });
  }
}
