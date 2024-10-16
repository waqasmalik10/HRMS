import { IsArray, ValidateNested } from 'class-validator';
import { CreateSingleAttendanceRawDto } from './create-single-attendance-raw.dto';
import { Type } from 'class-transformer';

export class CreateBulkAttendanceRawDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSingleAttendanceRawDto)
  readonly createBulkAttendanceRaw: CreateSingleAttendanceRawDto[];
}
