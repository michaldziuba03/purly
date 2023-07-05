import { UAParser } from 'ua-parser-js';
import * as geoip from 'geoip-country';

export enum OS {
  LINUX = 'linux',
  WINDOWS = 'windows',
  MACOS = 'macos',
  IOS = 'ios',
  ANDROID = 'android',
  UNKNOWN = 'unknown',
}

export enum Browser {
  CHROME = 'chrome',
  FIREFOX = 'firefox',
  BRAVE = 'brave',
  EDGE = 'edge',
  IE = 'ie',
  SAFARI = 'safari',
  CHROMIUM = 'chromium',
  OPERA = 'opera',
  UNKNOWN = 'unknown',
}

const distros = [
  'manjaro',
  'ubuntu',
  'fedora',
  'gentoo',
  'mint',
  'debian',
  'centos',
  'elementaryos',
];

export class DetectDevice {
  public readonly os: OS;
  public readonly browser: Browser;
  public readonly country?: string;

  private readonly parser: UAParser;

  get isAndroid() {
    return this.os === OS.ANDROID;
  }

  get isIOS() {
    return this.os === OS.IOS;
  }

  constructor(userAgent: string, remoteAddress: string) {
    this.parser = new UAParser(userAgent);
    this.os = this.getOS();
    this.browser = this.getBrowser();
    this.country = this.getCountry(remoteAddress);
  }

  private transform(value: string) {
    return value.split(' ').join('').toLowerCase();
  }

  private getOS() {
    const os = this.transform(this.parser.getOS().name || OS.UNKNOWN);

    if (distros.includes(os)) {
      return OS.LINUX;
    }

    switch (os) {
      case OS.ANDROID:
        return OS.ANDROID;
      case OS.IOS:
        return OS.IOS;
      case OS.LINUX:
        return OS.LINUX;
      case OS.MACOS:
        return OS.MACOS;
      case OS.WINDOWS:
        return OS.WINDOWS;
      default:
        return OS.UNKNOWN;
    }
  }

  private getBrowser() {
    const browser = this.transform(
      this.parser.getBrowser().name || Browser.UNKNOWN
    );

    switch (browser) {
      case Browser.BRAVE:
        return Browser.BRAVE;
      case Browser.CHROME:
        return Browser.CHROME;
      case Browser.CHROMIUM:
        return Browser.CHROMIUM;
      case Browser.EDGE:
        return Browser.EDGE;
      case Browser.FIREFOX:
        return Browser.FIREFOX;
      case Browser.IE:
        return Browser.IE;
      case Browser.SAFARI:
        return Browser.SAFARI;
      case Browser.OPERA:
        return Browser.OPERA;
      default:
        return Browser.UNKNOWN;
    }
  }

  private getCountry(remoteAddress: string) {
    const ip =
      process.env.NODE_ENV === 'development' ? '207.97.227.239' : remoteAddress;

    try {
      const result = geoip.lookup(ip);
      if (!result) return;

      return result.country;
    } catch (err) {
      return;
    }
  }
}
