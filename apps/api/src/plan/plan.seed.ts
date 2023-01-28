import { Plans } from './plan.schema';

export enum Currencies {
  PLN = 'PLN',
}

export interface IPlanSeed {
  id: Plans;
  name: string;
  description: string;
  price: number;
  currency: Currencies;
}

export const planSeed: IPlanSeed[] = [
  {
    id: Plans.BASIC,
    name: 'Basic',
    description: 'Basic plan for small businesses and content creators.',
    currency: Currencies.PLN,
    price: 20,
  },
  {
    id: Plans.PRO,
    name: 'Pro',
    description: 'Plan for bigger companies and influencers.',
    currency: Currencies.PLN,
    price: 40,
  },
];
