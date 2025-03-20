import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { Product } from '../core/domain/product.entity';

export interface ProductRepository {
  findAndCountAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<PaginatedResult<Product>>;
}
