import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Order } from '../../orders/entities/order.entity';

export enum UserRole {
  CUSTOMER = 'Customer',
  STAFF = 'Staff',
  CASHIER = 'Cashier',
  ADMIN = 'Admin',
}

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  customerId: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 20, unique: true })
  phoneNumber: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.customer)
  reservations: Reservation[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
