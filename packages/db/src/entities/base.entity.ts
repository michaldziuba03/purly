import { PrimaryKey, Property } from "@mikro-orm/core";
import { UuidFactory } from "../factories/uuid.factory";

export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = UuidFactory.create();

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date;
}
