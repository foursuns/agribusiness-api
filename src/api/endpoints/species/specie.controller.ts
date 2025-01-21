import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { SpecieService } from './specie.service';
import { CreateSpecieDto, UpdateSpecieDto } from '../../dtos/specie.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SpecieEntity } from '../../../domain/entities/specie.entity';

@Controller({ version: '1' })
@ApiTags('species')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Post('species')
  @ApiBody({ type: CreateSpecieDto, description: 'Informação da Espécie' })
  @ApiCreatedResponse({ type: SpecieEntity, description: 'Criada' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) specieDto: CreateSpecieDto) {
    return await this.specieService.create(specieDto);
  }

  @Put('species/:id')
  @ApiBody({ type: UpdateSpecieDto, description: 'Informação da Espécie' })
  @ApiOkResponse({ type: SpecieEntity, description: 'Atualizado' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body(ValidationPipe) specieDto: UpdateSpecieDto) {
    return await this.specieService.update(id, specieDto);
  }

  @Delete('species/:id')
  @ApiOkResponse({ description: 'Excluído' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return await this.specieService.remove(id);
  }

  @Get('species')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.specieService.findAll();
  }

  @Get('species/:id')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.specieService.findOne(id);
  }

  @Get('species/name/:name')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @HttpCode(HttpStatus.OK)
  async findName(@Param('name') name: string) {
    return await this.specieService.findName(name);
  }
}
