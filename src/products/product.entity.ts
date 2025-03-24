import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 100, nullable: false })
  @Field()
  name: string;

  @Column({ nullable: false })
  @Field(() => Int)
  price: number;

  @Column({ nullable: false })
  @Field(() => Int)
  stock: number;
}
