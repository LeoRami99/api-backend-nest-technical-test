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
    console.log(page, limit, search);
    try {
      return this.productRepository.findAndCountAll(page, limit, search);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  updateStockService(idProduct: string, amount: number): Promise<boolean> {
    try {
      return this.productRepository.updateStock(idProduct, amount);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
