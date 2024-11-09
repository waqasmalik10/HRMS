import { isISO8601, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSingleAttendanceRawDto {
  @IsNumber()
  readonly serial_number: number;

  @IsNumber()
  readonly employee_id: number;

  @IsNumber()
  readonly status: number; // status 0 means check-in and status 1 means check-out.

  @Transform(({ value }) => {
    const isValidDate = isISO8601(value, {
      strict: true,
      strictSeparator: true,
    });
    if (!isValidDate) {
      throw new Error(
        `Property "timestamp" should be a valid ISO8601 date string`,
      );
    }
    return new Date(value);
  })
  @IsNotEmpty()
  readonly timestamp: Date;
}
