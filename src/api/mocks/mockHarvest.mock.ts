export const mockHarvest = {
  id: 1,
  farm_id: 1,
  culture_id: 1,
  year: 2024,
};

export const mockHarvestAndCulture = {
  id: 1,
  farm_id: 1,
  culture_id: 1,
  year: 2024,
  culture: {
    type: 'Agrícola',
    specie_id: 1,
    specie: {
      name: 'Algodão',
    },
  },
};

export const mockHarvests = [
  {
    id: 1,
    farm_id: 1,
    culture_id: 1,
    year: 2024,
    culture: {
      type: 'Agrícola',
      specie_id: 1,
      specie: {
        name: 'Algodão',
      },
    },
  },
  {
    id: 2,
    farm_id: 1,
    culture_id: 2,
    year: 2024,
    culture: {
      type: 'Agrícola',
      specie_id: 2,
      specie: {
        name: 'Arroz',
      },
    },
  },
];
