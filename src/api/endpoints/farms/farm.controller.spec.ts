import { Test, TestingModule } from '@nestjs/testing';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { CreateFarmDto, UpdateFarmDto } from '../../dtos/farm.dto';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockFarm, mockFarmAndProducer, mockFarms } from './../../mocks/mockFarm.mock';

describe('FarmController', () => {
  let controller: FarmController;
  const mockFarmService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [{ provide: FarmService, useValue: mockFarmService }],
    }).compile();

    controller = module.get<FarmController>(FarmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a farm', async () => {
    const createFarmDto: CreateFarmDto = mockFarm;

    mockFarmService.create.mockResolvedValueOnce({
      statusCode: HttpStatus.CREATED,
      message: `Fazenda ${MESSAGE.CREATE_SUCCESS}`,
      data: mockFarm,
    });

    const result = await controller.create(createFarmDto);

    expect(result).toEqual({
      statusCode: HttpStatus.CREATED,
      message: `Fazenda ${MESSAGE.CREATE_SUCCESS}`,
      data: mockFarm,
    });
  });

  it('should update a farm', async () => {
    const updateFarmDto: UpdateFarmDto = mockFarm;

    mockFarmService.update.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Fazenda ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockFarm,
    });

    const result = await controller.update(1, updateFarmDto);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Fazenda ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockFarm,
    });
  });

  it('should delete a farm', async () => {
    mockFarmService.remove.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Fazenda ${MESSAGE.DELETE_SUCCESS}`,
    });

    const result = await controller.remove(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Fazenda ${MESSAGE.DELETE_SUCCESS}`,
    });
  });

  it('should find all farms', async () => {
    mockFarmService.findAll.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockFarms,
    });

    const result = await controller.findAll();

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockFarms,
    });
  });

  it('should find one farm by id', async () => {
    mockFarmService.findOne.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockFarmAndProducer,
    });

    const result = await controller.findOne(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockFarmAndProducer,
    });
  });

  it('should find all farms by name', async () => {
    mockFarmService.findName.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockFarms,
    });

    const result = await controller.findName(mockFarm.name.substring(0, 3));

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockFarms,
    });
  });
});
