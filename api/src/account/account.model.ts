import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
