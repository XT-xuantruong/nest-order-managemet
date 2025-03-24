import { IsString, Length, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;
}
