import argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';

export class AuthService {
  hashPassword(plain: string): Promise<string> {
    return argon2.hash(plain);
  }

  verifyPassword(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }

  createGravatar(email: string): string {
    const hash = createHash('md5').update(email).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  generateRandomToken(len = 64) {
    return randomBytes(len).toString('hex');
  }

  createSHA256(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }
}
