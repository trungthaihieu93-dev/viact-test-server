import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { GoogleProfile } from '../interfaces/google';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  lastName: string;

  @Column('text')
  avatar: string;

  @Column()
  isActive: boolean;

  @Column('json')
  ggProfile: GoogleProfile;
}
