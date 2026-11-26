import { IsInt, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  orderId: number;

  @IsInt()
  menuItemId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
