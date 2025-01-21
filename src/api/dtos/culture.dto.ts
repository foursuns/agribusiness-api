import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CultureType } from '@prisma/client';
export class CreateCultureDto {
  @ApiProperty({ enum: CultureType, required: true, default: 'Agrícola' })
  @IsNotEmpty({ message: 'Tipo de cultura não pode ser vazio' })
  @IsEnum(CultureType)
  readonly type: 'Agrícola' | 'Pastagem' | 'Silvicultura';

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty({ message: 'Espécie não pode ser vazia' })
  @IsNumber()
  readonly specie_id: number;
}

export class UpdateCultureDto extends PartialType(CreateCultureDto) {}
