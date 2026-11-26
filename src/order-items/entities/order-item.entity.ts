import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { MenuItem } from '../../menu-items/entities/menu-item.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column()
  orderId: number;

  @Column()
  menuItemId: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'menuItemId' })
  menuItem: MenuItem;
}
