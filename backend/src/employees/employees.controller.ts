import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GetAllEmployeesDTO } from './dto/get-all-employees.dto';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new Employee under current company.' })
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req) {
    return this.employeeService.create(createEmployeeDto, req.user.email);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update employee under current company.' })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Request() req,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto, req.user.company_id);
  }

  @Patch('deactivate/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'deactivate employee under current company.' })
  deactivate(@Param('id') id: string, @Request() req) {
    return this.employeeService.update(
      +id,
      { isActive: false },
      req.user.email,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get the record of employee by id' })
  getEmployee(@Param('id') id: number, @Request() req) {
    console.log('id is : ', id);
    if (isNaN(id)) throw new BadRequestException(); //return {error: "Not a number"};
    console.log('id is : ', req.user);
    return this.employeeService.findEmployee(id, req.user.company_id) || {};
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get the record of employee under current company' })
  getEmployees(@Query() query: GetAllEmployeesDTO, @Request() req) {
    return this.employeeService.findAll(req.user.id, query.offset, query.limit);
  }

  @Get('addition-roles')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get the record of additional role of employees' })
  getAdditionalRole() {
    return this.employeeService.getAllAdditionalRole();
  }
}
