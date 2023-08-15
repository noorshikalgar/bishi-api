import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Bishi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne((type) => User, (user) => user.id)
  admin: User;

  @OneToMany((type) => User, (user) => user.id)
  members: User[];

  @Column()
  totalAmount: string;

  @Column({ type: 'date' })
  collectionDate: string;

  @Column({ type: 'date' })
  dueDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
