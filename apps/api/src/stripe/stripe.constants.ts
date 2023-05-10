interface IPlan {
  name: string;
  priceId: string;
  quota: number;
  price: number;
}

const PLANS: IPlan[] = [
  {
    name: 'Basic',
    price: 7,
    quota: 40_000,
    priceId: process.env.STRIPE_BASIC_PRICE || 'price_1N6JxXJjAhwWPueyTv2izTKL',
  },
  {
    name: 'Enterprise',
    price: 100,
    quota: 1_100_000,
    priceId:
      process.env.STRIPE_ENTERPRISE_PRICE || 'price_1N6Jz3JjAhwWPueyjh3RTONJ',
  },
];

export const PRICES: string[] = PLANS.map((plan) => plan.priceId);
