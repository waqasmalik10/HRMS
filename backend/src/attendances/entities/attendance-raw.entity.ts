import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Companies } from '../../companies/entities/companies.entity';
import {Exclude} from "class-transformer";

@Entity()
@Index(['employee_id', 'status', 'date', 'companies'], { unique: true })
export class AttendanceRaw extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  serial_number: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column()
  employee_id: number;

  @Column({ nullable: false, default: 0 })
  status: number;

  // This column is used as part of unique index to avoid any duplication of attendance record on same day with same status (checkin / checkout)
  @Column({ type: Date })
  date: Date;

  @ManyToOne(() => Companies, (company) => company.attendances_raw)
  companies: Companies;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  createdAt: Date;
}
