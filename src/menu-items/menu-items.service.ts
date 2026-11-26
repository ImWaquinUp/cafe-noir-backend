import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,
  ) {}

  create(dto: CreateMenuItemDto) {
    const item = this.menuRepo.create(dto);
    return this.menuRepo.save(item);
  }

  findAll(category?: string) {
    if (category) {
      return this.menuRepo.find({ where: { category } });
    }
    return this.menuRepo.find();
  }

  async findOne(id: number) {
    const item = await this.menuRepo.findOne({ where: { menuItemId: id } });
    if (!item) throw new NotFoundException(`MenuItem #${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdateMenuItemDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.menuRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.menuRepo.remove(item);
    return { deleted: true, menuItemId: id };
  }
}
