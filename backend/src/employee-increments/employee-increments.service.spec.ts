import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeIncrementsService } from './employee-increments.service';

describe('EmployeeIncrementsService', () => {
  let service: EmployeeIncrementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeIncrementsService],
    }).compile();

    service = module.get<EmployeeIncrementsService>(EmployeeIncrementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
