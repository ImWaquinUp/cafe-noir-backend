import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { CafeTable } from '../../cafe-tables/entities/cafe-table.entity';

export enum ReservationStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @Column({ type: 'date' })
  reservationDate: string;

  @Column({ type: 'time' })
  reservationTime: string;

  @Column()
  numberOfGuests: number;

  @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.PENDING })
  reservationStatus: ReservationStatus;

  @Column()
  customerId: number;

  @Column()
  tableId: number;

  @ManyToOne(() => Customer, (customer) => customer.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => CafeTable, (table) => table.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tableId' })
  cafeTable: CafeTable;
}
