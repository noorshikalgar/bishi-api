import { Exclude } from 'class-transformer';
import { createHmac } from 'crypto';
import { Bishi } from 'src/bishi/entity/bishi.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
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

  @ManyToOne(() => Bishi, (bishi) => bishi.members)
  bishi: Bishi;

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
