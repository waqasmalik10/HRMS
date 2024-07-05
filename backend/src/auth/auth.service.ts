import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminSignupDto } from './dto/admin-signup.dto';
import {JwtService} from '@nestjs/jwt';
import { AdminSigninDto } from './dto/admin-signin.dto';
import { AdminsService } from '../admins/admins.service';
import { Admin } from '../admins/entities/admin.entity';
import { PasswordChangeDto } from './dto/password-change.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly adminService: AdminsService,
        private readonly jwtService: JwtService
    ) {}

    async signup(adminSignupDto: AdminSignupDto): Promise<Admin> {
        const { email } = adminSignupDto;
        const existingAdmin = await this.adminService.findAdminByEmail( email );
        if(existingAdmin) throw new BadRequestException(`Account is already registered with this email.`);
        return this.adminService.create(adminSignupDto);
    }

    async signin(adminSigninDto: AdminSigninDto) {
        const {email, password} = adminSigninDto;
        const admin = await this.adminService.findAdminByEmail(email);
        if(!admin || !(await admin.validatePassword(password)) ) throw new UnauthorizedException(`Email or password is wrong`);

        const payload = { sub: admin.id, email: admin.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async changePassword(passwordChangeDto: PasswordChangeDto, email: string): Promise<string>{

        if(passwordChangeDto.passwordConfirm !== passwordChangeDto.newPassword)
            throw new BadRequestException(`newPassword must be equal to password confirm.`);

        const admin = await this.adminService.findAdminByEmail(email);
        if(!admin) throw new UnauthorizedException(`Not authorized to access this link.`);

        if(!(await admin.validatePassword(passwordChangeDto.currentPassword)) ) 
            throw new UnauthorizedException(`Current Password is wrong`);

        return this.adminService.updatePassword(admin.id, passwordChangeDto.newPassword);

    }
    
}
