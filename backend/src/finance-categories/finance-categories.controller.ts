import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinanceCategoriesService } from './finance-categories.service';
import { CreateFinanceCategoryDto } from './dto/create-finance-category.dto';
import { UpdateFinanceCategoryDto } from './dto/update-finance-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('finance-categories')
@ApiTags('Finance-Categories')
export class FinanceCategoriesController {
  constructor(private readonly financeCategoriesService: FinanceCategoriesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createFinanceCategoryDto: CreateFinanceCategoryDto) {
    return this.financeCategoriesService.create(createFinanceCategoryDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.financeCategoriesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.financeCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateFinanceCategoryDto: UpdateFinanceCategoryDto) {
    return this.financeCategoriesService.update(+id, updateFinanceCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.financeCategoriesService.remove(+id);
  }
}
