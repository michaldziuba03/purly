import { Injectable } from '@nestjs/common';
import { AliasFactory } from './alias.factory';
import { customAlphabet } from 'nanoid/async';

@Injectable()
export class RandomAliasFactory extends AliasFactory {
  private readonly nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
  );

  create(): Promise<string> {
    return this.nanoid();
  }
}
