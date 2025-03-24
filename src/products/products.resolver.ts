import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.create(input);
  }
}
