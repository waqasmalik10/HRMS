import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employees } from "./employees.entity";

@Entity()
export class AdditionalRoles extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Employees, (employees) => employees.additional_roles)
    employees: Employees
}