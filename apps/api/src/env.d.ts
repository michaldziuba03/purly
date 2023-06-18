declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    SESSION_SECRET: string;
    API_PREFIX: string;
    CLIENT_URL?: string;
    REPORT_MAIL?: string;
    SENTRY_DSN?: string;
    GENERATOR?: 'sequential' | 'random';
    POSTGRES_URI: string;
    ZOOKEEPER_URI?: string;
    REDIS_URI: string;
    STRIPE_SECRET?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    STRIPE_WEBHOOK_PATH?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    GITHUB_CLIENT_ID?: string;
    GITHUB_CLIENT_SECRET?: string;
    ENABLE_RECAPTCHA?: string;
    RECAPTCHA_SECRET?: string;
    RECAPTCHA_CLIENT?: string;
  }
}
