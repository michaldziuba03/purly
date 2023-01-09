import {Process, Processor} from "@nestjs/bull";
import { Job } from 'bull';
import {StatsService} from "./stats.service";
import * as UAParser from "ua-parser-js";
import * as geoip from 'geoip-country';

@Processor('stats')
export class StatsProcessor {
    constructor(
        private readonly statsService: StatsService,
    ) {}

    private readonly browsers = ['firefox', 'chrome', 'edge', 'ie', 'mozilla', 'opera', 'vivaldi']
    getBrowser(ua: UAParser) {
        const browser = ua.getBrowser();
        if (!browser.name) return 'unknown';

        const browserName = browser.name
            .toLowerCase()
            .split(' ')
            .join();

        if (!this.browsers.includes(browserName)) {
            return 'unknown';
        }

        return browserName;
    }

    private readonly distros = ['ubuntu', 'fedora', 'manjaro', 'debian', 'gentoo', 'redhat', 'arch'];
    private readonly systems = ['windows', 'linux', 'android', 'ios', 'macos'];
    getOs(ua: UAParser) {
        const os = ua.getOS();
        if (!os.name) return 'other';

        const system = os.name
            .toLowerCase()
            .split(' ')
            .join();

        if (this.distros.includes(system)) {
            return 'linux';
        }

        if (!this.systems.includes(system)) {
            return 'other'
        };

        return system;
    }

    getCountry(ip: string) {
        try {
            const result = geoip.lookup(ip);
            if (!result) return;

            return result.country;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    @Process()
    async recordClick(job: Job) {
        const payload = job.data;
        console.log(payload);
        const ua = new UAParser(payload.agent);
        const os = this.getOs(ua);
        const browser = this.getBrowser(ua);
        const country = this.getCountry(payload.ip);
        const result = await this.statsService.upsertStats(payload.alias, os, browser, country);
        console.log(result);
    }
}