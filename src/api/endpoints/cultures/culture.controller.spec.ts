import { Test, TestingModule } from '@nestjs/testing';
import { CultureController } from './culture.controller';
import { CultureService } from './culture.service';
import { CreateCultureDto, UpdateCultureDto } from '../../dtos/culture.dto';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockCulture, mockCultures, mockCultureAndSpecie } from './../../mocks/mockCulture.mock';

describe('CultureController', () => {
  let controller: CultureController;
  const mockCultureService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultureController],
      providers: [{ provide: CultureService, useValue: mockCultureService }],
    }).compile();

    controller = module.get<CultureController>(CultureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a culture', async () => {
    const createCultureDto: CreateCultureDto = mockCulture;

    mockCultureService.create.mockResolvedValueOnce({
      statusCode: HttpStatus.CREATED,
      message: `Cultura ${MESSAGE.CREATE_SUCCESS}`,
      data: mockCulture,
    });

    const result = await controller.create(createCultureDto);

    expect(result).toEqual({
      statusCode: HttpStatus.CREATED,
      message: `Cultura ${MESSAGE.CREATE_SUCCESS}`,
      data: mockCulture,
    });
  });

  it('should update a culture', async () => {
    const updateCultureDto: UpdateCultureDto = mockCulture;

    mockCultureService.update.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Cultura ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockCulture,
    });

    const result = await controller.update(1, updateCultureDto);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Cultura ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockCulture,
    });
  });

  it('should delete a culture', async () => {
    mockCultureService.remove.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Cultura ${MESSAGE.DELETE_SUCCESS}`,
    });

    const result = await controller.remove(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Cultura ${MESSAGE.DELETE_SUCCESS}`,
    });
  });

  it('should find all cultures', async () => {
    mockCultureService.findAll.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockCultures,
    });

    const result = await controller.findAll();

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockCultures,
    });
  });

  it('should find one culture by id', async () => {
    mockCultureService.findOne.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockCultureAndSpecie,
    });

    const result = await controller.findOne(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockCultureAndSpecie,
    });
  });

  it('should find all cultures by name', async () => {
    mockCultureService.findName.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockCultures,
    });

    const result = await controller.findName(mockCultureAndSpecie.specie.name.substring(0, 3));

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockCultures,
    });
  });
});
