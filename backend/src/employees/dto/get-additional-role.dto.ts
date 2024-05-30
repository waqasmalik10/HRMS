import { Exclude, Expose, Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNumber, IsString, ValidateNested } from "class-validator";

@Exclude()
export class GetAdditionalRoleDTO {

    @Expose()
    @IsNumber()
    readonly id: number;

}