import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProducerType } from '@prisma/client';

export class CreateProducerDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome não pode ser vazio' })
  readonly name: string;

  @ApiProperty({ enum: ProducerType, required: true, default: 'PF' })
  @IsNotEmpty({ message: 'Tipo de pessoa não pode ser vazio' })
  @IsEnum(ProducerType)
  readonly type: 'PF' | 'PJ';

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: 'Documento é obrigatório' })
  @IsString({ message: 'Documento não pode ser vazio' })
  readonly document: string;
}

export class UpdateProducerDto extends PartialType(CreateProducerDto) {}
