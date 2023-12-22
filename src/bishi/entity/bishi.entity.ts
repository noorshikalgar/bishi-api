import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  admin: User;

  @OneToMany(() => User, (user) => user.bishi)
  @JoinColumn()
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
