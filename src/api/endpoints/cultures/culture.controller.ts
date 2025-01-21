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
import { CultureService } from './culture.service';
import { CreateCultureDto, UpdateCultureDto } from '../../dtos/culture.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CultureEntity } from '../../../domain/entities/culture.entity';

@Controller({ version: '1' })
@ApiTags('cultures')
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Post('cultures')
  @ApiBody({ type: CreateCultureDto, description: 'Informação da Cultura' })
  @ApiCreatedResponse({ type: CultureEntity, description: 'Criada' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) cultureDto: CreateCultureDto) {
    return await this.cultureService.create(cultureDto);
  }

  @Put('cultures/:id')
  @ApiBody({ type: UpdateCultureDto, description: 'Informação da Cultura' })
  @ApiOkResponse({ type: CultureEntity, description: 'Atualizado' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body(ValidationPipe) cultureDto: UpdateCultureDto) {
    return await this.cultureService.update(id, cultureDto);
  }

  @Delete('cultures/:id')
  @ApiOkResponse({ description: 'Excluído' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return await this.cultureService.remove(id);
  }

  @Get('cultures')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.cultureService.findAll();
  }

  @Get('cultures/:id')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.cultureService.findOne(id);
  }

  @Get('cultures/name/:name')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @HttpCode(HttpStatus.OK)
  async findName(@Param('name') name: string) {
    return await this.cultureService.findName(name);
  }
}
