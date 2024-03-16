import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employees } from './entities/employees.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employees) private readonly employeeRepository: Repository<Employees>,
        private readonly adminService: AdminsService,
    ) {}
    async create(createEmployeeDto: CreateEmployeeDto, adminEmail: string): Promise<Employees> {
        const { email } = createEmployeeDto;
        const existingEmployee = await this.employeeRepository.findOne( { where: {email: email} } );
        if(existingEmployee) throw new UnauthorizedException(`User ${email} already exists.`);

        const employee: Employees = this.employeeRepository.create( createEmployeeDto );
        employee.admin = await this.adminService.findAdminByEmail( adminEmail );
        await employee.save();
        return employee;
    }
}
