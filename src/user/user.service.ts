import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User | User[]> {
    return await this.userRepository.create(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({
      id,
    });
  }
}
