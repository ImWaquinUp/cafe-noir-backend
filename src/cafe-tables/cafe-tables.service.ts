import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CafeTable, TableStatus } from './entities/cafe-table.entity';
import { CreateCafeTableDto } from './dto/create-cafe-table.dto';
import { UpdateCafeTableDto } from './dto/update-cafe-table.dto';

@Injectable()
export class CafeTablesService {
  constructor(
    @InjectRepository(CafeTable)
    private readonly tableRepo: Repository<CafeTable>,
  ) {}

  async create(dto: CreateCafeTableDto) {
    const exists = await this.tableRepo.findOne({ where: { tableNumber: dto.tableNumber } });
    if (exists) throw new ConflictException(`Table #${dto.tableNumber} already exists`);
    const table = this.tableRepo.create(dto);
    return this.tableRepo.save(table);
  }

  findAll(status?: TableStatus) {
    if (status) {
      return this.tableRepo.find({ where: { tableStatus: status } });
    }
    return this.tableRepo.find();
  }

  async findOne(id: number) {
    const table = await this.tableRepo.findOne({
      where: { tableId: id },
      relations: { reservations: true },
    });
    if (!table) throw new NotFoundException(`Table #${id} not found`);
    return table;
  }

  async update(id: number, dto: UpdateCafeTableDto) {
    const table = await this.findOne(id);
    Object.assign(table, dto);
    return this.tableRepo.save(table);
  }

  async remove(id: number) {
    const table = await this.findOne(id);
    await this.tableRepo.remove(table);
    return { deleted: true, tableId: id };
  }
}
