import { Test, TestingModule } from '@nestjs/testing';
import { SpecieService } from './specie.service';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockSpecie, mockSpecies } from './../../mocks/mockSpecie.mock';

describe('SpecieService', () => {
  let service: SpecieService;

  const mockPrismaService = {
    specie: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecieService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<SpecieService>(SpecieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a specie', async () => {
      mockPrismaService.specie.create.mockResolvedValueOnce(mockSpecie);

      const result = await service.create(mockSpecie);

      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: `Espécie ${MESSAGE.CREATE_SUCCESS}`,
        data: mockSpecie,
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.specie.create.mockRejectedValueOnce(new Error('Error'));

      const result = await service.create(mockSpecie);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('update', () => {
    it('should update a specie', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.specie.update.mockResolvedValueOnce(mockSpecie);

      const result = await service.update(mockSpecie.id, mockSpecie);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Espécie ${MESSAGE.UPDATE_SUCCESS}`,
        data: mockSpecie,
      });
    });

    it('should fail to update a specie if not found', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(null);

      const result = await service.update(mockSpecie.id, mockSpecie);

      expect(mockPrismaService.specie.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espécie ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.specie.update.mockRejectedValueOnce(new Error('Error'));

      const result = await service.update(mockSpecie.id, mockSpecie);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('delete', () => {
    it('should delete a specie', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.specie.delete.mockResolvedValueOnce(mockSpecie);

      const result = await service.remove(mockSpecie.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Espécie ${MESSAGE.DELETE_SUCCESS}`,
        data: {},
      });
    });

    it('should fail to delete a specie if not found', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(null);

      const result = await service.remove(mockSpecie.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espécie ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie.id);
      mockPrismaService.specie.delete.mockRejectedValueOnce(new Error('Error'));

      const result = await service.remove(mockSpecie.id);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all', () => {
    it('should find all species', async () => {
      mockPrismaService.specie.findMany.mockResolvedValueOnce(mockSpecies);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockSpecies,
      });
    });

    it('should return not found if no species are found', async () => {
      mockPrismaService.specie.findMany.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espécie ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });
  });

  describe('find one by id', () => {
    it('should find one specie by id', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(mockSpecie);

      const result = await service.findOne(mockSpecie.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockSpecie,
      });
    });

    it('should fail to find one specie if not found', async () => {
      mockPrismaService.specie.findUnique.mockResolvedValueOnce(null);

      const result = await service.findOne(mockSpecie.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espécie ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });
  });

  describe('find all by name', () => {
    it('should find all species by name', async () => {
      mockPrismaService.specie.findMany.mockResolvedValueOnce(mockSpecies);

      const result = await service.findName(mockSpecie.name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockSpecies,
      });
    });

    it('should fail to find all species by name if not found', async () => {
      mockPrismaService.specie.findMany.mockResolvedValueOnce([]);

      const result = await service.findName(mockSpecie.name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espécie ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });
  });
});
