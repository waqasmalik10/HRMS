import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attendances extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  attendance_id: number;

  @Column()
  employee_id: number;

  @Column({ type: 'timestamptz', nullable: true })
  check_in: Date;

  @Column({ type: 'timestamptz', nullable: true })
  check_out: Date;

  @Column({ type: 'timestamptz', nullable: true })
  timestamp: Date;

  @Column()
  name: string;

  @Column()
  status: string;
}
