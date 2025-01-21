export const mockDashboard = {
  farms: {
    _count: {
      name: 2,
    },
    _sum: {
      total_area: 31,
      planting_area: 22.5,
      vegetation_area: 8.5,
    },
  },
  cultures: [
    {
      culture_id: 2,
      year: 2024,
      name: 'Algodão',
      planting_area: 22.5,
    },
    {
      culture_id: 1,
      year: 2024,
      name: 'Arroz',
      planting_area: 22.5,
    },
    {
      culture_id: 3,
      year: 2024,
      name: 'Feijão',
      planting_area: 22.5,
    },
    {
      culture_id: 2,
      year: 2023,
      name: 'Algodão',
      planting_area: 7.5,
    },
    {
      culture_id: 1,
      year: 2023,
      name: 'Arroz',
      planting_area: 7.5,
    },
  ],
  states: [
    {
      _count: {
        name: 1,
      },
      _sum: {
        total_area: 10.5,
        planting_area: 7.5,
        vegetation_area: 3,
      },
      state: 'MT',
    },
    {
      _count: {
        name: 1,
      },
      _sum: {
        total_area: 20.5,
        planting_area: 15,
        vegetation_area: 5.5,
      },
      state: 'GO',
    },
  ],
};
