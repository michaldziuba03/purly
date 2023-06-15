import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Account, Providers } from '../entities/account.entity';

interface ProviderData {
  provider: Providers;
  subject: string;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userCtx: Repository<User>,
    @InjectRepository(Account)
    private readonly accountCtx: Repository<Account>,
    private readonly db: DataSource
  ) {}

  findById(id: string) {
    return this.userCtx.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userCtx.findOneBy({ email });
  }

  async setAsVerified(email: string) {
    const result = await this.userCtx.update({ email }, { isVerified: true });

    return result.affected > 0;
  }

  existsByEmail(email: string): Promise<boolean> {
    return this.userCtx.exist({
      where: {
        email,
      },
    });
  }

  create(data: Partial<User>): Promise<User> {
    const user = this.userCtx.create(data);
    return this.userCtx.save(user);
  }

  async mergeAccount(email: string, providerData: ProviderData) {
    const user = await this.userCtx.findOneBy({ email });
    if (!user) {
      return;
    }

    await this.accountCtx.save({
      provider: providerData.provider,
      subject: providerData.subject,
      userId: user.id,
    });

    return user;
  }

  async createWithProvider(data: Partial<User>, providerData: ProviderData) {
    return this.db.transaction(async (trx) => {
      const userInstance = this.userCtx.create({
        ...data,
        isVerified: true,
      });
      const user = await trx.save(userInstance);

      const account = this.accountCtx.create({
        ...providerData,
        userId: user.id,
      });
      await trx.save(account);

      return user;
    });
  }

  async findIdByAccount(provider: Providers, subject: string): Promise<string> {
    const account = await this.accountCtx.findOneBy({
      provider,
      subject,
    });

    if (!account) {
      return;
    }

    return account.userId;
  }

  async update(filter: Partial<User>, data: Partial<User>) {
    const result = await this.userCtx.update(filter, data);
    return result.affected > 0;
  }
}