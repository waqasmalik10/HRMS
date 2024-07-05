import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendances } from './entities/attendances.entity';
import { AttendanceRaw } from './entities/attendance-raw.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Attendances, AttendanceRaw ])
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService],
})
export class AttendancesModule {}
