import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, Length, IsInt, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  price: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  stock: number;
}
