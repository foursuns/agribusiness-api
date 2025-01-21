import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: 'Nome da fazenda é obrigatório' })
  @IsString({ message: 'Nome da fazenda não pode ser vazio' })
  readonly name: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: 'Municipio é obrigatório' })
  @IsString({ message: 'Municipio não pode ser vazio' })
  readonly city: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: 'Uf é obrigatório' })
  @IsString({ message: 'Uf não pode ser vazio' })
  readonly state: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: 'País é obrigatório' })
  @IsString({ message: 'País não pode ser vazio' })
  readonly country: string;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty({ message: 'Produtor não pode ser vazio' })
  @IsNumber()
  readonly producer_id: number;

  @ApiProperty({ type: Decimal, required: true })
  @IsNotEmpty({ message: 'Área total da fazenda não pode ser vazia' })
  readonly total_area: number;

  @ApiProperty({ type: Decimal, required: true })
  @IsNotEmpty({ message: 'Área agricultável não pode ser vazia' })
  readonly planting_area: number;

  @ApiProperty({ type: Decimal, required: true })
  @IsNotEmpty({ message: 'Área vegetação não pode ser vazia' })
  readonly vegetation_area: number;
}

export class UpdateFarmDto extends PartialType(CreateFarmDto) {}
