import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminSignupDto } from './dto/admin-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminSigninDto } from './dto/admin-signin.dto';
import { CompaniesService } from '../companies/companies.service';
import { Companies } from '../companies/entities/companies.entity';
import { PasswordChangeDto } from './dto/password-change.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(adminSignupDto: AdminSignupDto): Promise<Companies> {
    const { email } = adminSignupDto;
    const existingCompany = await this.companiesService.findAdminByEmail(email);
    if (existingCompany)
      throw new BadRequestException(
        `Account is already registered with this email.`,
      );
    return this.companiesService.create(adminSignupDto);
  }

  async signin(adminSigninDto: AdminSigninDto) {
    const { email, password } = adminSigninDto;
    const company = await this.companiesService.findAdminByEmail(email);
    if (!company || !(await company.validatePassword(password)))
      throw new UnauthorizedException(`Email or password is wrong`);

    const payload = { sub: company.id, email: company.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(
    passwordChangeDto: PasswordChangeDto,
    email: string,
  ): Promise<string> {
    if (passwordChangeDto.passwordConfirm !== passwordChangeDto.newPassword)
      throw new BadRequestException(
        `newPassword must be equal to password confirm.`,
      );

    const company = await this.companiesService.findAdminByEmail(email);
    if (!company)
      throw new UnauthorizedException(`Not authorized to access this link.`);

    if (!(await company.validatePassword(passwordChangeDto.currentPassword)))
      throw new UnauthorizedException(`Current Password is wrong`);

    return this.companiesService.updatePassword(
      company.id,
      passwordChangeDto.newPassword,
    );
  }
}
