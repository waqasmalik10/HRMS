import { OmitType, PartialType } from "@nestjs/swagger";
import { AdminSignupDto } from "./admin-signup.dto";

export class UpdateAdminDto extends PartialType(
    OmitType(AdminSignupDto, ['password'] as const),
  ) {}