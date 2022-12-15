import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { HydratedDocument } from "mongoose";

export type AliasDocument = HydratedDocument<Alias>;

@Schema({
    timestamps: true,
})
export class Alias {
    @Prop({ unique: true })
    token: string;
    
    @Prop()
    number: number;

    @Prop()
    url: string; 
}

export const AliasSchema = SchemaFactory.createForClass(Alias);
