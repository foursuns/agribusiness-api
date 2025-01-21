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
import { FarmService } from './farm.service';
import { CreateFarmDto, UpdateFarmDto } from '../../dtos/farm.dto';
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
import { FarmEntity } from '../../../domain/entities/farm.entity';

@Controller({ version: '1' })
@ApiTags('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post('farms')
  @ApiBody({ type: CreateFarmDto, description: 'Informação da Fazenda' })
  @ApiCreatedResponse({ type: FarmEntity, description: 'Criada' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) farmDto: CreateFarmDto) {
    return await this.farmService.create(farmDto);
  }

  @Put('farms/:id')
  @ApiBody({ type: UpdateFarmDto, description: 'Informação da Fazenda' })
  @ApiOkResponse({ type: FarmEntity, description: 'Atualizada' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body(ValidationPipe) farmDto: UpdateFarmDto) {
    return await this.farmService.update(id, farmDto);
  }

  @Delete('farms/:id')
  @ApiOkResponse({ description: 'Excluída' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return await this.farmService.remove(id);
  }

  @Get('farms')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.farmService.findAll();
  }

  @Get('farms/:id')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.farmService.findOne(id);
  }

  @Get('farms/name/:name')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @HttpCode(HttpStatus.OK)
  async findName(@Param('name') name: string) {
    return await this.farmService.findName(name);
  }
}
