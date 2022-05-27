import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { GoogleProfile } from '../interfaces/google';

import { Otp } from 'src/otp/entities/otp.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false, length: 500 })
  password: string;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  lastName: string;

  @Column('text', { default: null })
  avatar: string;

  @Column({ default: false })
  isActive: boolean;

  @Column('json', { default: null })
  ggProfile: GoogleProfile;

  @OneToMany(() => Otp, (otp) => otp.user)
  otps: Otp[];
}
