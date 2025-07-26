import { Entity, ManyToOne, PrimaryKey, Property, Ref } from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class ResetToken {
  @PrimaryKey({ type: 'text' })
  token: string;

  @ManyToOne(() => User)
  user: Ref<User>;

  @Property()
  createdAt: Date;
  
  @Property()
  expiresAt: Date;
}
