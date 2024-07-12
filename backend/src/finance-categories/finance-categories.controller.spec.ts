import { Test, TestingModule } from '@nestjs/testing';
import { FinanceCategoriesController } from './finance-categories.controller';
import { FinanceCategoriesService } from './finance-categories.service';

describe('FinanceCategoriesController', () => {
  let controller: FinanceCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanceCategoriesController],
      providers: [FinanceCategoriesService],
    }).compile();

    controller = module.get<FinanceCategoriesController>(FinanceCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
