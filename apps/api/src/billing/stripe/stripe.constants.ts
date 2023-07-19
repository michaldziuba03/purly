export enum Plans {
  FREE = 'free',
  BASIC = 'basic',
  ENTERPRISE = 'enterprise',
}

interface IPlan {
  name: Plans;
  priceId: string;
}

export const PLANS: IPlan[] = [
  {
    name: Plans.BASIC,
    priceId: process.env.STRIPE_BASIC_PRICE || 'price_1N6JxXJjAhwWPueyTv2izTKL',
  },
  {
    name: Plans.ENTERPRISE,
    priceId:
      process.env.STRIPE_ENTERPRISE_PRICE || 'price_1N6Jz3JjAhwWPueyjh3RTONJ',
  },
];

export const PlansNames = PLANS.map((plan) => plan.name);

export function getNameByPriceId(priceId: string) {
  return PLANS.find((plan) => plan.priceId === priceId).name;
}

export function getPriceIdByName(planName: Plans): string {
  return PLANS.find((plan) => plan.name === planName).priceId;
}
