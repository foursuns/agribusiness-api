import { CreateCultureDto } from '../dtos/culture.dto';

export const mockCulture: CreateCultureDto = {
  type: 'Agrícola',
  specie_id: 1,
};

export const mockCultureAndSpecie = {
  id: 1,
  type: 'Agrícola',
  specie_id: 1,
  specie: { name: 'Algodão' },
};

export const mockCultures = [
  { id: 1, type: 'Agrícola', specie_id: 1, specie: { name: 'Algodão' } },
  { id: 2, type: 'Agrícola', specie_id: 2, specie: { name: 'Arroz' } },
];
