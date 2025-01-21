import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { CreateProducerDto, UpdateProducerDto } from '../../dtos/producer.dto';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockProducer, mockProducerDto, mockProducers } from './../../mocks/mockProducer.mock';

describe('ProducerController', () => {
  let controller: ProducerController;
  const mockProducerService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [{ provide: ProducerService, useValue: mockProducerService }],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a producer', async () => {
    const createProducerDto: CreateProducerDto = mockProducerDto;

    mockProducerService.create.mockResolvedValueOnce({
      statusCode: HttpStatus.CREATED,
      message: `Produtor ${MESSAGE.CREATE_SUCCESS}`,
      data: mockProducer,
    });

    const result = await controller.create(createProducerDto);

    expect(result).toEqual({
      statusCode: HttpStatus.CREATED,
      message: `Produtor ${MESSAGE.CREATE_SUCCESS}`,
      data: mockProducer,
    });
  });

  it('should update a producer', async () => {
    const updateProducerDto: UpdateProducerDto = mockProducerDto;

    mockProducerService.update.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Produtor ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockProducer,
    });

    const result = await controller.update(1, updateProducerDto);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Produtor ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockProducer,
    });
  });

  it('should delete a producer', async () => {
    mockProducerService.remove.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Produtor ${MESSAGE.DELETE_SUCCESS}`,
    });

    const result = await controller.remove(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Produtor ${MESSAGE.DELETE_SUCCESS}`,
    });
  });

  it('should find all producers', async () => {
    mockProducerService.findAll.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockProducers,
    });

    const result = await controller.findAll();

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockProducers,
    });
  });

  it('should find one producer by id', async () => {
    mockProducerService.findOne.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockProducer,
    });

    const result = await controller.findOne(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockProducer,
    });
  });

  it('should find all producers by name', async () => {
    mockProducerService.findName.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockProducers,
    });

    const result = await controller.findName(mockProducer.name.substring(0, 3));

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockProducers,
    });
  });
});
