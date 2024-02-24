import { Body, Controller, Post } from '@nestjs/common';
import {AdminsService} from './admins.service';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSignupDto } from '../auth/dto/admin-signup.dto';
import { AdminSigninDto } from '../auth/dto/admin-signin.dto';

@Controller('admins')
@ApiTags('Admins')
export class AdminsController {
    constructor(private readonly adminService: AdminsService){}

}
