import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAttendanceDto } from "./create-attendance.dto";
import { CreateAttendanceRawDto } from "./create-attendance-raw.dto";
import { Type } from "class-transformer";

export class AttendancesDto {

    @IsArray()
    @ValidateNested({ each: true })
    // @ArrayMinSize(2)
    // @ArrayMaxSize(2)
    @Type(() => CreateAttendanceDto)
    readonly createAttendanceDtos: CreateAttendanceDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAttendanceRawDto)
    readonly createAttendanceRawDtos: CreateAttendanceRawDto[];

}