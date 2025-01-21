import { ApiProperty } from '@nestjs/swagger';
import { Harvest } from '@prisma/client';

export class HarvestEntity implements Harvest {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: Number, required: true, nullable: false })
  farm_id: number;

  @ApiProperty({ type: Number, required: true, nullable: false })
  culture_id: number;

  @ApiProperty({ type: Number, required: true, nullable: false })
  year: number;

  @ApiProperty({ type: Boolean, required: false, default: true })
  status: boolean;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  created_at: Date;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  updated_at: Date;
}
