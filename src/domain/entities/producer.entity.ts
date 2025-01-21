import { ApiProperty } from '@nestjs/swagger';
import { Producer, ProducerType } from '@prisma/client';

export class ProducerEntity implements Producer {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, required: true, nullable: false })
  name: string;

  @ApiProperty({ type: String, required: true, nullable: false })
  type: ProducerType;

  @ApiProperty({ type: String, required: true, nullable: false })
  document: string;

  @ApiProperty({ type: Boolean, required: false, default: true })
  status: boolean;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  created_at: Date;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  updated_at: Date;
}
