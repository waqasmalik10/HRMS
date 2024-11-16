import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GetAdditionalRoleDTO } from './get-additional-role.dto';
import { Transform, Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly employee_code: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string; // to be added later. For now, a default value will be added `qwQW12!@` coming from frontend

  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  readonly bank_name: string;

  @IsString()
  readonly bank_account_title: string;

  @IsString()
  readonly bank_branch_code: string;

  @IsString()
  readonly bank_account_number: string;

  @IsString()
  readonly bank_iban_number: string;

  @IsString()
  readonly joining_date: string;

  @IsString()
  readonly full_time_joining_date: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly initial_base_salary: number; // at the time of hiring (first offer)

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly current_base_salary: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly medical_allowance_amount: number;

  @IsString()
  readonly last_increment_date: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly last_increment_amount: number;

  @IsString()
  readonly home_address: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly state: string;

  @IsString()
  readonly zip_code: string;

  @IsString()
  readonly country: string;

  @IsString()
  readonly designation: string;

  @IsString()
  readonly cnic: string;

  @IsString()
  readonly id_card_date_of_birth: Date;

  @IsString()
  readonly actual_date_of_birth: Date;

  @IsString()
  readonly hobbies?: string;

  @IsString({})
  readonly vehicle_registration_number?: string;

  // @IsNumber()
  @ValidateNested({ each: true })
  @Type(() => GetAdditionalRoleDTO)
  readonly additional_roles?: GetAdditionalRoleDTO[];

  @IsBoolean()
  readonly isActive?: boolean = false;
}
