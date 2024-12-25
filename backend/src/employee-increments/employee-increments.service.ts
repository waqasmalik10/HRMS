import { Injectable } from '@nestjs/common';
import { CreateEmployeeIncrementDto } from './dto/create-employee-increment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeIncrement } from './entities/employee-increment.entity';
import { Repository } from 'typeorm';
import { Employees } from 'src/employees/entities/employees.entity';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class EmployeeIncrementsService {
  constructor(
    @InjectRepository(EmployeeIncrement)
    private readonly employeeIncrementRepository: Repository<EmployeeIncrement>,
    private readonly employeesService: EmployeesService,
  ) {}

  async create(
    createEmployeeIncrementDto: CreateEmployeeIncrementDto,
    employeeId: number,
  ) {
    const employee: Employees =
      await this.employeesService.getEmployeeById(employeeId);
    const employeeIncrement = this.employeeIncrementRepository.create(
      createEmployeeIncrementDto,
    );
    employeeIncrement.employee = employee;
    await employeeIncrement.save();
    return employeeIncrement;
  }

  async findAll(): Promise<EmployeeIncrement[]> {
    return await this.employeeIncrementRepository.find();
  }

  async findOne(id: number): Promise<EmployeeIncrement> {
    return await this.employeeIncrementRepository.findOne({
      where: { id: id },
    });
  }

  async update(
    id: number,
    updateEmployeeIncrementDto: CreateEmployeeIncrementDto,
  ) {
    const resp = await this.employeeIncrementRepository.update(
      id,
      updateEmployeeIncrementDto,
    );
    console.log('updating response: ', resp);
    return await this.employeeIncrementRepository.findOne({
      where: { id: id },
    });
  }

  async remove(id: number) {
    const resp = await this.employeeIncrementRepository.delete(id);
    console.log('deleting response: ', resp);
    return 'deleted successfully.';
  }
}
