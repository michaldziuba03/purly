import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';
import { TransactionSession } from './transaction.manager';

export interface IEntityOptions {
  transaction?: TransactionSession;
}

export abstract class EntityRepository<D extends Document> {
  protected constructor(private readonly entityModel: Model<D>) {}
  private readonly defaultProjection = {};

  async create(data: Partial<D>, options: IEntityOptions = {}): Promise<D> {
    if (options.transaction) {
      const result = await this.entityModel.create([data], {
        session: options.transaction?.session,
      });

      if (Array.isArray(result)) {
        return result[0];
      }

      return result;
    }

    return this.entityModel.create(data);
  }

  updateOne(
    filter: FilterQuery<D>,
    data: UpdateQuery<D>,
    options: IEntityOptions = {},
  ): any {
    return this.entityModel.updateOne(filter, data, {
      lean: true,
      session: options.transaction?.session,
    });
  }

  async exists(filter: FilterQuery<D>): Promise<boolean> {
    const result = await this.entityModel.exists(filter).lean();
    return Boolean(result);
  }

  find(filter: FilterQuery<D> = {}) {
    return this.entityModel.find(filter, {
      ...this.defaultProjection,
    });
  }

  findOneById(id: string) {
    return this.entityModel
      .findById(id, {
        ...this.defaultProjection,
      })
      .lean();
  }

  findOne(filter: FilterQuery<D> = {}) {
    return this.entityModel
      .findOne(filter, {
        ...this.defaultProjection,
      })
      .lean();
  }

  findOneAndUpdate(
    filter: FilterQuery<D> = {},
    data: Partial<D>,
    options: IEntityOptions = {},
  ) {
    return this.entityModel.findOneAndUpdate(filter, data, {
      new: true,
      projection: { ...this.defaultProjection },
      session: options.transaction?.session,
    });
  }

  findOneAndDelete(filter: FilterQuery<D> = {}, options: IEntityOptions = {}) {
    return this.entityModel
      .findOneAndDelete(filter)
      .session(options.transaction?.session)
      .lean();
  }

  async deleteOne(
    filter: FilterQuery<D> = {},
    options: IEntityOptions = {},
  ): Promise<boolean> {
    const result = await this.entityModel
      .deleteOne(filter)
      .session(options.transaction?.session)
      .lean();
    return result.deletedCount > 0;
  }

  async deleteMany(
    filter: FilterQuery<D> = {},
    options: IEntityOptions = {},
  ): Promise<boolean> {
    const result = await this.entityModel
      .deleteMany(filter)
      .session(options.transaction?.session)
      .lean();
    return result.deletedCount > 0;
  }
}
