import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('finance')
@ApiTags('Finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createFinanceDto: CreateFinanceDto, @Request() req) {
    return this.financeService.create(createFinanceDto, req.user.email);
  }

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.financeService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.financeService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financeService.update(+id, updateFinanceDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.financeService.remove(+id);
  }
}
