import { Test, TestingModule } from '@nestjs/testing';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto, UpdateHarvestDto } from '../../dtos/harvest.dto';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockHarvest, mockHarvests } from './../../mocks/mockHarvest.mock';

describe('HarvestController', () => {
  let controller: HarvestController;
  const mockHarvestService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [{ provide: HarvestService, useValue: mockHarvestService }],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a harvest', async () => {
    const createHarvestDto: CreateHarvestDto[] = [mockHarvest];

    mockHarvestService.create.mockResolvedValueOnce({
      statusCode: HttpStatus.CREATED,
      message: `Safra ${MESSAGE.CREATE_SUCCESS}`,
      data: mockHarvest,
    });

    const result = await controller.create(createHarvestDto);

    expect(result).toEqual({
      statusCode: HttpStatus.CREATED,
      message: `Safra ${MESSAGE.CREATE_SUCCESS}`,
      data: mockHarvest,
    });
  });

  it('should update a harvest', async () => {
    const updateHarvestDto: UpdateHarvestDto = mockHarvest;

    mockHarvestService.update.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Safra ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockHarvest,
    });

    const result = await controller.update(1, updateHarvestDto);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Safra ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockHarvest,
    });
  });

  it('should delete a harvest', async () => {
    mockHarvestService.remove.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Safra ${MESSAGE.DELETE_SUCCESS}`,
    });

    const result = await controller.remove(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Safra ${MESSAGE.DELETE_SUCCESS}`,
    });
  });

  it('should find all harvests', async () => {
    mockHarvestService.findAll.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockHarvests,
    });

    const result = await controller.findAll();

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockHarvests,
    });
  });

  it('should find one harvest by id', async () => {
    mockHarvestService.findOne.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockHarvest,
    });

    const result = await controller.findOne(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockHarvest,
    });
  });

  // it('should find all harvests by name', async () => {
  //   mockHarvestService.findName.mockResolvedValueOnce({
  //     statusCode: HttpStatus.OK,
  //     message: MESSAGE.SUCCESS,
  //     data: mockHarvests,
  //   });

  //   const result = await controller.findName(mockHarvest.culture.name.substring(0, 3));

  //   expect(result).toEqual({
  //     statusCode: HttpStatus.OK,
  //     message: MESSAGE.SUCCESS,
  //     data: mockHarvests,
  //   });
  // });
});
