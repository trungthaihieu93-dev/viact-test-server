import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { GoogleProfile } from '../interfaces/google';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ length: 500 })
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
}
