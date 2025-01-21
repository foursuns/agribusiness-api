import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.specie.createMany({
    data: [
      { id: 1, name: 'Algodão' },
      { id: 2, name: 'Arroz' },
      { id: 3, name: 'Aveia' },
      { id: 4, name: 'Café' },
      { id: 5, name: 'Cana-de-Açúcar' },
      { id: 6, name: 'Feijão' },
      { id: 7, name: 'Girassol' },
      { id: 8, name: 'Milho' },
      { id: 9, name: 'Soja' },
      { id: 10, name: 'Sorgo' },
      { id: 11, name: 'Trigo' },
    ],
  });

  await prisma.culture.createMany({
    data: [
      { id: 1, type: 'Agrícola', specie_id: 1 },
      { id: 2, type: 'Agrícola', specie_id: 2 },
      { id: 3, type: 'Agrícola', specie_id: 3 },
      { id: 4, type: 'Agrícola', specie_id: 4 },
      { id: 5, type: 'Agrícola', specie_id: 5 },
      { id: 6, type: 'Agrícola', specie_id: 6 },
      { id: 7, type: 'Agrícola', specie_id: 7 },
      { id: 8, type: 'Agrícola', specie_id: 8 },
      { id: 9, type: 'Agrícola', specie_id: 9 },
      { id: 10, type: 'Agrícola', specie_id: 10 },
      { id: 11, type: 'Agrícola', specie_id: 11 },
    ],
  });

  await prisma.producer.createMany({
    data: [
      { id: 1, name: 'Marcio Anthony', type: 'PF', document: '58734414134' },
      { id: 2, name: 'ACME Corp', type: 'PJ', document: '25057001000101' },
    ],
  });

  await prisma.farm.createMany({
    data: [
      {
        id: 1,
        name: 'Fazenda Boa Esperança',
        city: 'Bonito',
        state: 'MS',
        country: 'Brasil',
        producer_id: 1,
        total_area: 100,
        planting_area: 70,
        vegetation_area: 30,
      },
      {
        id: 2,
        name: 'Fazenda Campestre',
        city: 'Araguapaz',
        state: 'GO',
        country: 'Brasil',
        producer_id: 2,
        total_area: 150,
        planting_area: 100,
        vegetation_area: 50,
      },
    ],
  });

  await prisma.harvest.createMany({
    data: [
      { id: 1, farm_id: 1, culture_id: 1, year: 2023 },
      { id: 2, farm_id: 1, culture_id: 2, year: 2023 },
      { id: 3, farm_id: 1, culture_id: 3, year: 2023 },
      { id: 4, farm_id: 1, culture_id: 1, year: 2024 },
      { id: 5, farm_id: 1, culture_id: 2, year: 2024 },
      { id: 6, farm_id: 1, culture_id: 3, year: 2024 },
      { id: 7, farm_id: 2, culture_id: 1, year: 2023 },
      { id: 8, farm_id: 2, culture_id: 2, year: 2023 },
      { id: 9, farm_id: 2, culture_id: 2, year: 2024 },
      { id: 10, farm_id: 2, culture_id: 3, year: 2024 },
    ],
  });

  console.log('Database Seeded');
  await prisma.$disconnect();
}

seed().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
