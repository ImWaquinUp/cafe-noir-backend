import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const order = await this.orderRepo.findOne({ where: { orderId: dto.orderId } });
    if (!order) throw new NotFoundException(`Order #${dto.orderId} not found`);

    if (dto.amountPaid < Number(order.totalAmount)) {
      throw new BadRequestException(`Amount paid (${dto.amountPaid}) is less than order total (${order.totalAmount})`);
    }

    const payment = this.paymentRepo.create(dto);
    const saved = await this.paymentRepo.save(payment);

    if ((dto.paymentStatus ?? PaymentStatus.PAID) === PaymentStatus.PAID) {
      order.orderStatus = OrderStatus.SERVED;
      await this.orderRepo.save(order);
    }

    return saved;
  }

  findAll() {
    return this.paymentRepo.find({ relations: { order: true } });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findOne({
      where: { paymentId: id },
      relations: { order: true },
    });
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    Object.assign(payment, dto);
    return this.paymentRepo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await this.paymentRepo.remove(payment);
    return { deleted: true, paymentId: id };
  }
}
