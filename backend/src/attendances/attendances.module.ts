import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendances } from './entities/attendances.entity';
import { AttendanceRaw } from './entities/attendance-raw.entity';
import { CompaniesModule } from '../companies/companies.module';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendances, AttendanceRaw]),
    CompaniesModule,
    EmployeesModule,
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService],
})
export class AttendancesModule {}
