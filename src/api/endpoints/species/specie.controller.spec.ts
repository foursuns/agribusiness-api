import { Test, TestingModule } from '@nestjs/testing';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';
import { CreateSpecieDto, UpdateSpecieDto } from '../../dtos/specie.dto';
import { HttpStatus } from '@nestjs/common';
import { MESSAGE } from '@app/common';
import { mockSpecie, mockSpecies } from './../../mocks/mockSpecie.mock';

describe('SpecieController', () => {
  let controller: SpecieController;
  const mockSpecieService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecieController],
      providers: [{ provide: SpecieService, useValue: mockSpecieService }],
    }).compile();

    controller = module.get<SpecieController>(SpecieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a specie', async () => {
    const createSpecieDto: CreateSpecieDto = mockSpecie;

    mockSpecieService.create.mockResolvedValueOnce({
      statusCode: HttpStatus.CREATED,
      message: `Espécie ${MESSAGE.CREATE_SUCCESS}`,
      data: mockSpecie,
    });

    const result = await controller.create(createSpecieDto);

    expect(result).toEqual({
      statusCode: HttpStatus.CREATED,
      message: `Espécie ${MESSAGE.CREATE_SUCCESS}`,
      data: mockSpecie,
    });
  });

  it('should update a specie', async () => {
    const updateSpecieDto: UpdateSpecieDto = mockSpecie;

    mockSpecieService.update.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Espécie ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockSpecie,
    });

    const result = await controller.update(1, updateSpecieDto);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Espécie ${MESSAGE.UPDATE_SUCCESS}`,
      data: mockSpecie,
    });
  });

  it('should delete a specie', async () => {
    mockSpecieService.remove.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: `Espécie ${MESSAGE.DELETE_SUCCESS}`,
    });

    const result = await controller.remove(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: `Espécie ${MESSAGE.DELETE_SUCCESS}`,
    });
  });

  it('should find all species', async () => {
    mockSpecieService.findAll.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockSpecies,
    });

    const result = await controller.findAll();

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockSpecies,
    });
  });

  it('should find one specie by id', async () => {
    mockSpecieService.findOne.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockSpecie,
    });

    const result = await controller.findOne(1);

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockSpecie,
    });
  });

  it('should find all species by name', async () => {
    mockSpecieService.findName.mockResolvedValueOnce({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockSpecies,
    });

    const result = await controller.findName(mockSpecie.name.substring(0, 3));

    expect(result).toEqual({
      statusCode: HttpStatus.OK,
      message: MESSAGE.SUCCESS,
      data: mockSpecies,
    });
  });
});
