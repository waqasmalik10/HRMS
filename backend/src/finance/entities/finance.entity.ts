import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('finances')
export class Finance extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamptz"})
    date: Date;

    @Column()
    description: string;

    @Column()
    amount: number;

    @Column()
    tax_deductions: string;

    @Column()
    cheque_number: string;

    @Column()
    category_id: number;

    @Column()
    added_by: string;

    @Column()
    company_id: number;

}