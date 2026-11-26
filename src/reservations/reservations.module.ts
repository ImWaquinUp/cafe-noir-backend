import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { CafeTable } from '../cafe-tables/entities/cafe-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, CafeTable])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
