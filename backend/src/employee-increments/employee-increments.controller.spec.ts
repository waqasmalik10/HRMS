import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeIncrementsController } from './employee-increments.controller';
import { EmployeeIncrementsService } from './employee-increments.service';

describe('EmployeeIncrementsController', () => {
  let controller: EmployeeIncrementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeIncrementsController],
      providers: [EmployeeIncrementsService],
    }).compile();

    controller = module.get<EmployeeIncrementsController>(EmployeeIncrementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
