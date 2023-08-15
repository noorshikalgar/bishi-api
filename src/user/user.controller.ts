import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  singUp(@Body() user: CreateUserDTO): any {
    return this.userService.createUser(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserByUserId(userId);
  }
}
