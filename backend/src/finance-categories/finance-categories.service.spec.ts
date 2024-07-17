import { Test, TestingModule } from '@nestjs/testing';
import { FinanceCategoriesService } from './finance-categories.service';

describe('FinanceCategoriesService', () => {
  let service: FinanceCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanceCategoriesService],
    }).compile();

    service = module.get<FinanceCategoriesService>(FinanceCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
