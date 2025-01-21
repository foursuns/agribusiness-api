import { Test, TestingModule } from '@nestjs/testing';
import { CultureService } from './culture.service';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockCulture, mockCultures, mockCultureAndSpecie } from './../../mocks/mockCulture.mock';
import { mockSpecie } from './../../mocks/mockSpecie.mock';

describe('CultureService', () => {
  let service: CultureService;

  const mockPrismaService = {
    culture: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    specie: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultureService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<CultureService>(CultureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a culture', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.culture.create.mockResolvedValueOnce(mockCulture);

      const result = await service.create(mockCulture);

      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: `Cultura ${MESSAGE.CREATE_SUCCESS}`,
        data: mockCulture,
      });
    });

    it('should fail to create a culture if specie not found', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(null);

      const result = await service.create(mockCulture);

      expect(mockPrismaService.culture.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espécie ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.culture.create.mockRejectedValueOnce(new Error('Error'));

      const result = await service.create(mockCulture);
      expect(mockPrismaService.culture.create).toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('update', () => {
    it('should update a culture', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(mockCulture);
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.culture.update.mockResolvedValueOnce(mockCulture);

      const result = await service.update(1, mockCulture);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Cultura ${MESSAGE.UPDATE_SUCCESS}`,
        data: mockCulture,
      });
    });

    it('should fail to update a culture if not found', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(null);

      const result = await service.update(1, mockCulture);

      expect(mockPrismaService.culture.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Cultura ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should fail to update a culture if specie not found', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(mockCulture);
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(null);

      const result = await service.update(1, mockCulture);

      expect(mockPrismaService.culture.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espécie ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(mockCulture);
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.culture.update.mockRejectedValueOnce(new Error('Error'));

      const result = await service.update(1, mockCulture);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('delete', () => {
    it('should delete a culture', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(mockCulture);
      mockPrismaService.culture.delete.mockResolvedValueOnce(mockCulture);

      const result = await service.remove(1);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Cultura ${MESSAGE.DELETE_SUCCESS}`,
        data: {},
      });
    });

    it('should fail to delete a culture if not found', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(null);

      const result = await service.remove(1);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Cultura ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(mockCulture);
      mockPrismaService.culture.delete.mockRejectedValueOnce(new Error('Error'));

      const result = await service.remove(1);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all', () => {
    it('should find all cultures', async () => {
      mockPrismaService.culture.findMany.mockResolvedValueOnce(mockCultures);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockCultures,
      });
    });

    it('should return not found if no cultures are found', async () => {
      mockPrismaService.culture.findMany.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Cultura ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.culture.findMany.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find one by id', () => {
    it('should find one culture by id', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(mockCultureAndSpecie);

      const result = await service.findOne(1);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockCultureAndSpecie,
      });
    });

    it('should fail to find one culture if not found', async () => {
      mockPrismaService.culture.findUnique.mockResolvedValueOnce(null);

      const result = await service.findOne(1);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Cultura ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.culture.findUnique.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findOne(1);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all by name', () => {
    it('should find all cultures by name', async () => {
      mockPrismaService.culture.findMany.mockResolvedValueOnce(mockCultures);

      const result = await service.findName(mockCultures[0].specie.name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockCultures,
      });
    });

    it('should fail to find all cultures by name if not found', async () => {
      mockPrismaService.culture.findMany.mockResolvedValueOnce([]);

      const result = await service.findName(mockCultures[0].specie.name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Cultura ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.culture.findUnique.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findName(mockCultures[0].specie.name);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });
});
