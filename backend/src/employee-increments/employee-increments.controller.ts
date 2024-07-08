import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeIncrementsService } from './employee-increments.service';
import { CreateEmployeeIncrementDto } from './dto/create-employee-increment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('employee-increments')
@ApiTags('Emploee-increments')
export class EmployeeIncrementsController {
  constructor(private readonly employeeIncrementsService: EmployeeIncrementsService) { }

  @Post('create/:employeeId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new Increment of Employee.' })
  create(@Body() createEmployeeIncrementDto: CreateEmployeeIncrementDto,
    @Param('employeeId') employeeId: string) {
    return this.employeeIncrementsService.create(createEmployeeIncrementDto, +employeeId);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get the record of all increment of employee under current company' })
  findAll() {
    return this.employeeIncrementsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get the record of increment of employee under current company' })
  findOne(@Param('id') id: string) {
    return this.employeeIncrementsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update the record of increment of employee under current company' })
  update(@Param('id') id: string, @Body() updateEmployeeIncrementDto: CreateEmployeeIncrementDto) {
    return this.employeeIncrementsService.update(+id, updateEmployeeIncrementDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete the record of increment of employee under current company' })
  remove(@Param('id') id: string) {
    return this.employeeIncrementsService.remove(+id);
  }

}
