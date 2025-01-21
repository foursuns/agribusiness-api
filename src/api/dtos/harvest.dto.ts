import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty({ message: 'Fazenda não pode ser vazia' })
  @IsNumber()
  readonly farm_id: number;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty({ message: 'Cultura não pode ser vazia' })
  @IsNumber()
  readonly culture_id: number;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty({ message: 'Ano não pode ser vazio' })
  @IsNumber()
  readonly year: number;
}

export class UpdateHarvestDto extends PartialType(CreateHarvestDto) {}
