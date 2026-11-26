import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Order } from '../../orders/entities/order.entity';

export enum TableStatus {
  AVAILABLE = 'Available',
  OCCUPIED = 'Occupied',
  RESERVED = 'Reserved',
  MAINTENANCE = 'Maintenance',
}

@Entity('cafe_tables')
export class CafeTable {
  @PrimaryGeneratedColumn()
  tableId: number;

  @Column({ unique: true })
  tableNumber: number;

  @Column()
  capacity: number;

  @Column({ type: 'enum', enum: TableStatus, default: TableStatus.AVAILABLE })
  tableStatus: TableStatus;

  @OneToMany(() => Reservation, (reservation) => reservation.cafeTable)
  reservations: Reservation[];

  @OneToMany(() => Order, (order) => order.cafeTable)
  orders: Order[];
}
