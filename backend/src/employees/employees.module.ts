import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import {Employees} from './entities/employees.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from 'src/admins/admins.module';
import { AdditionalRoles } from './entities/additional-roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Employees, AdditionalRoles ]),
    AdminsModule
  ],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
