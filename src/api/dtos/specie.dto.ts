import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecieDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: 'Nome da espécie é obrigatório' })
  @IsString({ message: 'Nome da espécie não pode ser vazio' })
  readonly name: string;
}

export class UpdateSpecieDto extends PartialType(CreateSpecieDto) {}
