import { Exclude } from 'class-transformer';
import { createHmac } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      this.password = createHmac('sha256', this.password).digest('hex');
    }
  }

  checkPassword(password: string) {
    return this.password === createHmac('sha256', password).digest('hex');
  }
}
