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
import { ProducerService } from './producer.service';
import { CreateProducerDto, UpdateProducerDto } from '../../dtos/producer.dto';
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
import { ProducerEntity } from '../../../domain/entities/producer.entity';

@Controller({ version: '1' })
@ApiTags('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('producers')
  @ApiBody({ type: CreateProducerDto, description: 'Informação do Produtor' })
  @ApiCreatedResponse({ type: ProducerEntity, description: 'Criado' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) producerDto: CreateProducerDto) {
    return await this.producerService.create(producerDto);
  }

  @Put('producers/:id')
  @ApiBody({ type: UpdateProducerDto, description: 'Informação do Produtor' })
  @ApiOkResponse({ type: ProducerEntity, description: 'Atualizado' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body(ValidationPipe) producerDto: UpdateProducerDto) {
    return await this.producerService.update(id, producerDto);
  }

  @Delete('producers/:id')
  @ApiOkResponse({ description: 'Excluído' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return await this.producerService.remove(id);
  }

  @Get('producers')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.producerService.findAll();
  }

  @Get('producers/:id')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.producerService.findOne(id);
  }

  @Get('producers/name/:name')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @HttpCode(HttpStatus.OK)
  async findName(@Param('name') name: string) {
    return await this.producerService.findName(name);
  }
}
