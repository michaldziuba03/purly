# URL shortener
Under active development (early stage).

## Screenshots - current state
> Homepage

![image](https://user-images.githubusercontent.com/43048524/234128807-0ec69f73-b01d-49a3-9b10-2300d28e70e3.png)

## Tech stack
- Node.js
- Nest.js
- MongoDB
- Redis
- Next.js
- React
- Docker

## Features
- [x] Email Verification
- [ ] Social Authentication (Google, GitHub)
- [x] Email & Password Authentication
- [x] Reset Password flow
- [x] Google Recaptcha support
- [x] Paid monthly subscriptions (Stripe)
- [x] URL shortening
- [ ] QR Codes generation
- [x] Reporting malicious URLs
- [ ] Rate Limiting
- [ ] Statistics for shortened URLs
- [x] Health checks
- [ ] Caching

## Development
#### 1. Install dependencies like: Docker, Node.js, pnpm and stripe-cli
```sh
$ pnpm install
$ docker compose up
```
#### 2. Run applications (api, worker and frontend web app)
```sh
$ pnpm --filter @apps/* start:dev
```
#### 3. Forward Stripe webhook locally
```sh
$ stripe login # only once - stripe will remember your session
$ stripe listen --forward-to localhost:8000/api/stripe/webhook
```
> Stripe CLI will give you webhook signing secret like `whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. Save this value in .env as **STRIPE_WEBHOOK_SECRET** and restart API. CLI gives you the same secret so no need to repeat this step every time you run listen command.

## License
Distributed under the MIT License. See `LICENSE` for more information.
