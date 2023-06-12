# Stripe
We use Stripe to handle payments for subscriptions.

## Configuration

1. Register on [Stripe](https://stripe.com/)
2. Each subscription plan is just a product with recurring pricing. You need to create two products for Basic and Enterprise plans. 

![image](https://github.com/michaldziuba03/url-shortener/assets/43048524/3b7472d7-a446-468b-9586-6a2a2e12142f)

3. Provide `.env` variables for Stripe module in API
```sh
STRIPE_BASIC_PRICE='{PRICE ID FROM Basic PRODUCT PAGE}'
STRIPE_ENTERPRISE_PRICE='{PRICE ID FROM Enterprise PRODUCT PAGE}'

STRIPE_SECRET='{SECRET FROM DASHBOARD}'
STRIPE_WEBHOOK_SECRET='{SECRET FROM DASHBOARD/STRIPE CLI}'
```

## Test webhook locally
Forward your webhook listnener with Stripe CLI:
```sh
$ stripe login # only once - stripe will remember your session
$ stripe listen --forward-to localhost:8000/api/stripe/webhook
```
> Stripe CLI will give you webhook signing secret like whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. Save this value in .env as STRIPE_WEBHOOK_SECRET and restart API. CLI gives you the same secret so no need to repeat this step every time you run listen command.

**Alternatively you can configure ["real" webhook](https://dashboard.stripe.com/test/webhooks) in Developer dashboard and use tools like `ngrok`.**
