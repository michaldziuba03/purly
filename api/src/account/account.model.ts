import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Plans } from "src/subscription/subscription.constants";

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
    id: string;

    @Prop()
    picture: string;

    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    customerId?: string;

    @Prop()
    plan?: Plans;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
