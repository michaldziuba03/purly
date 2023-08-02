## What is Purly?

Purly is open source SaaS platform for managing your brand links. Shorten URLs, generate QR codes, create link in bio page for your company and track traffic.

### Why Purly exists?

The primary goal of this project is to provide solid and well documented sample application with subscription plans, payments and queue messaging.

### Tech stack

Application is written in TypeScript runs under Node.js environment. Nx is used for managing monorepo structure and builds.

Purly uses PostgreSQL as primary database for storing most of data. Clickhouse is used for traffic analytics. Redis is used for caching, session storage and queue system (BullMQ).

Purly optionally uses Zookeeper to generate sequential aliases for links. You can change it to generate random aliases with `nanoid` library.
