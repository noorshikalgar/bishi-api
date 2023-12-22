import { ApiProperty } from '@nestjs/swagger';

export class CreateBishiDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  totalAmount: string;
  @ApiProperty({ type: Date, format: 'yyyy-MM-dd' })
  collectionDate: string;
  @ApiProperty({ type: Date, format: 'yyyy-MM-dd' })
  dueDate: string;
}

export class addMemberToBishiDTO {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  bishiId: string;
}
