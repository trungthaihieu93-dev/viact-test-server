import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { parseToMySqlDatetime } from 'src/utils/datetime';

import { OTP_TYPES } from 'src/core/enums/otp';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  content: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', default: parseToMySqlDatetime(new Date()) })
  createdAt: Date;

  @Column({ type: 'enum', enum: OTP_TYPES, default: OTP_TYPES.LOGIN })
  type: OTP_TYPES;

  @ManyToOne(() => User, (user) => user.otps)
  user: number;
}
