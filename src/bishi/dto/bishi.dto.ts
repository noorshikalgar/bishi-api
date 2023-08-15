import { ApiProperty } from '@nestjs/swagger';

export class CreateBishiDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  totalAmount: string;
  @ApiProperty({ type: 'date' })
  collectionDate: string;
  @ApiProperty({ type: 'date' })
  dueDate: string;
}
