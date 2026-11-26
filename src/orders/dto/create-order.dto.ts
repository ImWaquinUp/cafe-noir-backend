import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { OrderStatus, OrderType } from '../entities/order.entity';

export class CreateOrderDto {
  @IsEnum(OrderType)
  @IsOptional()
  orderType?: OrderType;

  @IsEnum(OrderStatus)
  @IsOptional()
  orderStatus?: OrderStatus;

  @IsInt()
  customerId: number;

  @IsInt()
  @IsOptional()
  tableId?: number;
}
