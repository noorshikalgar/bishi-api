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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user account.',
    description:
      'This route is used to create a new user account. Users provide necessary information for registration, such as username, email, and password.',
  })
  singUp(@Body() user: CreateUserDTO): any {
    return this.userService.createUser(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  @ApiOperation({
    summary: 'Retrieve details of the authenticated user.',
    description:
      'This route returns information about the currently authenticated user. It is used to fetch user details after successful authentication.',
  })
  getUserById(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserByUserId(userId);
  }
}
