import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CompanySignupDto } from './dto/admin-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { CompaniesService } from '../companies/companies.service';
import { Companies } from '../companies/entities/companies.entity';
import { PasswordChangeDto } from './dto/password-change.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(companySignupDto: CompanySignupDto): Promise<Companies> {
    const { email } = companySignupDto;
    const existingCompany = await this.companiesService.findAdminByEmail(email);
    if (existingCompany)
      throw new BadRequestException(
        `Account is already registered with this email.`,
      );
    return this.companiesService.create(companySignupDto);
  }

  async signin(signinDto: SigninDto) {
    const { email, password, is_company_login } = signinDto;
    // For now, we are just bypassing for employee login. we will handle regular employees login later.
    const user = await (is_company_login
      ? this.companiesService.findAdminByEmail(email)
      : Promise.resolve());
    if (!user || !(await user.validatePassword(password)))
      throw new UnauthorizedException(`Email or password is wrong`);

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      is_company: is_company_login,
    };
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
