import { randomBytes, createHash } from 'crypto';
import { Transform } from 'class-transformer';

export function generateToken(size: number): Promise<string> {
  return new Promise((resolve, reject) => {
    return randomBytes(size, (err, buff) => {
      if (err) return reject(err);

      return resolve(buff.toString('base64url'));
    });
  });
}

export const Trim = () => Transform(({ value }) => value?.trim());

export function generateGravatar(email: string) {
  const hash = createHash('md5').update(email).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}`;
}
