// products.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getAllProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('getAllProducts', () => {
    it('debe retornar un objeto con ok: true y la lista de productos', async () => {
      const mockProducts = {
        count: 2,
        rows: [
          {
            id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
            name: 'Producto 1',
            price: 100,
            description: 'Descripción 1',
            image: 'image1.png',
            category: 'category1',
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'p5o4n3m2-l1k0-j9i8-h7g6-f5e4d3c2b1a0',
            name: 'Producto 2',
            price: 200,
            description: 'Descripción 2',
            image: 'image2.png',
            category: 'category2',
            stock: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };

      const getAllProductsMock = jest.fn().mockResolvedValue(mockProducts);
      productsService.getAllProducts = getAllProductsMock;

      const page = '1';
      const limit = '10';
      const search = 'Producto';

      const result = await controller.getAllProducts(page, limit, search);

      expect(result).toEqual({
        ok: true,
        products: mockProducts,
      });
      expect(getAllProductsMock).toHaveBeenCalledWith(page, limit, search);
    });
    it('debe manejar valores por defecto si no se envían parámetros de consulta', async () => {
      const mockProducts = {
        count: 1,
        rows: [
          {
            id: 'uuid-default',
            name: 'Producto por defecto',
            price: 150,
            description: 'Descripción por defecto',
            image: 'default.png',
            category: 'default-category',
            stock: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };

      const getAllProductsMock = jest.fn().mockResolvedValue(mockProducts);
      productsService.getAllProducts = getAllProductsMock;

      const result = await controller.getAllProducts(
        undefined,
        undefined,
        undefined,
      );
      expect(result).toEqual({
        ok: true,
        products: mockProducts,
      });
      expect(getAllProductsMock).toHaveBeenCalledWith(
        undefined,
        undefined,
        undefined,
      );
    });
  });
});
