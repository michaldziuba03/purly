import { UAParser } from 'ua-parser-js';

export enum OS {
  LINUX = 'linux',
  WINDOWS = 'windows',
  MACOS = 'macos',
  IOS = 'ios',
  ANDROID = 'android',
  UNKNOWN = 'unknown',
}

const distros = ['manjaro', 'ubuntu', 'fedora', 'gentoo', 'mint', 'debian'];

export class DetectDevice {
  public readonly os: OS;
  public readonly browser?: string;

  private readonly parser: UAParser;

  constructor(userAgent: string) {
    this.parser = new UAParser(userAgent);
    this.os = this.getOS();
  }

  private getOS() {
    const rawName = this.parser.getOS().name || OS.UNKNOWN;
    const name = rawName.split(' ').join('').toLocaleLowerCase();

    if (distros.includes(name)) {
      return OS.LINUX;
    }

    switch (name) {
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
}
