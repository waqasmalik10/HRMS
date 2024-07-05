import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/commons/decorators/isPublic';
import { CreateAttendanceRawDto } from './dto/create-attendance-raw.dto';
import { AttendancesDto } from './dto/Attendances.dto';

@Controller('attendances')
@ApiTags('Attendances')
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService,
    private readonly configService: ConfigService
  ) { }

  @ApiOperation({ summary: 'add new attendance data' })
  @ApiHeader({
    name: 'access-key',
    description: 'Custom header',
  })
  @ApiBody({ type: AttendancesDto})
  @Post("new-attendance")
  @Public()
  createAttendance(@Body() attendanceDtos: AttendancesDto, @Headers('access-key') accessKey: string) {
    const envAccessKey = this.configService.get<string>('ACCESS_KEY');
    if (envAccessKey !== accessKey) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.attendancesService.createAttendances(attendanceDtos);
  }

  @ApiOperation({ summary: 'get all attendance data' })
  @Get("get-attendances")
  // @Public()
  getAllAttendance(){
    return this.attendancesService.findAllAttendances();
  }

}

