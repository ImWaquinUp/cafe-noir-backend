import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from '../orders/entities/order.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order, MenuItem])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
