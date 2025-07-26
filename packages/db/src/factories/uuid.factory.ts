import uuid from 'uuid';

export class UuidFactory {
  static create(): string {
    return uuid.v7();
  }
}
