import { Module } from '@nestjs/common';
import { EmployeeIncrementsService } from './employee-increments.service';
import { EmployeeIncrementsController } from './employee-increments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeIncrement } from './entities/employee-increment.entity';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeIncrement]),
    EmployeesModule],
  controllers: [EmployeeIncrementsController],
  providers: [EmployeeIncrementsService],
})
export class EmployeeIncrementsModule { }
