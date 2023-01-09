import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Stats, StatsDocument} from "./stats.model";
import {Model} from "mongoose";

@Injectable()
export class StatsService {
    constructor(
        @InjectModel(Stats.name)
        private readonly statsModel: Model<StatsDocument>
    ) {}

    private getDay(date: Date) {
        const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        const startOfYear = Date.UTC(date.getFullYear(), 0, 0);
        const millisecondDiff = current - startOfYear;

        return millisecondDiff / 1000 / 60 / 60 / 24;
    }

    private getDate() {
        const date = new Date();
        const day = this.getDay(date);

        return `${date.getUTCFullYear()}:${day}`;
    }

    upsertStats(alias: string, os: string, browser: string, country: string) {
        const date = this.getDate();
        const incOs = { [`os.${os}`]: 1 };
        const incBrowser = { [`browsers.${browser}`]: 1 };
        let incCountry = {};


        if (country) {
            incCountry = { [`country.${country}`]: 1 };
        }

        return this.statsModel.updateOne({
            date,
            alias
        }, {
            date,
            alias,
            $inc: {
                clicks: 1,
                ...incOs,
                ...incCountry,
                ...incBrowser,
            }
        }, {
            upsert: true,
        });
    }
}
