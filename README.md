<img width="1024px" src="https://github.com/michaldziuba03/purly/assets/43048524/97c35411-8126-4157-afbf-ac445345e869" />

# purly ✂

Scalable and distrubuted SaaS platform for managing your brand links. Under active development. Primary goal of this project is to create sample that **does more** than just simple CRUD.

> Frontend is still in very early stage of development.

![links-page](https://github.com/michaldziuba03/purly/assets/43048524/f93af5b3-e843-4f91-a561-e1d72a277cc8)

![team-page](https://github.com/michaldziuba03/purly/assets/43048524/62af6087-d89d-4f1f-9437-6312b694db70)

![qr-code-preview](https://github.com/michaldziuba03/purly/assets/43048524/c325bf99-8777-499f-9df7-ff6800566ebd)

> Currently only downloading as PNG is possible. In the future SVG and JPEG will be added.


## Tech stack

- Node.js
- NestJS
- PostgreSQL ([Drizzle ORM](https://orm.drizzle.team/))
- Redis ([ioredis](https://github.com/redis/ioredis))
- Next.js
- React
- Docker
- Zookeeper ([node-zookeeper](https://github.com/yfinkelstein/node-zookeeper))
- Clickhouse ([clickhouse-js](https://github.com/ClickHouse/clickhouse-js))

## Advanced concepts used in app

- [x] Distributed locks (with redlock)
- [x] Asynchronous messaging (with BullMQ)
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
- [x] QR Codes generation
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

- write e2e tests (currently partially written for user, workspace and auth modules)
- create CI pipeline

## Development

Project uses [Nx workspaces](https://nx.dev/) for building and handling monorepo structure.

### Run databases and services

```sh
cd docker
docker compose up
```

### Run setup scripts

```sh
# will install depedencies and create .env file
npm run setup
# run migrations (will run migrations against database defined in env.POSTGRES_URI)
npm run db:migrate
# run migrations for stats database (definied CLICKHOUSE_ env variables)
npm run stats:migrate
```

### Configure S3 with Localstack (optional)

Purly uses localstack to simulate AWS S3 for local development. We suggest to use AWS CLI for initial configuration.

```sh
aws configure
# Questions answers:
# AWS Access Key ID [None]: test
# AWS Secret Access Key [None]: test
# Default region name [None]: us-east-1
# Default output format [None]:

# Create bucket for local development
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket purly-local

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

## Contributors

![contributors](https://contributors-img.web.app/image?repo=michaldziuba03/purly)
