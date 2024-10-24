import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from './entities/companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies])],
  exports: [CompaniesService],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
