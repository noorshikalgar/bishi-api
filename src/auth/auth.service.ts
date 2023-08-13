import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(credentials: SignInDto): Promise<any> {
    const user = await this.userService.getUserByEmailorPhone(
      credentials.email,
    );
    if (!user || !user.checkPassword(credentials.password)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Username or password incorrect',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'Successfully';
  }
}
