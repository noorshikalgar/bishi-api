import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BishiService } from './bishi.service';
import { CreateBishiDTO, addMemberToBishiDTO } from './dto/bishi.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Bishi')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bishi')
export class BishiController {
  constructor(private bishiService: BishiService) {}

  @Post()
  async createBishi(@Req() req, @Body() bishi: CreateBishiDTO): Promise<any> {
    return this.bishiService.createBishi(bishi, req.user);
  }

  @Get()
  async getBishi(@Req() req): Promise<any> {
    return this.bishiService.getBishi(req.user);
  }

  @Post('addMember')
  async addMemberToBishi(@Body() body: addMemberToBishiDTO): Promise<any> {
    return await this.bishiService.addMemberToBishi(body.bishiId, body.userId);
  }
}
