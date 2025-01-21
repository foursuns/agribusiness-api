import { ApiProperty } from '@nestjs/swagger';
import { Specie } from '@prisma/client';

export class SpecieEntity implements Specie {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, required: true, nullable: false })
  name: string;

  @ApiProperty({ type: Boolean, required: false, default: true })
  status: boolean;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  created_at: Date;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  updated_at: Date;
}
