import { IsNumber, IsString } from "class-validator";

export class CreateFinanceCategoryDto {

    @IsString()
    category_name: string;

    @IsString()
    color_code: string;

    @IsNumber()
    company_id: number;
}
