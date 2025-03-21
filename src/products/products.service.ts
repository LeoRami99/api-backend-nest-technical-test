import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { Product } from './core/domain/product.entity';
import { ProductRepository } from './ports/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  getAllProducts(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ): Promise<{ rows: Product[]; count: number }> {
    try {
      return this.productRepository.findAndCountAll(page, limit, search);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
