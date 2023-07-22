import { Injectable, Logger } from '@nestjs/common';
import { InMemoryService } from '../in-memory.service';
import Redlock, { Lock, ResourceLockedError, ExecutionError } from 'redlock';

@Injectable()
export class LockService {
  private readonly redlock: Redlock;
  constructor(inMemory: InMemoryService) {
    this.redlock = new Redlock(inMemory.instances);
    this.redlock.on('error', (err) => {
      if (err instanceof ResourceLockedError) {
        Logger.warn('Attempt to access locked resource');
        return;
      }

      Logger.error(err);
    });
  }

  async create(resource: string, ttl: number, retries?: number) {
    try {
      const lock = await this.redlock.acquire([resource], ttl, {
        retryCount: retries,
      });

      return lock;
    } catch (err) {
      if (err instanceof ExecutionError) {
        return false;
      }

      throw err;
    }
  }

  async release(lock: Lock) {
    await this.redlock.release(lock);
  }
}
