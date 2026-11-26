import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CafeTablesService } from './cafe-tables.service';
import { CreateCafeTableDto } from './dto/create-cafe-table.dto';
import { UpdateCafeTableDto } from './dto/update-cafe-table.dto';
import { TableStatus } from './entities/cafe-table.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cafe-tables')
export class CafeTablesController {
  constructor(private readonly cafeTablesService: CafeTablesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCafeTableDto) {
    return this.cafeTablesService.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: TableStatus) {
    return this.cafeTablesService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cafeTablesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCafeTableDto) {
    return this.cafeTablesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cafeTablesService.remove(id);
  }
}
