import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  singUp(@Body() user: CreateUserDTO): any {
    return this.userService.createUser(user);
  }
}
