import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FinanceCategories } from 'src/finance-categories/entities/finance-category.entity';
import { Repository } from 'typeorm';
import { Finance } from './entities/finance.entity';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class FinanceService {

  constructor(@InjectRepository(Finance) private readonly financeRepository: Repository<Finance>,
  private readonly adminService: CompaniesService,){}

  async create(createFinanceDto: CreateFinanceDto, adminEmailId: string) {
    const admin = await this.adminService.findAdminByEmail(adminEmailId);
    const finance = this.financeRepository.create(createFinanceDto);
    finance.company_id = admin.id;
    finance.added_by = admin.name;
    await finance.save();
    return finance;
  }

  async findAll() {
    return await this.financeRepository.find();
  }

  async findOne(id: number) {
    return await this.financeRepository.findOne({ where: {id: id }});
  }

  async update(id: number, updateFinanceDto: UpdateFinanceDto) {
    return await this.financeRepository.update(id, updateFinanceDto);
  }

  async remove(id: number) {
    return await this.financeRepository.delete(id);
  }
}
