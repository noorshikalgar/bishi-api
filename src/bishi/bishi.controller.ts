import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BishiService } from './bishi.service';
import { CreateBishiDTO } from './dto/bishi.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Bishi')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bishi')
export class BishiController {
  constructor(private bishiService: BishiService) {}

  @ApiBearerAuth()
  @Post()
  async createBishi(@Req() req, @Body() bishi: CreateBishiDTO): Promise<any> {
    return this.bishiService.createBishi(bishi, req.user);
  }
}
