import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ResponseDto } from './../../interfaces/response';
import { customMessage, MESSAGE, validateDocument } from '@app/common';
import { CreateProducerDto, UpdateProducerDto } from '../../dtos/producer.dto';

@Injectable()
export class ProducerService {
  constructor(private readonly prisma: PrismaService) {}

  select_fields = {
    id: true,
    name: true,
    type: true,
    document: true,
  };

  async create(producerDto: CreateProducerDto): Promise<ResponseDto> {
    const { type, document } = producerDto;
    const docto = document.replace(/\.|\/|-/g, '');
    const isValid = validateDocument(type, docto);
    if (!isValid) {
      return customMessage(HttpStatus.FORBIDDEN, MESSAGE.INVALID_DOCNO, {});
    }

    const producer = await this.prisma.producer.findUnique({ where: { document } });
    if (producer) {
      return customMessage(HttpStatus.FOUND, `Produtor ${MESSAGE.FOUND}`, producer);
    }

    try {
      const producer = await this.prisma.producer.create({
        data: {
          ...producerDto,
          document: docto,
        },
      });
      return customMessage(HttpStatus.CREATED, `Produtor ${MESSAGE.CREATE_SUCCESS}`, producer);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async update(id: number, producerDto: UpdateProducerDto): Promise<ResponseDto> {
    const { type, document } = producerDto;
    const docto = document.replace(/\.|\/|-/g, '');

    const producer = await this.prisma.producer.findUnique({ where: { id } });
    if (!producer) {
      return customMessage(HttpStatus.NOT_FOUND, `Produtor ${MESSAGE.NOT_FOUND}`, {});
    }

    if (producer.document !== docto) {
      const producer = await this.prisma.producer.findUnique({ where: { document: docto } });
      if (producer) {
        return customMessage(HttpStatus.FOUND, `Produtor ${MESSAGE.FOUND} com este documento`, {});
      }
    }

    const isValid = validateDocument(type, docto);
    if (!isValid) {
      return customMessage(HttpStatus.FORBIDDEN, `${MESSAGE.INVALID_DOCNO}`, {});
    }

    try {
      const producer = await this.prisma.producer.update({
        where: { id },
        data: {
          ...producerDto,
          document: docto,
        },
      });
      return customMessage(HttpStatus.OK, `Produtor ${MESSAGE.UPDATE_SUCCESS}`, producer);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    const producer = await this.prisma.producer.findUnique({ where: { id } });
    if (!producer) {
      return customMessage(HttpStatus.NOT_FOUND, `Produtor ${MESSAGE.NOT_FOUND}`, {});
    }
    try {
      await this.prisma.producer.delete({ where: { id } });
      return customMessage(HttpStatus.OK, `Produtor ${MESSAGE.DELETE_SUCCESS}`, {});
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const producers: CreateProducerDto[] = await this.prisma.producer.findMany({
        select: this.select_fields,
      });
      if (producers.length === 0) {
        return customMessage(HttpStatus.NOT_FOUND, `Produtor ${MESSAGE.NOT_FOUND}`, producers);
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, producers);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const producer = await this.prisma.producer.findUnique({
        select: this.select_fields,
        where: { id },
      });
      if (!producer) {
        return customMessage(HttpStatus.NOT_FOUND, `Produtor ${MESSAGE.NOT_FOUND}`, {});
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, producer);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }

  async findName(name: string): Promise<ResponseDto> {
    try {
      const producers = await this.prisma.producer.findMany({
        select: this.select_fields,
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
      });
      if (producers.length === 0) {
        return customMessage(HttpStatus.NOT_FOUND, `Produtor ${MESSAGE.NOT_FOUND}`, producers);
      }
      return customMessage(HttpStatus.OK, MESSAGE.SUCCESS, producers);
    } catch (error) {
      return customMessage(HttpStatus.BAD_REQUEST, MESSAGE.BAD_REQUEST, {});
    }
  }
}
