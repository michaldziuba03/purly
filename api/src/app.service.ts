import { Injectable } from '@nestjs/common';
import Hashids from 'hashids';

@Injectable()
export class AppService {
  private readonly hashids = new Hashids('655deb');

  createAlias() {
    const alias = this.hashids.encode(50000);
    
    return { alias, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
  }
}
