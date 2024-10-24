import { Injectable } from '@nestjs/common';
import { AdminSignupDto } from '../auth/dto/admin-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from './entities/companies.entity';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from 'src/auth/dto/update-admin.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private readonly companyRepositry: Repository<Companies>,
  ) {}

  async findAdminByEmail(email: string): Promise<Companies> {
    return this.companyRepositry.findOne({ where: { email: email } });
  }

  async findAdminByCompanyKey(companyCode: string): Promise<Companies> {
    return this.companyRepositry.findOne({
      where: { company_code: companyCode },
    });
  }

  async create(adminSignupDto: AdminSignupDto): Promise<Companies> {
    const company: Companies = this.companyRepositry.create(adminSignupDto);
    await company.save();
    return company;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Companies> {
    await this.companyRepositry.update(id, updateAdminDto);
    return await this.companyRepositry.findOne({ where: { id: id } });
  }

  async updatePassword(id: number, newPassword: string): Promise<string> {
    const changePasswordObj = await this.companyRepositry.create({
      password: newPassword,
    });
    await this.companyRepositry.update(id, changePasswordObj);
    return 'password change successfully.';
  }
}
