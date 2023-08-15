import { Module } from '@nestjs/common';
import { BishiController } from './bishi.controller';
import { BishiService } from './bishi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bishi } from './entity/bishi.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bishi, User])],
  controllers: [BishiController],
  providers: [BishiService],
})
export class BishiModule {}
