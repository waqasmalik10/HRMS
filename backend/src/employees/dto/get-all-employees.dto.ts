import { IsNumber } from 'class-validator';

export class GetAllEmployeesDTO {
  @IsNumber()
  readonly offset: number = 0;

  @IsNumber()
  readonly limit: number = 10;
}
