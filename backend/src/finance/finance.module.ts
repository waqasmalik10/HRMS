import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finance } from './entities/finance.entity';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [TypeOrmModule.forFeature([Finance]),
    AdminsModule],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule { }
