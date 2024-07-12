import { Injectable, UploadedFile } from '@nestjs/common';
import { CreateFinanceCategoryDto } from './dto/create-finance-category.dto';
import { UpdateFinanceCategoryDto } from './dto/update-finance-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Finance } from 'src/finance/entities/finance.entity';
import { Repository } from 'typeorm';
import { FinanceCategories } from './entities/finance-category.entity';

@Injectable()
export class FinanceCategoriesService {

  constructor(@InjectRepository(FinanceCategories) private readonly financeCategoriesRepository: Repository<FinanceCategories>){}

  async create(createFinanceCategoryDto: CreateFinanceCategoryDto) {
    const financeCategories: FinanceCategories = this.financeCategoriesRepository.create(createFinanceCategoryDto);
    await financeCategories.save();
    return financeCategories;
  }

  findAll() {
    return this.financeCategoriesRepository.find();
  }

  findOne(id: number) {
    return this.financeCategoriesRepository.findOne({ where: {id: id}});
  }

  update(id: number, updateFinanceCategoryDto: UpdateFinanceCategoryDto) {
    return this.financeCategoriesRepository.update(id, updateFinanceCategoryDto)
  }

  remove(id: number) {
    return this.financeCategoriesRepository.delete(id);
  }
}
