import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './../../../infrastructure/prisma/prisma.service';
import { ProducerService } from './producer.service';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE, validateDocument } from '@app/common';
import { mockProducer, mockProducerDto, mockProducers } from './../../mocks/mockProducer.mock';

jest.mock('@app/common', () => ({
  ...jest.requireActual('@app/common'),
  validateDocument: jest.fn(),
}));

describe('ProducerService', () => {
  let service: ProducerService;
  const mockPrismaService = {
    producer: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducerService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a producer with valid document', async () => {
      mockPrismaService.producer.create.mockResolvedValueOnce(mockProducer);

      (validateDocument as jest.Mock).mockReturnValueOnce(true);

      const result = await service.create(mockProducerDto);

      expect(validateDocument).toHaveBeenCalledWith(mockProducerDto.type, mockProducerDto.document);
      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: `Produtor ${MESSAGE.CREATE_SUCCESS}`,
        data: mockProducer,
      });
    });

    it('should fail to create a producer with invalid document', async () => {
      mockPrismaService.producer.create.mockResolvedValueOnce(mockProducerDto);

      (validateDocument as jest.Mock).mockReturnValueOnce(false);

      const result = await service.create(mockProducerDto);

      expect(validateDocument).toHaveBeenCalledWith(mockProducerDto.type, mockProducerDto.document);
      expect(result).toEqual({
        statusCode: HttpStatus.FORBIDDEN,
        message: MESSAGE.INVALID_DOCNO,
        data: {},
      });
    });

    it('should fail create a producer found', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValue(mockProducer);
      mockPrismaService.producer.create.mockResolvedValueOnce(mockProducer);

      (validateDocument as jest.Mock).mockReturnValueOnce(true);

      const result = await service.create(mockProducerDto);

      expect(validateDocument).toHaveBeenCalledWith(mockProducerDto.type, mockProducerDto.document);
      expect(result).toEqual({
        statusCode: HttpStatus.FOUND,
        message: `Produtor ${MESSAGE.FOUND}`,
        data: mockProducer,
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.producer.create.mockRejectedValueOnce(new Error('Error'));

      (validateDocument as jest.Mock).mockReturnValueOnce(true);

      try {
        await service.create(mockProducerDto);
      } catch (error) {
        expect(validateDocument).not.toHaveBeenCalled();
        expect(error.getResponse()).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: MESSAGE.BAD_REQUEST,
          data: {},
        });
      }
    });
  });

  describe('update', () => {
    it('should update a producer with valid document', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValue(mockProducer);
      mockPrismaService.producer.update.mockResolvedValueOnce(mockProducer);

      (validateDocument as jest.Mock).mockReturnValueOnce(true);

      const result = await service.update(mockProducer.id, mockProducerDto);

      expect(validateDocument).toHaveBeenCalledWith(mockProducerDto.type, mockProducerDto.document);
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Produtor ${MESSAGE.UPDATE_SUCCESS}`,
        data: mockProducer,
      });
    });

    it('should fail to update a producer with invalid document', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValue(mockProducer);
      mockPrismaService.producer.update.mockResolvedValueOnce(mockProducerDto);

      (validateDocument as jest.Mock).mockReturnValueOnce(false);

      const result = await service.update(mockProducer.id, mockProducerDto);

      expect(validateDocument).toHaveBeenCalledWith(mockProducerDto.type, mockProducerDto.document);
      expect(result).toEqual({
        statusCode: HttpStatus.FORBIDDEN,
        message: MESSAGE.INVALID_DOCNO,
        data: {},
      });
    });

    it('should fail to update a producer if not found', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(null);

      const result = await service.update(mockProducer.id, mockProducerDto);

      expect(mockPrismaService.producer.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Produtor ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should fail to update a producer if same document exists', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(mockProducer.document);

      const result = await service.update(mockProducer.id, mockProducerDto);

      expect(mockPrismaService.producer.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.FOUND,
        message: `Produtor ${MESSAGE.FOUND} com este documento`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.producer.update.mockRejectedValueOnce(new Error('Error'));

      (validateDocument as jest.Mock).mockReturnValueOnce(true);

      try {
        await service.create(mockProducerDto);
      } catch (error) {
        expect(validateDocument).not.toHaveBeenCalled();
        expect(error.getResponse()).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: MESSAGE.BAD_REQUEST,
          data: {},
        });
      }
    });
  });

  describe('delete', () => {
    it('should delete a producer', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(mockProducer);
      mockPrismaService.producer.delete.mockResolvedValueOnce(mockProducer);

      const result = await service.remove(mockProducer.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Produtor ${MESSAGE.DELETE_SUCCESS}`,
        data: {},
      });
    });

    it('should fail to delete a producer if not found', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(null);

      const result = await service.remove(mockProducer.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Produtor ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(mockProducer);
      mockPrismaService.producer.delete.mockRejectedValueOnce(new Error('Error'));

      const result = await service.remove(mockProducer.id);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all', () => {
    it('should find all producers', async () => {
      mockPrismaService.producer.findMany.mockResolvedValueOnce(mockProducers);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockProducers,
      });
    });

    it('should return not found if no producers are found', async () => {
      mockPrismaService.producer.findMany.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Produtor ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.producer.findMany.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find one by id', () => {
    it('should find one producer by id', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(mockProducer);

      const result = await service.findOne(mockProducer.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockProducer,
      });
    });

    it('should fail to find one producer if not found', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(null);

      const result = await service.findOne(mockProducer.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Produtor ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.producer.findUnique.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findOne(mockProducer.id);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all by name', () => {
    it('should find all producers by name', async () => {
      mockPrismaService.producer.findMany.mockResolvedValueOnce(mockProducers);

      const result = await service.findName(mockProducers[0].name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockProducers,
      });
    });

    it('should fail to find all producers by name if not found', async () => {
      mockPrismaService.producer.findMany.mockResolvedValueOnce([]);

      const result = await service.findName(mockProducers[0].name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Produtor ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.producer.findUnique.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findName(mockProducers[0].name);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });
});
