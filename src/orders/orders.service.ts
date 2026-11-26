import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  create(dto: CreateOrderDto) {
    const order = this.orderRepo.create(dto);
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({
      relations: { customer: true, cafeTable: true, orderItems: true, payments: true },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { orderId: id },
      relations: { customer: true, cafeTable: true, orderItems: true, payments: true },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.findOne(id);
    Object.assign(order, dto);
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    return { deleted: true, orderId: id };
  }
}
