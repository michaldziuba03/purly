import { defineConfig, LoadStrategy } from "@mikro-orm/postgresql";
import { Options } from "@mikro-orm/postgresql";
import { User } from "../entities/user.entity";
import { BaseEntity } from "../entities/base.entity";
import { ResetToken } from "../entities/reset-token.entity";

export class ConfigFactory {
  private static loadEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue === undefined) {
        throw new Error(`Environment variable '${key}' is not set`);
      }
      return defaultValue;
    }
    return value;
  }

  static create(overrides: Partial<Options> = {}) {
    return defineConfig({
      entities: [BaseEntity, User, ResetToken],
      allowGlobalContext: false,
      loadStrategy: LoadStrategy.JOINED,
      clientUrl: this.loadEnv("DATABASE_URL"),
      ...overrides,
    });
  }
}
