import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";

@Schema()
class System {
    @Prop({ default: 0 })
    windows: number;
    @Prop({ default: 0 })
    macos: number;
    @Prop({ default: 0 })
    linux: number;
    @Prop({ default: 0 })
    android: number;
    @Prop({ default: 0 })
    ios: number;
    @Prop({ default: 0 })
    other: number;
}

const SystemSchema = SchemaFactory.createForClass(System);

export type StatsDocument = HydratedDocument<Stats>

@Schema()
export class Stats {
    @Prop()
    date: string; // year:month, for example 2022:10

    @Prop()
    alias: string;

    @Prop({ default: 0 })
    clicks: number;

    @Prop({ type: SystemSchema, default: {} })
    os: System;

    @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
    country: object; // { object with flexible fields like { UK: 200, PL: 123, DE: 20 }

    @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
    browsers: object;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
