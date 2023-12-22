import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Bishi } from './entity/bishi.entity';
import { CreateBishiDTO } from './dto/bishi.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class BishiService {
  constructor(
    @InjectRepository(Bishi) private bishiRepository: Repository<Bishi>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createBishi(bishi: CreateBishiDTO, user: User): Promise<any> {
    const bishiRecord = await this.bishiRepository.create(bishi);
    const userRecord = await this.userRepository.findOne({
      where: { id: user.id },
    });
    bishiRecord.admin = userRecord;
    bishiRecord.members = [];
    bishiRecord.members.push(userRecord);
    const createdBishi = await this.bishiRepository.save(bishiRecord);
    return await this.bishiRepository.findOne({
      relations: { admin: true, members: true },
      where: { id: createdBishi.id },
    });
  }

  async addMemberToBishi(bishiId: string, userId: string): Promise<any> {
    const userRecord = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userRecord) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Bad Request, user does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Use query builder to create a custom query
    const queryBuilder = this.bishiRepository.createQueryBuilder('bishi');

    // Add WHERE condition to check if the target value exists in the members array
    const checkIfExists = await queryBuilder
      .innerJoinAndSelect('bishi.members', 'members')
      .where('bishi.id = :bishiId', { bishiId })
      .setParameter('bishiId', bishiId)
      .andWhere('members.id = :userId', { userId })
      .setParameter('userId', userId)
      .getOne();

    if (checkIfExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Bad Request, member already exists.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const bishiRecord = await this.bishiRepository.findOne({
      where: { id: bishiId },
      relations: { admin: true, members: true },
    });
    bishiRecord.members.push(userRecord);

    return await this.bishiRepository.save(bishiRecord);
  }

  async getBishi(user: any): Promise<any> {
    if (!user)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'Invalid user' },
        HttpStatus.BAD_REQUEST,
      );

    return await this.bishiRepository.find({
      relations: { admin: true, members: true },
    });
  }
}
