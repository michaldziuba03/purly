import { Test, TestingModule } from '@nestjs/testing';
import { RangeService } from './range.service';

describe('RangeService', () => {
  let service: RangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RangeService],
    }).compile();

    service = module.get<RangeService>(RangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
