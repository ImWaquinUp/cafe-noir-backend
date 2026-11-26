import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { TableStatus } from '../entities/cafe-table.entity';

export class CreateCafeTableDto {
  @IsInt()
  @Min(1)
  tableNumber: number;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsEnum(TableStatus)
  @IsOptional()
  tableStatus?: TableStatus;
}
