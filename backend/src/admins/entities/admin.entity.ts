import { Exclude } from 'class-transformer';
import {BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('admins')
export class Admin extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    website: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn({type: "timestamptz"})
    @Exclude()
    createdAt: Date;
  
    @UpdateDateColumn({type: "timestamptz"})
    @Exclude()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8)
    }

    async validatePassword(password: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, this.password);
        console.log(isValid)
        return isValid;
    }
    
}