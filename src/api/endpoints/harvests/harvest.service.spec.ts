import { Test, TestingModule } from '@nestjs/testing';
import { HarvestService } from './harvest.service';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockHarvest, mockHarvests } from './../../mocks/mockHarvest.mock';

describe('HarvestService', () => {
  let service: HarvestService;

  const mockPrismaService = {
    harvest: {
      createManyAndReturn: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarvestService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create many a harvests', async () => {
      mockPrismaService.harvest.createManyAndReturn.mockResolvedValueOnce(mockHarvest);

      const result = await service.create([mockHarvest]);

      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: `Safra ${MESSAGE.CREATE_SUCCESS}`,
        data: mockHarvest,
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.harvest.createManyAndReturn.mockRejectedValueOnce(new Error('Error'));

      const result = await service.create([mockHarvest]);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('update', () => {
    it('should update a harvest', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(mockHarvest.id);
      mockPrismaService.harvest.update.mockResolvedValueOnce(mockHarvest);

      const result = await service.update(mockHarvest.id, mockHarvest);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Safra ${MESSAGE.UPDATE_SUCCESS}`,
        data: mockHarvest,
      });
    });

    it('should fail to update a harvest if not found', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(null);

      const result = await service.update(mockHarvest.id, mockHarvest);

      expect(mockPrismaService.harvest.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Safra ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(mockHarvest.id);
      mockPrismaService.harvest.update.mockRejectedValueOnce(new Error('Error'));

      const result = await service.update(mockHarvest.id, mockHarvest);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('delete', () => {
    it('should delete a harvest', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(mockHarvest.id);
      mockPrismaService.harvest.delete.mockResolvedValueOnce(mockHarvest);

      const result = await service.remove(mockHarvest.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Safra ${MESSAGE.DELETE_SUCCESS}`,
        data: {},
      });
    });

    it('should fail to delete a Harvest if not found', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(null);

      const result = await service.remove(mockHarvest.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Safra ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(mockHarvest.id);
      mockPrismaService.harvest.delete.mockRejectedValueOnce(new Error('Error'));

      const result = await service.remove(mockHarvest.id);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all', () => {
    it('should find all harvests', async () => {
      mockPrismaService.harvest.findMany.mockResolvedValueOnce(mockHarvests);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockHarvests,
      });
    });

    it('should return not found if no harvests are found', async () => {
      mockPrismaService.harvest.findMany.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Safra ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.harvest.findMany.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find one by id', () => {
    it('should find one harvest by id', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(mockHarvest);

      const result = await service.findOne(mockHarvest.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockHarvest,
      });
    });

    it('should fail to find one harvest if not found', async () => {
      mockPrismaService.harvest.findUnique.mockResolvedValueOnce(null);

      const result = await service.findOne(mockHarvest.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Safra ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.harvest.findUnique.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findOne(mockHarvest.id);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  // describe('find all by name', () => {
  //   it('should find all harvests by name', async () => {
  //     mockPrismaService.harvest.findMany.mockResolvedValueOnce(mockHarvests);

  //     const result = await service.findName(mockHarvest.name.substring(0, 3));

  //     expect(result).toEqual({
  //       statusCode: HttpStatus.OK,
  //       message: MESSAGE.SUCCESS,
  //       data: mockHarvests,
  //     });
  //   });

  //   it('should fail to find all harvests by name if not found', async () => {
  //     mockPrismaService.harvest.findMany.mockResolvedValueOnce([]);

  //     const result = await service.findName(mockHarvest.name.substring(0, 3));

  //     expect(result).toEqual({
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: `Safra ${MESSAGE.NOT_FOUND}`,
  //       data: [],
  //     });
  //   });
  // });
});
