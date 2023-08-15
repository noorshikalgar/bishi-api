import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return await this.bishiRepository.save(bishiRecord);
  }

  async addMemberToBishi(bishiId: string, userId: string): Promise<any> {
    const bishiRecord = await this.bishiRepository.findOne({
      where: { id: bishiId },
    });
    const userRecord = await this.userRepository.findOne({
      where: { id: userId },
    });
    bishiRecord.members.push(userRecord);
    return await this.bishiRepository.update(bishiId, bishiRecord);
  }
}
