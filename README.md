# purly ✂

Scalable and distrubuted SaaS platform for managing your brand links. Under active development. Primary goal of this project is to create sample that **does more** than just simple CRUD.

## Tech stack

- Node.js
- NestJS
- PostgreSQL ([Drizzle ORM](https://orm.drizzle.team/))
- Redis ([ioredis](https://github.com/redis/ioredis))
- Next.js
- React
- Docker
- Kafka ([KafkaJS](https://kafka.js.org/))
- Zookeeper ([node-zookeeper](https://github.com/yfinkelstein/node-zookeeper))
- Clickhouse ([clickhouse-js](https://github.com/ClickHouse/clickhouse-js))

## Advanced concepts used in app

- [x] Distributed locks (with redlock)
- [x] Asynchronous messaging (with Kafka)
- [ ] Caching
- [ ] Rate-limiting
- [x] Error monitoring (with Sentry)

## Features

- [ ] Email Verification
- [x] Social Authentication (Google, GitHub)
- [x] Email & Password Authentication
- [x] Reset Password flow
- [x] Google Recaptcha support
- [x] Paid monthly subscriptions (Stripe)
- [x] URL shortening
- [ ] QR Codes generation
- [x] Reporting malicious URLs
- [x] UTM Generator
- [x] Mobile Redirects
- [x] Link Redirect Expiration
- [ ] Statistics for shortened URLs
- [x] Health checks
- [ ] Link in bio
- [ ] Custom domains
- [x] Workspaces with members management

### Todo
- prevent sending same email multiple times (it may happen when worker crash before kafka client will commit offset)
- write e2e tests
- create CI pipeline

## Development

Project uses [Nx workspaces](https://nx.dev/) for building and handling monorepo structure.

### Run databases and services

```sh
docker compose up
```

### Run setup scripts

```sh
# will install depedencies and create .env file
npm run setup
# run migrations (will run migrations against database defined in env.POSTGRES_URI)
npm run db:migrate
```

### Run applications (api, worker and frontend web app)

```sh
npm run serve
```

### Forward Stripe webhook locally

Purly uses `STRIPE_WEBHOOK_PATH` variable for webhook URL obfuscation. Don't forget to replace it in production with your own random value.

```sh
stripe login # only once - stripe will remember your session
stripe listen --forward-to localhost:8000/api/stripe/webhook/e7a42abb5d31ec92bdfeec3cb0a4fa1b
```

> Stripe CLI will give you webhook signing secret like `whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. Save this value in .env as **STRIPE_WEBHOOK_SECRET** and restart API. CLI gives you the same secret so no need to repeat this step every time you run listen command.

## Contributing

Currently project is in early stage of development and many things are changing so often. Keep it in mind if you want to contribute.

1. Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for commits and PRs.
2. If you want to introduce bigger change I recommend to create issue first with feature request and get approval from mantainer :) Otherwise your pull request can be declined and you will waste your time.
3. After changes in table schemas, run `db:generate` script to generate migrations and run `db:migrate` to run migration.

## License

Distributed under the MIT License. See `LICENSE` for more information.
