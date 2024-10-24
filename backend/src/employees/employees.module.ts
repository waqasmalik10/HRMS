import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import {Employees} from './entities/employees.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { AdditionalRoles } from './entities/additional-roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Employees, AdditionalRoles ]),
    CompaniesModule
  ],
  providers: [EmployeesService],
  controllers: [EmployeesController],
  exports: [EmployeesService]
})
export class EmployeesModule {}
