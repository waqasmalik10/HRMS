import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AdminSignupDto } from '../auth/dto/admin-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { AdminSigninDto } from '../auth/dto/admin-signin.dto';
import { UpdateAdminDto } from 'src/auth/dto/update-admin.dto';

@Injectable()
export class AdminsService {

    constructor(
        @InjectRepository(Admin) private readonly adminRepositry: Repository<Admin>,
    ){}

    async findAdminByEmail(email: string): Promise<Admin> {
        return this.adminRepositry.findOne({where:{email: email}});
    }

    async create(adminSigninDto: AdminSignupDto): Promise<any> {
        const admin: Admin = this.adminRepositry.create( adminSigninDto)
        await admin.save();
        return admin;
    }

    async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin>{
        const resp = await this.adminRepositry.update(id, updateAdminDto);
        return await this.adminRepositry.findOne({ where: { id: id } });
    }

    async updatePassword(id: number, newPassword: string): Promise<string>{
        const changePasswordObj = await this.adminRepositry.create({password: newPassword});
        const resp = await this.adminRepositry.update(id, changePasswordObj);
        return "password change successfully.";
    }

}
