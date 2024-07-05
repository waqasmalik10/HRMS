import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import {AdminsService} from './admins.service';
import { ApiAcceptedResponse, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSignupDto } from '../auth/dto/admin-signup.dto';
import { AdminSigninDto } from '../auth/dto/admin-signin.dto';
import { UpdateAdminDto } from 'src/auth/dto/update-admin.dto';

@Controller('admins')
@ApiTags('Admins')
export class AdminsController {
    constructor(private readonly adminService: AdminsService){}

    @ApiBearerAuth()
    @Get()
    @ApiOperation({summary: 'Get Loggedin company profile'})
    getProfile(@Request() req) {
        return this.adminService.findAdminByEmail(req.user.email);
    }

    @Put('update/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update company data.' })
    update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
        return this.adminService.update(+id, updateAdminDto);
    }

}
