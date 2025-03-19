import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from '../models/product.model';
import { SequelizeProductRepositoryAdapter } from '../adapters/sequelize-product.repository.adapter';

import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductRepository',
      useClass: SequelizeProductRepositoryAdapter,
    },
  ],
})
export class ProductsModule {}
