import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendances } from './entities/attendances.entity';
import { Repository } from 'typeorm';
import { AttendanceRaw } from './entities/attendance-raw.entity';
import { Companies } from '../companies/entities/companies.entity';
import { CreateSingleAttendanceRawDto } from './dto/create-single-attendance-raw.dto';
import { ATTENDANCE_CHECK_IN_CHECKOUT_STATUS } from '../commons/enums';

@Injectable()
export class AttendancesService {
  private readonly logger = new Logger(AttendancesService.name);

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

  async findCompanyAttendances(
    company_id: number,
    limit: number,
    offset: number,
    from_date: Date,
    to_date: Date,
  ): Promise<any> {
    // TODO: It's probably not a very good solution. May need to add relations in entity and handle through that.
    // TODO: Once we have a job that processes the attendance_raw, we won't use attendance_raw table any more.
    const db = this.attendanceRawRepository.manager;
    const result = await db.query(
      `
      SELECT attendance_raw.id, attendance_raw.timestamp AS checkin_time
      , (
          SELECT at.timestamp AS checkout_time FROM attendance_raw at 
          WHERE at.employee_code = attendance_raw.employee_code
          AND at.status = ${ATTENDANCE_CHECK_IN_CHECKOUT_STATUS.CHECK_OUT}
          AND at.date = attendance_raw.date
          AND at."companiesId" = attendance_raw."companiesId"
      ) AS checkout_time
      , attendance_raw.status, attendance_raw.date, attendance_raw.employee_code
      , employees.first_name, employees.last_name, employees.id AS employee_id, employees.email, employees.designation  
      FROM attendance_raw INNER JOIN employees ON attendance_raw.employee_code = employees.employee_code 
      WHERE attendance_raw."companiesId" = ${company_id}
      AND attendance_raw.status = ${ATTENDANCE_CHECK_IN_CHECKOUT_STATUS.CHECK_IN}
      AND attendance_raw.date >= $1 AND attendance_raw.date <= $2
      LIMIT $3 OFFSET $4`,
      [
        new Date(from_date.setHours(0, 0, 0)).toISOString().split('T')[0] +
          ' 00:00:00',
        new Date(to_date.setHours(23, 59, 59)).toISOString().split('T')[0] +
          ' 23:59:59',
        limit,
        offset,
      ],
    );

    this.logger.log(result);
    return result;
  }
}
