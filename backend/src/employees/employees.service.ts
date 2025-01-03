import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employees } from './entities/employees.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AdditionalRoles } from './entities/additional-roles.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
    @InjectRepository(AdditionalRoles)
    private readonly additionalRolesRepository: Repository<AdditionalRoles>,
    private readonly companyService: CompaniesService,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
    adminEmail: string,
  ): Promise<Employees> {
    const { email, employee_code } = createEmployeeDto;
    const existingEmployee = await this.employeeRepository.findOne({
      where: [{ email: email }, { employee_code: employee_code }],
    });
    if (existingEmployee)
      throw new UnauthorizedException(
        `User ${email} or employee code ${employee_code} already exists.`,
      );

    const employee: Employees =
      this.employeeRepository.create(createEmployeeDto);
    employee.companies = await this.companyService.findAdminByEmail(adminEmail);
    await employee.save();
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
    company_id: number,
  ): Promise<Employees> {
    const existingEmployee = await this.employeeRepository.findOne({
      where: { id: id, companies: { id: company_id } },
    });

    if (!existingEmployee)
      throw new UnauthorizedException(`You are not allowed to edit this user.`);

    await this.employeeRepository.update(id, updateEmployeeDto);

    return await this.employeeRepository.findOne({
      where: { id: id, companies: { id: company_id } },
    });
  }

  async findEmployee(id: number, company_id: number): Promise<Employees> {
    return await this.employeeRepository.findOne({
      where: { id: id, companies: { id: company_id } },
    });
  }
  async findAll(
    company_id,
    offset,
    limit,
  ): Promise<{
    data: Employees[];
    total: number;
    offset: number;
    limit: number;
  }> {
    const [data, total] = await this.employeeRepository.findAndCount({
      where: { companies: { id: company_id } },
      skip: offset,
      take: limit,
      relations: {
        additional_roles: true,
      },
    });

    return {
      data,
      total,
      offset,
      limit,
    };
  }

  // TOD: Add company_id as well
  async getEmployeeById(employeeId: number): Promise<Employees> {
    return await this.employeeRepository.findOne({ where: { id: employeeId } });
  }

  async getEmployeeByEmployeeCode(
    employeeCode: number,
    company_id: number,
  ): Promise<Employees> {
    return await this.employeeRepository.findOne({
      where: {
        employee_code: employeeCode,
        companies: { id: company_id },
      },
    });
  }

  async getAllAdditionalRole(): Promise<AdditionalRoles[]> {
    return await this.additionalRolesRepository.find();
  }
}
