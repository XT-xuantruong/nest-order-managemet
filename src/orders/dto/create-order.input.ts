import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @Field(() => [Int])
  @IsInt({ each: true })
  @Min(1, { each: true })
  productIds: number[];
}
