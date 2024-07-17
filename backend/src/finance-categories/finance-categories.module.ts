import { Module } from '@nestjs/common';
import { FinanceCategoriesService } from './finance-categories.service';
import { FinanceCategoriesController } from './finance-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finance } from 'src/finance/entities/finance.entity';
import { FinanceCategories } from './entities/finance-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinanceCategories])],
  controllers: [FinanceCategoriesController],
  providers: [FinanceCategoriesService],
})
export class FinanceCategoriesModule {}
