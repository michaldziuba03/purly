import { getRandomValues, createHash } from "node:crypto";
import argon2 from 'argon2';

export class Toolbox {
  static generateSecureRandomString(): string {
    const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
    const bytes = new Uint8Array(24);
    getRandomValues(bytes);

    let id = "";
    for (let i = 0; i < bytes.length; i++) {
      id += alphabet[bytes[i] >> 3];
    }
    return id;
  }

  static hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  static verifyHash(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  static createSHA256(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }
}
