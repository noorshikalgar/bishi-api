import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDTO): Promise<any> {
    const checkUserExists = await this.userRepository.findOne({
      where: [{ email: user.email }, { phone: user.phone }],
    });
    console.log(checkUserExists);
    if (checkUserExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already exists, please try with another email or phone',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const userRecord: User = this.userRepository.create(user);
    return this.userRepository.save(userRecord);
  }

  async getUserByEmailorPhone(value: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail([
        { email: value },
        { phone: value },
      ]);
    } catch (err) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserByUserId(userId: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id: userId });
    } catch (err) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
