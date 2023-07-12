import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DatabaseContext, InjectDB } from '../database.provider';
import { oauthAccounts, resetTokens, users } from './user.schema';
import { BaseRepository } from '../base.repository';
import { InsertUser, OAuthProviders, User } from './user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectDB() private readonly db: DatabaseContext) {
    super(User);
  }

  async create(data: InsertUser) {
    const result = await this.db.insert(users).values(data).returning();

    return this.mapSingle(result);
  }

  async findById(id: string) {
    const result = await this.db.select().from(users).where(eq(users.id, id));

    return this.mapSingle(result);
  }

  async findByEmail(email: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return this.mapSingle(result);
  }

  async existsByEmail(email: string) {
    const result = await this.db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email));

    return result.length > 0;
  }

  async updateById(id: string, data: Partial<User>) {
    const result = await this.db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return this.mapSingle(result);
  }

  async connectOAuth(
    id: string,
    providerName: OAuthProviders,
    providerId: string
  ): Promise<boolean> {
    const result = await this.db.insert(oauthAccounts).values({
      userId: id,
      providerName,
      providerId,
    });

    return result.rowCount > 0;
  }

  createWithOAuth(
    userData: Omit<InsertUser, 'password'>,
    providerName: OAuthProviders,
    providerId: string
  ) {
    return this.db.transaction(async (tx) => {
      const userInsert = await tx
        .insert(users)
        .values({
          ...userData,
          isVerified: true,
        })
        .returning({ id: users.id });

      const user = this.mapSingle(userInsert);
      if (!user) throw new Error('Something went wrong');

      await tx.insert(oauthAccounts).values({
        userId: user.id,
        providerId,
        providerName,
      });

      return user;
    });
  }

  async findIdByOAuth(
    providerName: OAuthProviders,
    providerId: string
  ): Promise<string | undefined> {
    const result = await this.db
      .select({ userId: oauthAccounts.userId })
      .from(oauthAccounts)
      .where(
        and(
          eq(oauthAccounts.providerName, providerName),
          eq(oauthAccounts.providerId, providerId)
        )
      );

    if (!result.length) return;

    return result[0].userId;
  }

  async saveResetToken(userId: string, token: string, expiresIn: number) {
    const expiration = Date.now() + expiresIn; // should expire in 20 minutes from now();
    await this.db
      .insert(resetTokens)
      .values({
        userId,
        token,
        expiresAt: new Date(expiration),
      })
      .onConflictDoUpdate({
        target: resetTokens.userId,
        set: { token, expiresAt: new Date(expiration) },
      });
  }

  async getResetToken(token: string) {
    const metadata = await this.db.query.resetTokens.findFirst({
      where: eq(resetTokens.token, token),
    });

    return metadata;
  }

  async clearResetToken(userId: string) {
    const result = await this.db
      .delete(resetTokens)
      .where(eq(resetTokens.userId, userId));

    return result.rowCount > 0;
  }
}
