import { Injectable } from '@nestjs/common';
import { AbstractGenerator } from './abstract.generator';
import { customAlphabet } from 'nanoid';

@Injectable()
export class RandomGenerator extends AbstractGenerator {
  private readonly nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
  );

  async next(): Promise<string> {
    return this.nanoid();
  }
}
