import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule],
  providers: [OrdersService, OrdersResolver],
  controllers: [OrdersController],
})
export class OrdersModule {}
