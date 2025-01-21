import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockDashboard } from './../../mocks/mockDashboard.mock';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockPrismaService = {
    $queryRaw: jest.fn(),
    farm: {
      aggregate: jest.fn(),
      groupBy: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('dashboard', () => {
    it('should dashboard', async () => {
      mockPrismaService.$queryRaw.mockResolvedValueOnce(mockDashboard.cultures);
      mockPrismaService.farm.aggregate.mockResolvedValueOnce(mockDashboard.farms);
      mockPrismaService.farm.groupBy.mockResolvedValueOnce(mockDashboard.states);

      const result = await service.dashboard();

      expect(mockPrismaService.$queryRaw).toHaveBeenCalled();
      expect(mockPrismaService.farm.aggregate).toHaveBeenCalled();
      expect(mockPrismaService.farm.groupBy).toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: {
          farms: mockDashboard.farms,
          cultures: mockDashboard.cultures,
          states: mockDashboard.states,
        },
      });
    });
  });
});
