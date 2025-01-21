import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ResponseDto } from 'src/api/interfaces/response';
import { customMessage, MESSAGE } from '@app/common';
import { CreateFarmDto, UpdateFarmDto } from '../../dtos/farm.dto';

@Injectable()
export class FarmService {
  constructor(private readonly prisma: PrismaService) {}

  select_fields = {
    id: true,
    name: true,
    city: true,
    state: true,
    country: true,
    producer_id: true,
    total_area: true,
    planting_area: true,
    vegetation_area: true,
    producer: {
      select: {
        name: true,
        type: true,
        document: true,
      },
    },
    harvest: {
      select: {
        id: true,
        year: true,
        culture: {
          select: {
            type: true,
            specie: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    },
  };

  private calculateArea(total_area: any, planting_area: any, vegetation_area: any) {
    return planting_area + vegetation_area === total_area;
  }

  async create(farmDto: CreateFarmDto): Promise<ResponseDto> {
    if (!this.calculateArea(farmDto.total_area, farmDto.planting_area, farmDto.vegetation_area)) {
      return customMessage(HttpStatus.FORBIDDEN, `${MESSAGE.ERROR_CALCULATE}`, {});
    }

    const { producer_id } = farmDto;
    const producer = await this.prisma.producer.findUnique({ where: { id: producer_id } });
    if (!producer) {
      return customMessage(HttpStatus.NOT_FOUND, `Produtor ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      const farm = await this.prisma.farm.create({
        data: {
          ...farmDto,
        },
      });
      return customMessage(HttpStatus.CREATED, `Fazenda ${MESSAGE.CREATE_SUCCESS}`, farm);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async update(id: number, farmDto: UpdateFarmDto): Promise<ResponseDto> {
    if (!this.calculateArea(farmDto.total_area, farmDto.planting_area, farmDto.vegetation_area)) {
      return customMessage(HttpStatus.FORBIDDEN, `${MESSAGE.ERROR_CALCULATE}`, {});
    }

    const farm = await this.prisma.farm.findUnique({ where: { id } });
    if (!farm) {
      return customMessage(HttpStatus.NOT_FOUND, `Fazenda ${MESSAGE.NOT_FOUND}`, {});
    }

    const { producer_id } = farmDto;
    const producer = await this.prisma.producer.findUnique({ where: { id: producer_id } });
    if (!producer) {
      return customMessage(HttpStatus.NOT_FOUND, `Produtor ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      const farm = await this.prisma.farm.update({
        where: { id },
        data: {
          ...farmDto,
        },
      });
      return customMessage(HttpStatus.OK, `Fazenda ${MESSAGE.UPDATE_SUCCESS}`, farm);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    const farm = await this.prisma.farm.findUnique({ where: { id } });
    if (!farm) {
      return customMessage(HttpStatus.NOT_FOUND, `Fazenda ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      await this.prisma.farm.delete({ where: { id } });
      return customMessage(HttpStatus.OK, `Fazenda ${MESSAGE.DELETE_SUCCESS}`, {});
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const farms = await this.prisma.farm.findMany({ select: this.select_fields });
      if (farms.length === 0) {
        return customMessage(HttpStatus.NOT_FOUND, `Fazenda ${MESSAGE.NOT_FOUND}`, farms);
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, farms);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const farm = await this.prisma.farm.findUnique({ select: this.select_fields, where: { id } });
      if (!farm) {
        return customMessage(HttpStatus.NOT_FOUND, `Fazenda ${MESSAGE.NOT_FOUND}`, {});
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, farm);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findName(name: string): Promise<ResponseDto> {
    try {
      const farms = await this.prisma.farm.findMany({
        select: this.select_fields,
        where: {
          producer: {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        },
      });
      if (farms.length === 0) {
        return customMessage(HttpStatus.NOT_FOUND, `Fazenda ${MESSAGE.NOT_FOUND}`, farms);
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, farms);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }
}
