import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order])
  async orders() {
    return this.ordersService.findAll();
  }

  @Query(() => Order)
  async order(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput) {
    return this.ordersService.create(input);
  }
  @Query(() => [Order])
  async ordersByCustomer(@Args('customerName') customerName: string) {
    return this.ordersService.findByCustomer(customerName);
  }
}
