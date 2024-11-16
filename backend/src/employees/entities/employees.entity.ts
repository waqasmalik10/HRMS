import { Exclude } from 'class-transformer';
import { Companies } from 'src/companies/entities/companies.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdditionalRoles } from './additional-roles.entity';
import { EmployeeIncrement } from 'src/employee-increments/entities/employee-increment.entity';

@Entity()
export class Employees extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  employee_code: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  bank_name: string;

  @Column()
  bank_account_title: string;

  @Column()
  bank_branch_code: string;

  @Column()
  bank_account_number: string;

  @Column()
  bank_iban_number: string;

  @Column()
  initial_base_salary: number; // at the time of hiring (first offer)

  @Column()
  current_base_salary: number;

  @Column({ default: 0 })
  medical_allowance_amount: number;

  @Column({ type: 'timestamptz' })
  joining_date: Date;

  @Column({ type: 'timestamptz' })
  full_time_joining_date: Date;

  @Column({ type: 'timestamptz' })
  last_increment_date: Date;

  @Column()
  last_increment_amount: number;

  // department_id: number // to be added later.
  // team_id: number // to be added later.

  @Column()
  home_address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip_code: string;

  @Column()
  country: string;

  @Column()
  designation: string;

  @Column()
  cnic: string;

  @Column({ type: 'timestamptz' })
  id_card_date_of_birth: Date;

  @Column({ type: 'timestamptz' })
  actual_date_of_birth: Date;

  @Column({ nullable: true })
  hobbies: string;

  @Column({ nullable: true })
  vehicle_registration_number: string;

  @OneToMany(
    () => AdditionalRoles,
    (additionalRoles) => additionalRoles.employees,
  )
  additional_roles: AdditionalRoles[];

  @OneToMany(
    () => EmployeeIncrement,
    (employeeIncrement) => employeeIncrement.employee,
    { cascade: true, eager: true },
  )
  employeeIncrements: EmployeeIncrement[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Exclude()
  @ManyToOne(() => Companies, (company) => company.employees)
  @JoinColumn()
  companies: Companies;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}
