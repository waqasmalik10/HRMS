import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employees } from 'src/employees/entities/employees.entity';
import { AttendanceRaw } from '../../attendances/entities/attendance-raw.entity';

@Entity('companies')
export class Companies extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  company_code: string;

  @Column({ nullable: true })
  access_key: string;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Employees, (emp) => emp.companies, {
    cascade: true,
    eager: true,
  })
  employees: Employees[];

  @OneToMany(() => AttendanceRaw, (attendance) => attendance.companies, {
    cascade: true,
    eager: true,
  })
  attendances_raw: AttendanceRaw[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password);
    console.log('Password validation: ', isValid);
    return isValid;
  }
}
