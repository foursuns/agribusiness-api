import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from './farm.service';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockFarm, mockFarms, mockFarmAndProducer } from './../../mocks/mockFarm.mock';
import { mockProducer } from './../../mocks/mockProducer.mock';

describe('FarmService', () => {
  let service: FarmService;
  const mockPrismaService = {
    farm: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    producer: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<FarmService>(FarmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a farm with valid area calculation', async () => {
      const calculateAreaSpy = jest.spyOn(service, 'calculateArea' as any).mockReturnValue(true);

      mockPrismaService.producer.findUnique.mockResolvedValueOnce(mockProducer.id);
      mockPrismaService.farm.create.mockResolvedValueOnce(mockFarm);

      const result = await service.create(mockFarm);

      expect(calculateAreaSpy).toHaveBeenCalledWith(
        mockFarm.total_area,
        mockFarm.planting_area,
        mockFarm.vegetation_area,
      );
      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: `Fazenda ${MESSAGE.CREATE_SUCCESS}`,
        data: mockFarm,
      });
    });

    it('should fail to create a farm with invalid area calculation', async () => {
      const calculateAreaSpy = jest.spyOn(service, 'calculateArea' as any).mockReturnValue(false);

      mockPrismaService.farm.create.mockResolvedValueOnce(mockFarm);

      const result = await service.create(mockFarm);

      expect(calculateAreaSpy).toHaveBeenCalledWith(
        mockFarm.total_area,
        mockFarm.planting_area,
        mockFarm.vegetation_area,
      );
      expect(result).toEqual({
        statusCode: HttpStatus.FORBIDDEN,
        message: MESSAGE.ERROR_CALCULATE,
        data: {},
      });
    });

    it('should fail to create a farm if producer not found', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(null);

      const result = await service.create(mockFarm);

      expect(mockPrismaService.farm.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Produtor ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      const calculateAreaSpy = jest.spyOn(service, 'calculateArea' as any).mockReturnValue(true);
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(mockProducer.id);
      mockPrismaService.farm.create.mockRejectedValueOnce(new Error('Error'));

      try {
        await service.create(mockFarm);
      } catch (error) {
        expect(calculateAreaSpy).not.toHaveBeenCalled();
        expect(error.getResponse()).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: MESSAGE.BAD_REQUEST,
          data: {},
        });
      }
    });
  });

  describe('update', () => {
    it('should update a farm with valid area calculation', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValue(mockFarm);
      mockPrismaService.producer.findUnique.mockResolvedValue(mockProducer);
      mockPrismaService.farm.update.mockResolvedValueOnce(mockFarm);

      const calculateAreaSpy = jest.spyOn(service, 'calculateArea' as any).mockReturnValue(true);

      const result = await service.update(mockFarm.id, mockFarm);

      expect(calculateAreaSpy).toHaveBeenCalledWith(
        mockFarm.total_area,
        mockFarm.planting_area,
        mockFarm.vegetation_area,
      );
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Fazenda ${MESSAGE.UPDATE_SUCCESS}`,
        data: mockFarm,
      });
    });

    it('should fail to update a farm with invalid area calculation', async () => {
      const calculateAreaSpy = jest.spyOn(service, 'calculateArea' as any).mockReturnValue(false);

      mockPrismaService.farm.update.mockResolvedValueOnce(mockFarm);

      const result = await service.update(mockFarm.id, mockFarm);

      expect(calculateAreaSpy).toHaveBeenCalledWith(
        mockFarm.total_area,
        mockFarm.planting_area,
        mockFarm.vegetation_area,
      );
      expect(result).toEqual({
        statusCode: HttpStatus.FORBIDDEN,
        message: MESSAGE.ERROR_CALCULATE,
        data: {},
      });
    });

    it('should fail to update a farm if not found', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValueOnce(null);

      const result = await service.update(mockFarm.id, mockFarm);

      expect(mockPrismaService.farm.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Fazenda ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should fail to update a farm if producer not found', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValueOnce(mockFarm);
      mockPrismaService.producer.findUnique.mockResolvedValueOnce(null);

      const result = await service.update(1, mockFarm);

      expect(mockPrismaService.farm.update).not.toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Produtor ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      const calculateAreaSpy = jest.spyOn(service, 'calculateArea' as any).mockReturnValue(true);
      mockPrismaService.producer.findUnique.mockResolvedValue(mockProducer);
      mockPrismaService.farm.update.mockRejectedValueOnce(new Error('Error'));

      try {
        await service.update(mockFarm.id, mockFarm);
      } catch (error) {
        expect(calculateAreaSpy).not.toHaveBeenCalled();
        expect(error.getResponse()).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: MESSAGE.BAD_REQUEST,
          data: {},
        });
      }
    });
  });

  describe('delete', () => {
    it('should delete a farm', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValueOnce(mockFarm);
      mockPrismaService.farm.delete.mockResolvedValueOnce(mockFarm);

      const result = await service.remove(mockFarm.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: `Fazenda ${MESSAGE.DELETE_SUCCESS}`,
        data: {},
      });
    });

    it('should fail to delete a farm if not found', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValueOnce(null);

      const result = await service.remove(mockFarm.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Fazenda ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValueOnce(mockFarm);
      mockPrismaService.farm.delete.mockRejectedValueOnce(new Error('Error'));

      const result = await service.remove(mockFarm.id);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all', () => {
    it('should find all farms', async () => {
      mockPrismaService.farm.findMany.mockResolvedValueOnce(mockFarms);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockFarms,
      });
    });

    it('should return not found if no farms are found', async () => {
      mockPrismaService.farm.findMany.mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Fazenda ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.farm.findMany.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findAll();

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find one by id', () => {
    it('should find one farm by id', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValueOnce(mockFarmAndProducer);

      const result = await service.findOne(mockFarm.id);

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockFarmAndProducer,
      });
    });

    it('should fail to find one farm if not found', async () => {
      mockPrismaService.farm.findUnique.mockResolvedValueOnce(null);

      const result = await service.findOne(mockFarm.id);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Fazenda ${MESSAGE.NOT_FOUND}`,
        data: {},
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.farm.findUnique.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findOne(mockFarm.id);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });

  describe('find all by name', () => {
    it('should find all farms by name', async () => {
      mockPrismaService.farm.findMany.mockResolvedValueOnce(mockFarms);

      const result = await service.findName(mockFarms[0].name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: mockFarms,
      });
    });

    it('should fail to find all farms by name if not found', async () => {
      mockPrismaService.farm.findMany.mockResolvedValueOnce([]);

      const result = await service.findName(mockFarms[0].name.substring(0, 3));

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Fazenda ${MESSAGE.NOT_FOUND}`,
        data: [],
      });
    });

    it('should return a bad request message if an error occurs', async () => {
      mockPrismaService.farm.findUnique.mockRejectedValueOnce(new Error('Error'));

      const result = await service.findName(mockFarms[0].name);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: MESSAGE.BAD_REQUEST,
        data: {},
      });
    });
  });
});
