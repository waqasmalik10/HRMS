import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttendanceRaw extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    attendance_id: number;

    @Column({nullable: true})
    serial_number: string;

    @Column()
    employee_id: string;

    @Column({nullable: true})
    status: string;

    @Column({type: "timestamptz", nullable: true})
    timestamp: Date;

}