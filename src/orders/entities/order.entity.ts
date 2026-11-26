import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { CafeTable } from '../../cafe-tables/entities/cafe-table.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Payment } from '../../payments/entities/payment.entity';

export enum OrderType {
  DINE_IN = 'Dine-in',
  TAKEAWAY = 'Takeaway',
}

export enum OrderStatus {
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  READY = 'Ready',
  SERVED = 'Served',
  CANCELLED = 'Cancelled',
}

@Entity('customer_orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ type: 'enum', enum: OrderType, default: OrderType.DINE_IN })
  orderType: OrderType;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  orderStatus: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column()
  customerId: number;

  @Column({ nullable: true })
  tableId: number | null;

  @ManyToOne(() => Customer, (customer) => customer.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => CafeTable, (table) => table.orders, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tableId' })
  cafeTable: CafeTable;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
