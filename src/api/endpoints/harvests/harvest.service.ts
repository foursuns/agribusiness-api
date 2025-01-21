import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ResponseDto } from 'src/api/interfaces/response';
import { customMessage, MESSAGE } from '@app/common';
import { CreateHarvestDto, UpdateHarvestDto } from '../../dtos/harvest.dto';

@Injectable()
export class HarvestService {
  constructor(private readonly prisma: PrismaService) {}

  select_fields = {
    id: true,
    farm_id: true,
    culture_id: true,
    year: true,
    culture: {
      select: {
        type: true,
        specie_id: true,
        specie: {
          select: {
            name: true,
          },
        },
      },
    },
  };

  async create(harvestDto: CreateHarvestDto[]): Promise<ResponseDto> {
    try {
      const harvests = await this.prisma.harvest.createManyAndReturn({
        data: [...harvestDto],
        skipDuplicates: true,
      });
      return customMessage(HttpStatus.CREATED, `Safra ${MESSAGE.CREATE_SUCCESS}`, harvests);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async update(id: number, harvestDto: UpdateHarvestDto): Promise<ResponseDto> {
    const harvest = await this.prisma.harvest.findUnique({ where: { id } });
    if (!harvest) {
      return customMessage(HttpStatus.NOT_FOUND, `Safra ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      const harvest = await this.prisma.harvest.update({
        where: { id },
        data: {
          ...harvestDto,
        },
      });
      return customMessage(HttpStatus.OK, `Safra ${MESSAGE.UPDATE_SUCCESS}`, harvest);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    const harvest = await this.prisma.harvest.findUnique({ where: { id } });
    if (!harvest) {
      return customMessage(HttpStatus.NOT_FOUND, `Safra ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      await this.prisma.harvest.delete({ where: { id } });
      return customMessage(HttpStatus.OK, `Safra ${MESSAGE.DELETE_SUCCESS}`, {});
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const harvests = await this.prisma.harvest.findMany({
        select: this.select_fields,
      });
      if (harvests.length === 0) {
        return customMessage(HttpStatus.NOT_FOUND, `Safra ${MESSAGE.NOT_FOUND}`, harvests);
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, harvests);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const harvest = await this.prisma.harvest.findUnique({
        select: this.select_fields,
        where: { id },
      });
      if (!harvest) {
        return customMessage(HttpStatus.NOT_FOUND, `Safra ${MESSAGE.NOT_FOUND}`, {});
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, harvest);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  // async findName(name: string): Promise<ResponseDto> {
  //   const harvests = await this.prisma.harvest.findMany({
  //     where: {
  //       name: {
  //         startsWith: name,
  //         mode: 'insensitive',
  //       },
  //     },
  //   });

  //   if (harvests.length === 0) {
  //     return customMessage(HttpStatus.NOT_FOUND, `Safra ${MESSAGE.NOT_FOUND}`, []);
  //   }
  //   return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, harvests);
  // }
}
