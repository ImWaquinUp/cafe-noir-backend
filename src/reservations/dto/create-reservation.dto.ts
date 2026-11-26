import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ReservationStatus } from '../entities/reservation.entity';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  reservationDate: string;

  @IsString()
  @IsNotEmpty()
  reservationTime: string;

  @IsInt()
  @Min(1)
  numberOfGuests: number;

  @IsInt()
  customerId: number;

  @IsInt()
  tableId: number;

  @IsEnum(ReservationStatus)
  @IsOptional()
  reservationStatus?: ReservationStatus;
}
