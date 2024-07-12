import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateFinanceDto {

    @IsString()
    date: Date;

    @IsString()
    description: string;

    @IsNumber()
    amount: number;

    @IsString()
    tax_deductions: string;

    @IsString()
    cheque_number: string;

    @IsNumber()
    category_id: number;

}
