import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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
    const payload = { id: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
