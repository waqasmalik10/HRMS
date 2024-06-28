import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { CreateAttendanceRawDto } from './dto/create-attendance-raw.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendances } from './entities/attendances.entity';
import { Repository } from 'typeorm';
import { AttendanceRaw } from './entities/attendance-raw.entity';
import { AttendancesDto } from './dto/Attendances.dto';

@Injectable()
export class AttendancesService {

  constructor(
    @InjectRepository(Attendances) private readonly attendanceRepository: Repository<Attendances>,
    @InjectRepository(AttendanceRaw) private readonly attendanceRawRepository: Repository<AttendanceRaw>
  ) { }

  async createAttendances(attendancesDto: AttendancesDto): Promise<any> {
    const addedRawAttendancesResp = await  this.attendanceRawRepository.upsert(attendancesDto.createAttendanceRawDtos, ['attendance_id'])
    const addedAttendancesResp = await  this.attendanceRepository.upsert(attendancesDto.createAttendanceDtos, ['attendance_id'])

    return { 
      addedRawAttendancesResp,
      addedAttendancesResp
    };
  }

  async findAllAttendances(): Promise<any> {
    const attendances =  await this.attendanceRepository.find();
    const attendanceRaws = await this.attendanceRawRepository.find();
    return {
      attendances,
      attendanceRaws
    }
  }

}
