import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FinanceCategories extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;

    @Column()
    color_code: string;

    @Column()
    company_id: number;

}