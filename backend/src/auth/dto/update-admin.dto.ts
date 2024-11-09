import { OmitType, PartialType } from '@nestjs/swagger';
import { CompanySignupDto } from './admin-signup.dto';

export class UpdateAdminDto extends PartialType(
  OmitType(CompanySignupDto, ['password'] as const),
) {}
