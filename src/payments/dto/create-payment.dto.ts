import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsInt()
  orderId: number;

  @IsNumber()
  @Min(0)
  amountPaid: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;
}
