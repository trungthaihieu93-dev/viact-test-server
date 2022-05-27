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

  async create(newUser: RegisterFormDTO): Promise<User> {
    newUser.password = await generateHash(newUser.password);

    await this.userRepository.insert(newUser);

    const result = await this.userRepository.findOneBy({
      email: newUser.email,
    });

    return result;
  }

  async fetchUserCredentials(email?: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .where('user.email = :email', { email })
      .addSelect('user.password') // query password only when authentication
      .getOne();
  }

  async findExistedUser(email: string, username: string): Promise<User> {
    return this.userRepository.findOne({
      where: [
        {
          email,
        },
        { username },
      ],
    });
  }

  async getById(userId: number): Promise<User> {
    return this.userRepository.findOneBy({
      id: userId,
    });
  }

  async update(userId: number, payload: Partial<User>) {
    this.userRepository.update(
      { id: userId },
      {
        ...payload,
      },
    );
  }
}
