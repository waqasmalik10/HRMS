import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CompanySignupDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly website: string;

  @ApiProperty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsString()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description:
      'Password must be minimum 8 characters long including lower and upper case characters, numbers and special characters.',
  })
  @IsString()
  @IsStrongPassword(null, {
    message:
      'Password must be minimun 8 characters long incluidng lower and upper case characters, numbers and special characters.',
  })
  readonly password: string;
}
