import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import {Employees} from './entities/employees.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Employees ]),
    AdminsModule
  ],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
