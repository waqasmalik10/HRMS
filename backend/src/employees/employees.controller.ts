import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Put, Query, Request } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
    constructor(
        private readonly employeeService: EmployeesService
    ) { }

    @Post('create')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new Employee under current company.' })
    create(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req) {
        console.log(createEmployeeDto, ">>>>>>>>>>>>>");
        return this.employeeService.create(createEmployeeDto, req.user.email);
    }

    @Put('update/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update employee under current company.' })
    update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto, @Request() req) {
        return this.employeeService.update(+id, updateEmployeeDto, req.user.email);
    }

    @Patch('deactivate/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'deactivate employee under current company.' })
    deactivate(@Param('id') id: string, @Request() req) {
        return this.employeeService.update(+id, { isActive: false }, req.user.email);
    }

    @Get('employee/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'get the record of employee by id' })
    getEmployee(@Param('id') id: number) {
        console.log("id is : ", id);
        if(isNaN(id)) throw new BadRequestException();//return {error: "Not a number"};
        return this.employeeService.findEmployee(id);
    }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'get the record of employee under current company' })
    getEmployees(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        return this.employeeService.findAll(page, limit);
    }

    @Get("addition-roles")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'get the record of additional role of employees' })
    getAdditionalRole() {
        return this.employeeService.getAllAdditionalRole();
    }


}
