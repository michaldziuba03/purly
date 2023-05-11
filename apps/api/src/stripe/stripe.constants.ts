interface IPlan {
  id: 'basic' | 'enterprise';
  name: string;
  priceId: string;
  quota: number;
  price: number;
}

const PLANS: IPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 7,
    quota: 40_000,
    priceId: process.env.STRIPE_BASIC_PRICE || 'price_1N6JxXJjAhwWPueyTv2izTKL',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 100,
    quota: 1_100_000,
    priceId:
      process.env.STRIPE_ENTERPRISE_PRICE || 'price_1N6Jz3JjAhwWPueyjh3RTONJ',
  },
];

export const PRICES: string[] = PLANS.map((plan) => plan.priceId);

export function getPlanByPriceId(priceId: string) {
  return PLANS.find((plan) => plan.priceId === priceId);
}
