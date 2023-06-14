import { Provider } from '@nestjs/common';
import { RandomAliasFactory } from './random.factory';
import { SequentialAliasFactory } from './sequential.factory';

function generatorFactory() {
  // alias generation model is configurable
  if (process.env.GENERATOR === 'sequential') {
    return new SequentialAliasFactory();
  }

  return new RandomAliasFactory();
}

export const ALIAS_FACTORY = 'ALIAS_FACTORY';

export function provideAliasFactory(): Provider {
  return {
    provide: ALIAS_FACTORY,
    useFactory: generatorFactory,
  };
}
