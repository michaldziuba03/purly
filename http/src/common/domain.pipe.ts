import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isIP } from 'net';

@Injectable()
export class DomainPipe implements PipeTransform {
    constructor(
        private readonly blacklist: string[],
    ) {}

    transform(url: string) {
        const hostname = this.validateIsURL(url);
        if (!hostname) {
            throw new BadRequestException('Invalid URL!');
        }

        const IpVersion = isIP(hostname);
        if (IpVersion === 6 || IpVersion === 4) {
            throw new BadRequestException('IPs are not allowed!');
        }

        if (this.blacklist.includes(hostname)) {
            throw new BadRequestException('This domain is not allowed!');
        }

        return url;
    }

    private validateIsURL(url: string) {
        const allowedProtocols = ['http:', 'https:'];
        
        try {
            const { port, hostname, protocol } = new URL(url);

            if (!hostname.includes('.')) {
                return;
            }

            if (port !== '') {
                return;
            }
    
            if (!allowedProtocols.includes(protocol)) {
                return;
            }
    
            return hostname;

        } catch (err) {
            return;
        }
    }
}
