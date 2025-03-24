import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../products/product.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @Field()
  customerName: string;

  @Column()
  @Field(() => Int)
  totalPrice: number;

  @ManyToMany(() => Product)
  @JoinTable()
  @Field(() => [Product])
  products: Product[];
}
