import { Document, Model, FilterQuery } from 'mongoose';

export abstract class EntityRepository<D extends Document> {
  protected constructor(private readonly entityModel: Model<D>) {}
  private readonly defaultProjection = {};

  create(data: Partial<D>): Promise<D> {
    return this.entityModel.create(data);
  }

  async exists(filter: FilterQuery<D>): Promise<boolean> {
    const result = await this.entityModel.exists(filter).lean();
    return Boolean(result);
  }

  find(filter: FilterQuery<D>) {
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

  findOne(filter: FilterQuery<D>) {
    return this.entityModel
      .findOne(filter, {
        ...this.defaultProjection,
      })
      .lean();
  }

  findOneAndUpdate(filter: FilterQuery<D>, data: Partial<D>) {
    return this.entityModel.findOneAndUpdate(filter, data, {
      new: true,
      projection: { ...this.defaultProjection },
    });
  }

  async deleteOne(filter: FilterQuery<D>): Promise<boolean> {
    const result = await this.entityModel.deleteOne(filter).lean();
    return result.deletedCount > 0;
  }

  async deleteMany(filter: FilterQuery<D>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(filter).lean();
    return result.deletedCount > 0;
  }
}
