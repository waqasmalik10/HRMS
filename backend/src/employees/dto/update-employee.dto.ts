import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, [
    'password',
    'employee_code',
    'initial_base_salary',
    'current_base_salary',
    'joining_date',
    'last_increment_amount',
    'last_increment_date',
  ] as const),
) {}
