import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsInt({ each: true })
  @Min(1, { each: true })
  productIds: number[];
}
