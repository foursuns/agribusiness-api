import { ApiProperty } from '@nestjs/swagger';
import { Culture, CultureType } from '@prisma/client';

export class CultureEntity implements Culture {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: String, required: true, nullable: false })
  type: CultureType;

  @ApiProperty({ type: Number, required: true, nullable: false })
  specie_id: number;

  @ApiProperty({ type: Boolean, required: false, default: true })
  status: boolean;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  created_at: Date;

  @ApiProperty({ type: Date, required: false, default: () => 'NOW()' })
  updated_at: Date;
}
