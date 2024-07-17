import { Employees } from "src/employees/entities/employees.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeeIncrement extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => Employees, (employee) => employee.employeeIncrements)
    employee: Employees;

    @Column()
    increment_amount: number;

    @Column( {type: "timestamptz"} )
    effective_date: Date;

    @Column({nullable: true})
    notes: string;

}