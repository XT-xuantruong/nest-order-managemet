import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerName, productIds } = createOrderDto;

    const products = await Promise.all(
      productIds.map(async (id) => {
        const product = await this.productsService.findOne(id);
        if (product.stock <= 0) {
          throw new BadRequestException(
            `Product ${product.name} is out of stock`,
          );
        }
        return product;
      }),
    );

    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0,
    );

    const order = this.ordersRepository.create({
      customerName,
      totalPrice,
      products,
    });

    for (const product of products) {
      product.stock -= 1;
      await this.productsService.update(product.id, product);
    }

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }

  async findByCustomer(customerName: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { customerName },
      relations: ['products'],
    });
  }
}
