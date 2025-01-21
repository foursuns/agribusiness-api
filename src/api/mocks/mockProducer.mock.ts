import { CreateProducerDto } from './../dtos/producer.dto';

export const mockProducer = {
  id: 1,
  name: 'Marcio Anthony',
  type: 'PF',
  document: '58734414134',
};

export const mockProducerDto: CreateProducerDto = {
  name: 'Marcio Anthony',
  type: 'PF',
  document: '58734414134',
};

export const mockProducers = [
  { id: 1, name: 'Marcio Anthony', type: 'PF', document: '58734414134' },
  { id: 2, name: 'ACME Corp', type: 'PJ', document: '25057001000101' },
];
