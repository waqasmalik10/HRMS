import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeIncrementDto {

    @IsNumber()
    readonly increment_amount: number;

    @IsString()
    readonly effective_date: Date;

    @IsString()
    readonly notes: string;
}
