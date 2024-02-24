import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Admin} from './entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin])
  ],
  exports: [AdminsService],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
