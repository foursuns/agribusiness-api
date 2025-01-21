import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ResponseDto } from '../../interfaces/response';
import { customMessage, MESSAGE } from '@app/common';
import { CreateCultureDto, UpdateCultureDto } from '../../dtos/culture.dto';

@Injectable()
export class CultureService {
  constructor(private readonly prisma: PrismaService) {}

  select_fields = {
    id: true,
    type: true,
    specie_id: true,
    specie: {
      select: {
        name: true,
      },
    },
  };

  async create(cultureDto: CreateCultureDto): Promise<ResponseDto> {
    const { specie_id } = cultureDto;
    const specie = await this.prisma.specie.findUnique({ where: { id: specie_id } });
    if (!specie) {
      return customMessage(HttpStatus.NOT_FOUND, `Espécie ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      const culture = await this.prisma.culture.create({
        data: {
          ...cultureDto,
        },
      });
      return customMessage(HttpStatus.CREATED, `Cultura ${MESSAGE.CREATE_SUCCESS}`, culture);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async update(id: number, cultureDto: UpdateCultureDto): Promise<ResponseDto> {
    const culture = await this.prisma.culture.findUnique({ where: { id } });
    if (!culture) {
      return customMessage(HttpStatus.NOT_FOUND, `Cultura ${MESSAGE.NOT_FOUND}`, {});
    }

    const { specie_id } = cultureDto;
    const specie = await this.prisma.specie.findUnique({ where: { id: specie_id } });
    if (!specie) {
      return customMessage(HttpStatus.NOT_FOUND, `Espécie ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      const culture = await this.prisma.culture.update({
        where: { id },
        data: {
          ...cultureDto,
        },
      });
      return customMessage(HttpStatus.OK, `Cultura ${MESSAGE.UPDATE_SUCCESS}`, culture);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    const culture = await this.prisma.culture.findUnique({ where: { id } });
    if (!culture) {
      return customMessage(HttpStatus.NOT_FOUND, `Cultura ${MESSAGE.NOT_FOUND}`);
    }

    try {
      await this.prisma.culture.delete({ where: { id } });
      return customMessage(HttpStatus.OK, `Cultura ${MESSAGE.DELETE_SUCCESS}`, {});
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const cultures = await this.prisma.culture.findMany({
        select: this.select_fields,
      });
      if (cultures.length === 0) {
        return customMessage(HttpStatus.NOT_FOUND, `Cultura ${MESSAGE.NOT_FOUND}`, cultures);
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, cultures);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const culture = await this.prisma.culture.findUnique({
        select: this.select_fields,
        where: { id },
      });
      if (!culture) {
        return customMessage(HttpStatus.NOT_FOUND, `Cultura ${MESSAGE.NOT_FOUND}`, {});
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, culture);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findName(name: string): Promise<ResponseDto> {
    try {
      const cultures = await this.prisma.culture.findMany({
        select: this.select_fields,
        where: {
          specie: {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        },
      });
      if (cultures.length === 0) {
        return customMessage(HttpStatus.NOT_FOUND, `Cultura ${MESSAGE.NOT_FOUND}`, cultures);
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, cultures);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }
}
