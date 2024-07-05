import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAttendanceRawDto {

    @IsNumber()
    readonly attendance_id: number;

    @IsString()
    @IsOptional()
    readonly serial_number: string;

    @IsString()
    readonly employee_id: string;

    @IsString()
    @IsOptional()
    readonly status: string;

    @IsString()
    @IsOptional()
    readonly timestamp: Date;

}