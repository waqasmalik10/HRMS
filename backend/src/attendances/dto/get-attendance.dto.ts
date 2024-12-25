import { IsDate, IsNumber } from 'class-validator';

export class GetAttendanceDto {
  @IsNumber()
  limit: number = 10;

  @IsNumber()
  offset: number = 0;

  @IsDate()
  from_date: Date = new Date();

  @IsDate()
  to_date: Date = new Date();
}
