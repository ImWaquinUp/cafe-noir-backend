import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from '../orders/entities/order.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(MenuItem)
    private readonly menuRepo: Repository<MenuItem>,
  ) {}

  private async recalculateOrderTotal(orderId: number) {
    const items = await this.itemRepo.find({ where: { orderId } });
    const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
    await this.orderRepo.update(orderId, { totalAmount: total });
  }

  async create(dto: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({ where: { orderId: dto.orderId } });
    if (!order) throw new NotFoundException(`Order #${dto.orderId} not found`);

    const menuItem = await this.menuRepo.findOne({ where: { menuItemId: dto.menuItemId } });
    if (!menuItem) throw new NotFoundException(`MenuItem #${dto.menuItemId} not found`);
    if (!menuItem.isAvailable) throw new BadRequestException(`${menuItem.itemName} is currently unavailable`);

    const unitPrice = Number(menuItem.price);
    const subtotal = unitPrice * dto.quantity;

    const orderItem = this.itemRepo.create({
      orderId: dto.orderId,
      menuItemId: dto.menuItemId,
      quantity: dto.quantity,
      unitPrice,
      subtotal,
    });

    const saved = await this.itemRepo.save(orderItem);
    await this.recalculateOrderTotal(dto.orderId);
    return saved;
  }

  findAll() {
    return this.itemRepo.find({ relations: { order: true, menuItem: true } });
  }

  async findOne(id: number) {
    const item = await this.itemRepo.findOne({
      where: { orderItemId: id },
      relations: { order: true, menuItem: true },
    });
    if (!item) throw new NotFoundException(`OrderItem #${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    const item = await this.findOne(id);
    if (dto.quantity) {
      item.quantity = dto.quantity;
      item.subtotal = Number(item.unitPrice) * dto.quantity;
    }
    const saved = await this.itemRepo.save(item);
    await this.recalculateOrderTotal(item.orderId);
    return saved;
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    const orderId = item.orderId;
    await this.itemRepo.remove(item);
    await this.recalculateOrderTotal(orderId);
    return { deleted: true, orderItemId: id };
  }
}
