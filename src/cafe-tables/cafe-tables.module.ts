import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeTablesService } from './cafe-tables.service';
import { CafeTablesController } from './cafe-tables.controller';
import { CafeTable } from './entities/cafe-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CafeTable])],
  controllers: [CafeTablesController],
  providers: [CafeTablesService],
})
export class CafeTablesModule {}
