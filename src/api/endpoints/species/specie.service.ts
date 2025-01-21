import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ResponseDto } from 'src/api/interfaces/response';
import { customMessage, MESSAGE } from '@app/common';
import { CreateSpecieDto, UpdateSpecieDto } from '../../dtos/specie.dto';

@Injectable()
export class SpecieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(specieDto: CreateSpecieDto): Promise<ResponseDto> {
    try {
      const specie = await this.prisma.specie.create({
        data: {
          ...specieDto,
        },
      });
      return customMessage(HttpStatus.CREATED, `Espécie ${MESSAGE.CREATE_SUCCESS}`, specie);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async update(id: number, specieDto: UpdateSpecieDto): Promise<ResponseDto> {
    const specie = await this.prisma.specie.findUnique({ where: { id } });
    if (!specie) {
      return customMessage(HttpStatus.NOT_FOUND, `Espécie ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      const specie = await this.prisma.specie.update({
        where: { id },
        data: {
          ...specieDto,
        },
      });
      return customMessage(HttpStatus.OK, `Espécie ${MESSAGE.UPDATE_SUCCESS}`, specie);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    const specie = await this.prisma.specie.findUnique({ where: { id } });
    if (!specie) {
      return customMessage(HttpStatus.NOT_FOUND, `Espécie ${MESSAGE.NOT_FOUND}`, {});
    }

    try {
      await this.prisma.specie.delete({ where: { id } });
      return customMessage(HttpStatus.OK, `Espécie ${MESSAGE.DELETE_SUCCESS}`, {});
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findAll(): Promise<ResponseDto> {
    const species = await this.prisma.specie.findMany();

    if (species.length === 0) {
      return customMessage(HttpStatus.NOT_FOUND, `Espécie ${MESSAGE.NOT_FOUND}`, []);
    }
    return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, species);
  }

  async findOne(id: number): Promise<ResponseDto> {
    const specie = await this.prisma.specie.findUnique({ where: { id } });

    if (!specie) {
      return customMessage(HttpStatus.NOT_FOUND, `Espécie ${MESSAGE.NOT_FOUND}`, {});
    }
    return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, specie);
  }

  async findName(name: string): Promise<ResponseDto> {
    const species = await this.prisma.specie.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
    });

    if (species.length === 0) {
      return customMessage(HttpStatus.NOT_FOUND, `Espécie ${MESSAGE.NOT_FOUND}`, []);
    }
    return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, species);
  }
}
