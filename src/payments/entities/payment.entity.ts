import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card',
  E_WALLET = 'E-Wallet',
}

export enum PaymentStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  FAILED = 'Failed',
  REFUNDED = 'Refunded',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @CreateDateColumn()
  paymentDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PAID })
  paymentStatus: PaymentStatus;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
