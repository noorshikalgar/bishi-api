import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiOperation({
    summary: 'Authenticate and sign in a user',
    description:
      "This route is used for user authentication. It verifies the user's credentials and allows them to sign in",
  })
  async signIn(@Body() credentials: SignInDto): Promise<any> {
    return await this.authService.signIn(credentials);
  }
}
