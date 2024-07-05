import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAttendanceDto {

    @IsNumber()
    readonly attendance_id: number;

    @IsString()
    readonly employee_id: string;

    @IsString()
    @IsOptional()
    readonly check_in: Date;
    
    @IsString()
    @IsOptional()
    readonly check_out: Date;

    @IsString()
    @IsOptional()
    readonly timestamp: Date;
    
    @IsString()
    readonly name: string;

    @IsString()
    readonly status: string;

}