import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
    constructor(
        private readonly employeeService: EmployeesService
    ){}

    @Post('create')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create new Employee under current company.'})
    create(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req) {
        return this.employeeService.create( createEmployeeDto , req.user.email);
    }
}
