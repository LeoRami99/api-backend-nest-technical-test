import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from '../../models/product.model';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

@Injectable()
export class SequelizeProductRepositoryAdapter {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: typeof ProductModel,
  ) {}
  async findAndCountAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<PaginatedResult<ProductModel>> {
    const offset = (page - 1) * limit;
    const where = search ? { name: search } : {};
    const { rows, count } = await this.productModel.findAndCountAll({
      where,
      offset,
      limit,
    });
    return {
      rows,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      pageSize: limit,
      hasNext: page < Math.ceil(count / limit),
      hasPrevious: page > 1,
    };
  }
  async updateStock(idProduct: string, amount: number): Promise<boolean> {
    const product = await this.productModel.findByPk(idProduct);
    if (!product || product.stock <= 0) {
      return false;
    }

    const updatedStock = product.get().stock - amount;
    console.log(updatedStock);

    if (updatedStock < 0) {
      return false;
    }

    await product.update({ stock: updatedStock });
    return true;
  }
}
