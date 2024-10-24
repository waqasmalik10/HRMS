import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendances } from './entities/attendances.entity';
import { Repository } from 'typeorm';
import { AttendanceRaw } from './entities/attendance-raw.entity';
import { Companies } from '../companies/entities/companies.entity';
import { CreateSingleAttendanceRawDto } from './dto/create-single-attendance-raw.dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendances)
    private readonly attendanceRepository: Repository<Attendances>,
    @InjectRepository(AttendanceRaw)
    private readonly attendanceRawRepository: Repository<AttendanceRaw>,
  ) {}

  async createRawAttendance(
    raw_attendance: CreateSingleAttendanceRawDto,
    company: Companies,
  ): Promise<any> {
    const attendance = this.attendanceRawRepository.create(raw_attendance);
    attendance.date = new Date(
      raw_attendance.timestamp.getFullYear(),
      raw_attendance.timestamp.getMonth(),
      raw_attendance.timestamp.getDate(),
    );
    attendance.companies = company;
    return await attendance.save();
  }

  async findAllAttendances(): Promise<any> {
    const attendances = await this.attendanceRepository.find();
    const attendanceRaws = await this.attendanceRawRepository.find();
    return {
      attendances,
      attendanceRaws,
    };
  }
}
