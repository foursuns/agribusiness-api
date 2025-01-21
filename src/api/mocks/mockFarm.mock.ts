export const mockFarm = {
  id: 1,
  name: 'Fazenda Boa Esperança',
  city: 'Bonito',
  state: 'MS',
  country: 'Brasil',
  producer_id: 1,
  total_area: 100,
  planting_area: 50,
  vegetation_area: 50,
};

export const mockFarmAndProducer = {
  id: 1,
  name: 'Fazenda Boa Esperança',
  city: 'Bonito',
  state: 'MS',
  country: 'Brasil',
  producer_id: 1,
  total_area: 100,
  planting_area: 50,
  vegetation_area: 50,
  producer: {
    name: 'Marcio Anthony',
    type: 'PF',
    document: '12345678901',
  },
};

export const mockFarms = [
  {
    id: 1,
    name: 'Fazenda Boa Esperança',
    city: 'Bonito',
    state: 'MS',
    country: 'Brasil',
    producer_id: 1,
    total_area: 100,
    planting_area: 50,
    vegetation_area: 50,
    producer: {
      name: 'Marcio Anthony',
      type: 'PF',
      document: '12345678901',
    },
  },
  {
    id: 2,
    name: 'Fazenda Campestre',
    city: 'Araguapaz',
    state: 'GO',
    country: 'Brasil',
    producer_id: 2,
    total_area: 100,
    planting_area: 50,
    vegetation_area: 50,
    producer: {
      name: 'ACME Corp',
      type: 'PJ',
      document: '12345678000190',
    },
  },
];
