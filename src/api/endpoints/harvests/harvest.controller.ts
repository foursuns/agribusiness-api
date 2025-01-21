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
import { HarvestService } from './harvest.service';
import { CreateHarvestDto, UpdateHarvestDto } from '../../dtos/harvest.dto';
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
import { HarvestEntity } from '../../../domain/entities/harvest.entity';

@Controller({ version: '1' })
@ApiTags('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post('harvests')
  @ApiBody({ isArray: true, type: CreateHarvestDto, description: 'Informação da Safra' })
  @ApiCreatedResponse({ type: HarvestEntity, description: 'Criada' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) harvestDto: CreateHarvestDto[]) {
    return await this.harvestService.create(harvestDto);
  }

  @Put('harvests/:id')
  @ApiBody({ type: UpdateHarvestDto, description: 'Informação da Safra' })
  @ApiOkResponse({ type: HarvestEntity, description: 'Atualizada' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body(ValidationPipe) harvestDto: UpdateHarvestDto) {
    return await this.harvestService.update(id, harvestDto);
  }

  @Delete('harvests/:id')
  @ApiOkResponse({ description: 'Excluída' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return await this.harvestService.remove(id);
  }

  @Get('harvests')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.harvestService.findAll();
  }

  @Get('harvests/:id')
  @ApiOkResponse({ description: 'Found successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.harvestService.findOne(id);
  }

  // @Get('harvests/name/:name')
  // @ApiOkResponse({ description: 'Found successfully' })
  // @ApiBadRequestResponse({ description: 'Bad Request' })
  // @ApiNotFoundResponse({ description: 'Not Found' })
  // @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  // @HttpCode(HttpStatus.OK)
  // async findName(@Param('name') name: string) {
  //   return await this.harvestService.findName(name);
  // }
}
