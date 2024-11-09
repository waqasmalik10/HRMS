import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAdminDto } from 'src/auth/dto/update-admin.dto';

@Controller('companies')
@ApiTags('Admins')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get Loggedin company profile' })
  getProfile(@Request() req) {
    return this.companyService.findAdminByEmail(req.user.email);
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update company data.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.companyService.update(+id, updateAdminDto);
  }
}
