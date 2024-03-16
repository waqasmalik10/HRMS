import { IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateEmployeeDto {

    // @IsEmail()
    // readonly email: string;

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
    readonly initial_base_salary: number; // at the time of hiring (first offer)

    @IsNumber()
    readonly current_base_salary: number;

    @IsString()
    readonly last_increment_date: string;

    @IsNumber()
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

    @IsString()
    readonly additional_roles?: string;

}