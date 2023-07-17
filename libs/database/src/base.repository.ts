import { ClassConstructor, plainToInstance } from 'class-transformer';

export class BaseRepository<TEntity extends object> {
  constructor(private readonly entity: ClassConstructor<TEntity>) {}

  protected mapSingle(data: object | object[]) {
    if (!data) return;

    if (Array.isArray(data)) {
      if (!data.length) return;

      return plainToInstance(this.entity, data[0]);
    }

    return plainToInstance(this.entity, data);
  }

  protected mapMany(data: object[]) {
    return plainToInstance(this.entity, data);
  }
}
