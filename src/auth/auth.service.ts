import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from '../customers/entities/customer.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.customerRepo.findOne({
      where: [{ email: dto.email }, { phoneNumber: dto.phoneNumber }],
    });
    if (existing) {
      throw new ConflictException('Email or phone number is already registered.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const customer = this.customerRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      passwordHash,
      role: dto.role,
    });

    const saved = await this.customerRepo.save(customer);
    const { passwordHash: _, ...result } = saved;
    return {
      message: 'Registration successful',
      user: result,
    };
  }

  async login(dto: LoginDto) {
    const customer = await this.customerRepo
      .createQueryBuilder('customer')
      .addSelect('customer.passwordHash')
      .where('customer.email = :email', { email: dto.email })
      .getOne();

    if (!customer) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(dto.password, customer.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = {
      sub: customer.customerId,
      email: customer.email,
      role: customer.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        customerId: customer.customerId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        role: customer.role,
      },
    };
  }
}
