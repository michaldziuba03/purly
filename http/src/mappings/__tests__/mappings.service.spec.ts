import { Test, TestingModule } from '@nestjs/testing';
import { MappingsService } from '../mappings.service';

describe('MappingsService', () => {
  let service: MappingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MappingsService],
    }).compile();

    service = module.get<MappingsService>(MappingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
