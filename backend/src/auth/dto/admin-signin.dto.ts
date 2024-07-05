import { IsEmail, IsString } from "class-validator";

export class AdminSigninDto {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;
}