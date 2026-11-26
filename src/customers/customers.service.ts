import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find({ relations: { reservations: true, orders: true },
 });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({
      where: { customerId: id },
      relations: { reservations: true, orders: true },
    });
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    Object.assign(customer, dto);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    await this.customerRepo.remove(customer);
    return { deleted: true, customerId: id };
  }
}
