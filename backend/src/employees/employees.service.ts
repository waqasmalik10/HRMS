import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employees } from './entities/employees.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminsService } from 'src/admins/admins.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AdditionalRoles } from './entities/additional-roles.entity';

@Injectable()
export class EmployeesService {

    constructor(
        @InjectRepository(Employees) private readonly employeeRepository: Repository<Employees>,
        @InjectRepository(AdditionalRoles) private readonly additionalRolesRepository: Repository<AdditionalRoles>,
        private readonly adminService: AdminsService,
    ) { }

    async create(createEmployeeDto: CreateEmployeeDto, adminEmail: string): Promise<Employees> {
        const { email } = createEmployeeDto;
        const existingEmployee = await this.employeeRepository.findOne({ where: { email: email } });
        if (existingEmployee) throw new UnauthorizedException(`User ${email} already exists.`);

        const employee: Employees = this.employeeRepository.create(createEmployeeDto);
        employee.admin = await this.adminService.findAdminByEmail(adminEmail);
        await employee.save();
        return employee;
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto, adminEmail: string): Promise<Employees> {

        console.log("id", id, updateEmployeeDto);
        const existingEmployee = await this.employeeRepository.findOne({ where: { id: id }, relations: ['admin'], });

        if (existingEmployee.admin.email !== adminEmail) throw new UnauthorizedException(`You are not allowed to edit this user.`);

        const resp = await this.employeeRepository.update(id, updateEmployeeDto);

        return await this.employeeRepository.findOne({ where: { id: id } });
    }

    async findAll(page = 1, limit = 10): Promise<{ data: Employees[]; total: number; page: number; limit: number }> {
        const [data, total] = await this.employeeRepository.findAndCount({
          skip: page > 0 ? (page - 1) * limit : 0,
          take: limit,
          relations: {
            additional_roles: true
          }
          
        });
      
        return {
          data,
          total,
          page,
          limit,
        };
      }

      async getAllAdditionalRole(): Promise<AdditionalRoles[]>{
        return await this.additionalRolesRepository.find();
      }
}
