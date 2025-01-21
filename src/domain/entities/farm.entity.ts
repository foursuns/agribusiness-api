import { ApiProperty } from '@nestjs/swagger';
import { Farm } from '@prisma/client';

export class FarmEntity implements Farm {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, required: true, nullable: false })
  name: string;

  @ApiProperty({ type: String, required: true, nullable: false })
  city: string;

  @ApiProperty({ type: String, required: true, nullable: false })
  state: string;

  @ApiProperty({ type: String, required: true, nullable: false })
  country: string;

  @ApiProperty({ type: Number, required: true, nullable: false })
  producer_id: number;

  @ApiProperty({ type: Number, format: 'double', required: true, nullable: false })
  total_area: any;

  @ApiProperty({ type: Number, required: true, nullable: false })
  planting_area: any;

  @ApiProperty({ type: Number, required: true, nullable: false })
  vegetation_area: any;

  @ApiProperty({ type: Boolean, required: false, default: true })
  status: boolean;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  created_at: Date;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  updated_at: Date;
}
