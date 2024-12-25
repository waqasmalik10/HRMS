import {
  Controller,
  Post,
  Body,
  Headers,
  HttpStatus,
  HttpException,
  Get,
  ForbiddenException,
  Logger,
  Request,
  Query,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/commons/decorators/isPublic';
import { CreateBulkAttendanceRawDto } from './dto/create-bulk-attendance-raw.dto';
import { CompaniesService } from '../companies/companies.service';
import { EmployeesService } from '../employees/employees.service';
import { GetAttendanceDto } from './dto/get-attendance.dto';

@Controller('attendances')
@ApiTags('Attendances')
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService,
    private readonly configService: ConfigService,
    private readonly adminsService: CompaniesService,
    private readonly employeeService: EmployeesService,
  ) {}

  private readonly logger = new Logger(AttendancesController.name);

  @ApiOperation({ summary: 'add new raw attendance data in bulk' })
  @ApiHeader({
    name: 'access-key',
    description: 'Custom header',
  })
  @ApiBody({ type: CreateBulkAttendanceRawDto })
  @Post('bulk-raw-attendance')
  @Public()
  async createBulkRawAttendance(
    @Body() createBulkAttendanceRawDto: CreateBulkAttendanceRawDto,
    @Headers('access-key') accessKey: string,
    @Headers('company-code') companyCode: string,
  ) {
    // get company details by company unique key
    const company = await this.adminsService.findAdminByCompanyKey(companyCode);
    if (!company)
      throw new ForbiddenException(`access-key OR company-code is mismatched.`);

    if (accessKey !== company.access_key) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    let failures = 0;
    // loop through each entry in array and insert one by one.
    for (const raw_attendance of createBulkAttendanceRawDto.createBulkAttendanceRaw) {
      try {
        // const employee = await this.employeeService.getEmployeeByEmployeeCode(
        //   raw_attendance.employee_code,
        //   company.id,
        // );
        // if (!employee) {
        //   this.logger.error(`Employee code not found for this company.`);
        //   failures++;
        //   continue;
        // }
        await this.attendancesService.createRawAttendance(
          raw_attendance,
          company,
        );
      } catch (error) {
        failures++;
        this.logger.error(
          `Some bad records are not inserted with error: ${error.message}`,
          JSON.stringify(raw_attendance),
        );
      }
    }

    this.logger.log(
      `${createBulkAttendanceRawDto.createBulkAttendanceRaw.length - failures} of ${createBulkAttendanceRawDto.createBulkAttendanceRaw.length} Raw Attendance records are inserted successfully with ${failures} records failure`,
    );
    return `${createBulkAttendanceRawDto.createBulkAttendanceRaw.length - failures} of ${createBulkAttendanceRawDto.createBulkAttendanceRaw.length} Raw Attendance records are inserted successfully with ${failures} records failure`;
  }

  // TODO: Why is this API even there.
  @ApiOperation({ summary: 'get all attendance data' })
  @Get('get-attendances')
  getAllAttendance() {
    return this.attendancesService.findAllAttendances();
  }

  @ApiOperation({ summary: 'API to get attendances for company' })
  @Get('get-company-attendances')
  getCompanyAttendances(
    @Query('limit') queryParams: GetAttendanceDto,
    @Request() req,
  ) {
    const companyID = req.user.company_id;
    return this.attendancesService.findCompanyAttendances(
      companyID,
      queryParams.limit,
      queryParams.offset,
      queryParams.from_date,
      queryParams.to_date,
    );
  }
}
