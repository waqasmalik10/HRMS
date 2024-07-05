import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";

export class PasswordChangeDto {

    @ApiProperty()
    @IsString()
    readonly currentPassword: string;

    @ApiProperty({ description: 'Password must be minimun 8 characters long incluidng lower and upper case characters, numbers and special characters.' })
    @IsString()
    @IsStrongPassword(null, { message: 'Password must be minimun 8 characters long incluidng lower and upper case characters, numbers and special characters.' })
    readonly newPassword: string;

    @ApiProperty({ description: 'PasswordConfirm must be equal to the newPassword.'  })
    @IsString()
    readonly passwordConfirm: string;

}