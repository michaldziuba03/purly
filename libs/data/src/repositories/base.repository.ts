import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { transform } from "../transform";

export abstract class BaseRepository<TDoc extends Document, TEntity> {
  protected constructor(
    protected readonly model: Model<TDoc>,
    protected readonly entity: ClassConstructor<TEntity>
  ) {}

  protected mapEntity(data: object | object[]) {
    if (Array.isArray(data)) {
      data = data.map(transform);
    } else {
      data = transform(data);
    }

    return plainToInstance(this.entity, data);
  }

  async create(data: Partial<TDoc>) {
    const result = await this.model.create([data]);
    if (!result.length) {
      return;
    }

    return this.mapEntity(result[0].toObject());
  }

  async updateOne(query: FilterQuery<TDoc>, data: UpdateQuery<TDoc>) {
      const result = await this.model.updateOne(query, data, {
        lean: true,
      });

      return Boolean(result.modifiedCount);
  }

  async findOneAndUpdate(query: FilterQuery<TDoc>, data: UpdateQuery<TDoc>) {
    const result = await this.model.findOneAndUpdate(query, data, {
      new: true,
    });

    if (!result) return;

    return this.mapEntity(result.toObject());
  }

  async findOne(query: FilterQuery<TDoc>) {
    const result = await this.model.findOne(query).lean();
    if (!result) return;

    return this.mapEntity(result);
  }

  async exists(query: FilterQuery<TDoc>) {
    const result = await this.model.exists(query).lean();
    return Boolean(result);
  }

  async deleteOne(query: FilterQuery<TDoc>) {
    const result = await this.model
      .deleteOne(query)
      .lean();

    return result.deletedCount > 0;
  }

  async deleteMany(query: FilterQuery<TDoc> = {}) {
    const result = await this.model
      .deleteMany(query)
      .lean();

    return result.deletedCount;
  }
}
