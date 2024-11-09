import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Exclude()
export class GetAdditionalRoleDTO {
  @Expose()
  @IsNumber()
  readonly id: number;
}
